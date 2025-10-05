import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { 
  CalculateDto, 
  UpdateAndCalculateDto, 
  CalculationResponseDto, 
  UserDataDto
} from './dto/analysis.dto';

@Injectable()
export class AnalysisService {
  constructor(private prisma: PrismaService) {}

  // Polish pension fund conservative assumptions (ZUS + Ministry of Finance + GUS data)
  private readonly DEATH_AGE = 85;
  private readonly INFLATION_RATE = 0.025; // 2.5% - Polish Ministry of Finance long-term projection
  private readonly SALARY_GROWTH_RATE = 0.045; // 4.5% - Conservative Polish salary growth (GUS historical data)
  private readonly REAL_WAGE_GROWTH = this.SALARY_GROWTH_RATE - this.INFLATION_RATE; // 2.0% real wage increase
  private readonly REAL_RETURN = 0.015; // 1.5% - Conservative real return (ZUS assumptions)
  private readonly NOMINAL_RETURN = this.INFLATION_RATE + this.REAL_RETURN; // 4% nominal

  /**
   * Get user data from database
   */
  async getUserDataByToken(token: string): Promise<UserDataDto> {
    const user = await this.prisma.user.findFirst({
      where: { token: token },
      select: {
        salary: true,
        age: true,
        yearOfStarting: true,
        plannedYearOfRetirement: true,
        willingToSave: true,
      }
    });

    if (!user) {
      throw new NotFoundException(`User with token not found`);
    }

    return {
      salary: user.salary,
      age: user.age,
      yearOfStarting: user.yearOfStarting,
      plannedYearOfRetirement: user.plannedYearOfRetirement,
      willingToSave: user.willingToSave,
    };
  }

  /**
   * Update user data in database
   */
  async updateUserData(token: string, dto: UpdateAndCalculateDto): Promise<void> {
    const updateData: any = {};
    
    if (dto.salary !== undefined) updateData.salary = dto.salary;
    if (dto.yearOfStarting !== undefined) updateData.yearOfStarting = dto.yearOfStarting;
    if (dto.plannedYearOfRetirement !== undefined) updateData.plannedYearOfRetirement = dto.plannedYearOfRetirement;

    if (Object.keys(updateData).length > 0) {
      await this.prisma.user.updateMany({
        where: { token: token },
        data: updateData
      });
      console.log('✅ Database updated:', updateData);
    }
  }

  /**
   * POST - Calculate with current DB values
   */
  async calculate(dto: CalculateDto): Promise<CalculationResponseDto> {
    console.log('📊 POST /calculate - Objective:', dto.objective);
    
    const userData = await this.getUserDataByToken(dto.token);
    console.log('💾 User data from DB:', userData);

    return this.performCalculation(userData, dto.objective);
  }

  /**
   * PATCH - Update DB fields + recalculate
   */
  async updateAndCalculate(dto: UpdateAndCalculateDto): Promise<CalculationResponseDto> {
    console.log('📝 PATCH /update-user - Update + recalculate');
    console.log('Objective:', dto.objective);
    
    await this.updateUserData(dto.token, dto);
    const userData = await this.getUserDataByToken(dto.token);
    console.log('💾 Updated user data:', userData);

    return this.performCalculation(userData, dto.objective);
  }

  /**
   * Core calculation logic with Polish conservative assumptions
   * Inflation: 2.5% (Polish Ministry of Finance)
   * Real return: 1.5% (ZUS conservative assumption)
   */
  private performCalculation(userData: UserDataDto, objective: number): CalculationResponseDto {
    const currentAge = userData.age;
    const currentYear = new Date().getFullYear();
    const retirementAge = currentAge + (userData.plannedYearOfRetirement - currentYear);
    const yearsUntilRetirement = userData.plannedYearOfRetirement - currentYear;
    const yearsInRetirement = this.DEATH_AGE - retirementAge;

    console.log('👤 Current age:', currentAge);
    console.log('📅 Years until retirement:', yearsUntilRetirement);
    console.log('📅 Years in retirement:', yearsInRetirement);
    console.log('💹 Polish assumptions - Inflation: 2.5%, Salary growth: 4.5%, Real return: 1.5%');

    const totalNeeded = this.calculateTotalRetirementNeeds(objective, yearsInRetirement, yearsUntilRetirement);
    const requiredMonthlySavings = this.calculateRequiredMonthlySavings(totalNeeded, yearsUntilRetirement);
    const requiredPercentage = (requiredMonthlySavings / userData.salary) * 100;

    console.log('📊 Required percentage:', Math.round(requiredPercentage) + '%');

    const data = this.generateGraphData(userData, yearsUntilRetirement, requiredPercentage);

    return {
      percentage: Math.round(requiredPercentage),
      data,
      userData: {
        salary: userData.salary,
        age: userData.age,
        yearOfStarting: userData.yearOfStarting,
        plannedYearOfRetirement: userData.plannedYearOfRetirement,
        willingToSave: userData.willingToSave
      }
    };
  }

