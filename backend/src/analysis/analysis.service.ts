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

  private readonly DEATH_AGE = 85;
  private readonly ANNUAL_RETURN = 0.05;

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
   * No updates, just calculation
   */
  async calculate(dto: CalculateDto): Promise<CalculationResponseDto> {
    console.log('📊 POST /calculate - Objective:', dto.objective);
    
    // Get current user data from DB
    const userData = await this.getUserDataByToken(dto.token);
    console.log('💾 User data from DB:', userData);

    // Calculate and return
    return this.performCalculation(userData, dto.objective);
  }

  /**
   * PATCH - Update DB fields + recalculate
   * Updates database then calculates with fresh values
   */
  async updateAndCalculate(dto: UpdateAndCalculateDto): Promise<CalculationResponseDto> {
    console.log('📝 PATCH /calculate - Update + recalculate');
    console.log('Objective:', dto.objective);
    
    // Step 1: Update database
    await this.updateUserData(dto.token, dto);

    // Step 2: Get fresh user data (with updates)
    const userData = await this.getUserDataByToken(dto.token);
    console.log('💾 Updated user data:', userData);

    // Step 3: Calculate and return
    return this.performCalculation(userData, dto.objective);
  }

  /**
   * Core calculation logic
   * Used by both POST and PATCH
   */
  private performCalculation(userData: UserDataDto, objective: number): CalculationResponseDto {
    const currentAge = userData.age;
    const retirementAge = currentAge + (userData.plannedYearOfRetirement - new Date().getFullYear());
    const yearsUntilRetirement = userData.plannedYearOfRetirement - new Date().getFullYear();
    const yearsInRetirement = this.DEATH_AGE - retirementAge;

    console.log('👤 Current age:', currentAge);
    console.log('📅 Years until retirement:', yearsUntilRetirement);
    console.log('📅 Years in retirement:', yearsInRetirement);

    const totalNeeded = this.calculateTotalRetirementNeeds(objective, yearsInRetirement);
    const requiredMonthlySavings = this.calculateRequiredMonthlySavings(totalNeeded, yearsUntilRetirement);
    const requiredPercentage = (requiredMonthlySavings / userData.salary) * 100;

    console.log('📊 Required percentage:', Math.round(requiredPercentage) + '%');

    const data = this.generateGraphData(userData, yearsUntilRetirement, requiredPercentage);

    return {
      percentage: Math.round(requiredPercentage),
      data,
      userData
    };
  }

  private generateGraphData(userData: UserDataDto, yearsUntilRetirement: number, requiredPercentage: number): any {
    const currentYear = new Date().getFullYear();
    const labels: number[] = [];
    const willingAccumulation: number[] = [];
    const additionalNeeded: number[] = [];
    const monthlyRate = this.ANNUAL_RETURN / 12;
    
    const willingMonthlySavings = (userData.salary * userData.willingToSave) / 100;
    const requiredMonthlySavings = (userData.salary * requiredPercentage) / 100;

    let willingTotal = 0;
    let requiredTotal = 0;

    for (let i = 0; i <= yearsUntilRetirement; i++) {
      const year = currentYear + i;
      labels.push(year);

      for (let month = 0; month < 12; month++) {
        willingTotal = (willingTotal + willingMonthlySavings) * (1 + monthlyRate);
        requiredTotal = (requiredTotal + requiredMonthlySavings) * (1 + monthlyRate);
      }

      const willing = Math.round(willingTotal);
      const required = Math.round(requiredTotal);
      const gap = Math.max(0, required - willing);

      willingAccumulation.push(willing);
      additionalNeeded.push(gap);
    }

    return {
      labels,
      datasets: [
        {
          label: 'Willing to Save Accumulation',
          data: willingAccumulation,
          backgroundColor: 'rgba(54, 162, 235, 0.8)',
        },
        {
          label: 'Additional Needed for Objective',
          data: additionalNeeded,
          backgroundColor: 'rgba(255, 192, 203, 0.8)',
        }
      ]
    };
  }

  private calculateTotalRetirementNeeds(monthlyPension: number, yearsInRetirement: number): number {
    const annualWithdrawal = monthlyPension * 12;
    const presentValueFactor = (1 - Math.pow(1 + this.ANNUAL_RETURN, -yearsInRetirement)) / this.ANNUAL_RETURN;
    return annualWithdrawal * presentValueFactor;
  }

  private calculateRequiredMonthlySavings(targetAmount: number, yearsToSave: number): number {
    const monthlyRate = this.ANNUAL_RETURN / 12;
    const totalMonths = yearsToSave * 12;
    const futureValueFactor = (Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate;
    return targetAmount / futureValueFactor;
  }
}