  /**
   * Calculate total money needed at retirement (inflation-adjusted)
   */
  private calculateTotalRetirementNeeds(
    monthlyPension: number,
    yearsInRetirement: number,
    yearsUntilRetirement: number
  ): number {
    // Adjust pension for inflation at start of retirement
    const inflationAdjustedPension = monthlyPension * Math.pow(1 + this.INFLATION_RATE, yearsUntilRetirement);
    const annualWithdrawal = inflationAdjustedPension * 12;
    
    // During retirement, money grows at real return rate while being withdrawn
    const presentValueFactor = (1 - Math.pow(1 + this.REAL_RETURN, -yearsInRetirement)) / this.REAL_RETURN;
    
    return annualWithdrawal * presentValueFactor;
  }

  /**
   * Calculate required monthly savings (with salary inflation adjustment)
   */
  private calculateRequiredMonthlySavings(targetAmount: number, yearsToSave: number): number {
    const monthlyNominalRate = this.NOMINAL_RETURN / 12;
    const totalMonths = yearsToSave * 12;
    
    const futureValueFactor = (Math.pow(1 + monthlyNominalRate, totalMonths) - 1) / monthlyNominalRate;
    
    return targetAmount / futureValueFactor;
  }

  /**
   * Generate graph with inflation-adjusted accumulation
   * Shows accumulation from year user started working until retirement
   * Salaries grow 4.5% annually (2.5% inflation + 2% real wage growth)
   * Shows real purchasing power in today's PLN
   */
  private generateGraphData(userData: UserDataDto, yearsUntilRetirement: number, requiredPercentage: number): any {
    const startYear = userData.yearOfStarting; // Start from when user began working
    const retirementYear = userData.plannedYearOfRetirement;
    const totalYears = retirementYear - startYear;
    
    const labels: number[] = [];
    const willingAccumulation: number[] = [];
    const additionalNeeded: number[] = [];
    
    const monthlyNominalRate = this.NOMINAL_RETURN / 12;
    
    const willingMonthlySavings = (userData.salary * userData.willingToSave) / 100;
    const requiredMonthlySavings = (userData.salary * requiredPercentage) / 100;

    let willingTotal = 0;
    let requiredTotal = 0;

    for (let i = 0; i <= totalYears; i++) {
      const year = startYear + i;
      labels.push(year);

      // Salary grows 4.5% annually from starting year
      const salaryGrowthFactor = Math.pow(1 + this.SALARY_GROWTH_RATE, i);
      const currentWillingSavings = willingMonthlySavings * salaryGrowthFactor;
      const currentRequiredSavings = requiredMonthlySavings * salaryGrowthFactor;

      // Accumulate with nominal returns for 12 months
      for (let month = 0; month < 12; month++) {
        willingTotal = (willingTotal + currentWillingSavings) * (1 + monthlyNominalRate);
        requiredTotal = (requiredTotal + currentRequiredSavings) * (1 + monthlyNominalRate);
      }

      // Convert to real values (today's purchasing power)
      const deflator = Math.pow(1 + this.INFLATION_RATE, i);
      const willingReal = willingTotal / deflator;
      const requiredReal = requiredTotal / deflator;
      
      const willing = Math.round(willingReal);
      const required = Math.round(requiredReal);
      const gap = Math.max(0, required - willing);

      willingAccumulation.push(willing);
      additionalNeeded.push(gap);
    }

    return {
      labels,
      datasets: [
        {
          label: 'Willing to Save (Real PLN)',
          data: willingAccumulation,
          backgroundColor: 'rgba(54, 162, 235, 0.8)',
        },
        {
          label: 'Additional Needed (Real PLN)',
          data: additionalNeeded,
          backgroundColor: 'rgba(255, 192, 203, 0.8)',
        }
      ]
    };
  }
}