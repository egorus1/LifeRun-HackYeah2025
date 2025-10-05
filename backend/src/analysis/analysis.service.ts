import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateObjectiveDto } from './dto/analysis.dto';
import { CalculationResponseDto } from './dto/analysis.dto';
import { UserDataDto } from './dto/analysis.dto';

@Injectable()
export class AnalysisService {
  constructor(private prisma: PrismaService) {}

  private readonly DEATH_AGE = 85;
  private readonly ANNUAL_RETURN = 0.05; // 5% annual return on investments

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
        willingToSave: true,  // Add this
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
      willingToSave: user.willingToSave,  // Add this
    };
  }

  /**
   * Calculate required savings percentage
   */
  async processObjective(dto: CreateObjectiveDto): Promise<CalculationResponseDto> {
    console.log('🎯 Processing objective:', dto.objective);
    
    // Step 1: Get user data from database
    const userData = await this.getUserDataByToken(dto.token);
    console.log('💾 User data:', userData);

    // Step 2: Calculate time periods using ACTUAL AGE
    const currentAge = userData.age;
    const workingYearsStarted = new Date().getFullYear() - userData.yearOfStarting;
    const retirementAge = currentAge + (userData.plannedYearOfRetirement - new Date().getFullYear());
    
    // Years left to work (from now until retirement)
    const yearsUntilRetirement = userData.plannedYearOfRetirement - new Date().getFullYear();
    
    // Years in retirement (from retirement age until death at 85)
    const yearsInRetirement = this.DEATH_AGE - retirementAge;

    console.log('👤 Current age:', currentAge);
    console.log('📅 Retirement age will be:', retirementAge);
    console.log('📅 Years until retirement:', yearsUntilRetirement);
    console.log('📅 Years in retirement:', yearsInRetirement);

    // Step 3: Calculate how much total money needed for retirement
    // Formula: Monthly pension * 12 months * years in retirement
    // Adjusted for investment returns during retirement
    const monthlyPension = dto.objective;
    const totalNeeded = this.calculateTotalRetirementNeeds(
      monthlyPension,
      yearsInRetirement
    );

    console.log('💰 Total money needed at retirement:', totalNeeded);

    // Step 4: Calculate required monthly savings
    // This accounts for compound interest while saving
    const requiredMonthlySavings = this.calculateRequiredMonthlySavings(
      totalNeeded,
      yearsUntilRetirement
    );

    console.log('💵 Required monthly savings:', requiredMonthlySavings);

    // Step 5: Calculate as percentage of salary
    const requiredPercentage = (requiredMonthlySavings / userData.salary) * 100;

    console.log('📊 Required savings percentage:', Math.round(requiredPercentage) + '%');

    // Step 6: Generate graph data
    const data = this.generateGraphData(
      userData,
      yearsUntilRetirement,
      requiredPercentage
    );

    return {
      percentage: Math.round(requiredPercentage),
      data
    };
  }

  /**
   * Generate stacked bar chart data
   * Blue bar (bottom): User's willing to save accumulation
   * Pink bar (top): Additional needed to reach objective
   */
  private generateGraphData(
    userData: UserDataDto,
    yearsUntilRetirement: number,
    requiredPercentage: number
  ): any {
    const currentYear = new Date().getFullYear();
    const labels: number[] = [];
    const willingAccumulation: number[] = [];
    const additionalNeeded: number[] = [];

    const monthlyRate = this.ANNUAL_RETURN / 12;
    
    // User's willing to save (percentage from DB)
    const willingMonthlySavings = (userData.salary * userData.willingToSave) / 100;
    
    // Required savings based on objective
    const requiredMonthlySavings = (userData.salary * requiredPercentage) / 100;

    let willingTotal = 0;
    let requiredTotal = 0;

    // Calculate accumulation for each year
    for (let i = 0; i <= yearsUntilRetirement; i++) {
      const year = currentYear + i;
      labels.push(year);

      // Accumulate with compound interest for 12 months
      for (let month = 0; month < 12; month++) {
        willingTotal = (willingTotal + willingMonthlySavings) * (1 + monthlyRate);
        requiredTotal = (requiredTotal + requiredMonthlySavings) * (1 + monthlyRate);
      }

      // Stack the bars:
      // Blue bar = what user is willing to save (always smaller or equal)
      // Pink bar = the GAP (difference between required and willing)
      const willing = Math.round(willingTotal);
      const required = Math.round(requiredTotal);
      const gap = Math.max(0, required - willing);

      willingAccumulation.push(willing);
      additionalNeeded.push(gap);
    }

    return {
      labels: labels,
      datasets: [
        {
          label: 'Willing to Save Accumulation',
          data: willingAccumulation,
          backgroundColor: 'rgba(54, 162, 235, 0.8)',  // Blue
        },
        {
          label: 'Additional Needed for Objective',
          data: additionalNeeded,
          backgroundColor: 'rgba(255, 192, 203, 0.8)',  // Pink
        }
      ]
    };
  }

  /**
   * Calculate total money needed at retirement
   * Accounts for withdrawals + investment returns during retirement
   */
  private calculateTotalRetirementNeeds(
    monthlyPension: number,
    yearsInRetirement: number
  ): number {
    const annualWithdrawal = monthlyPension * 12;
    
    // Present value of annuity formula
    // This calculates how much you need NOW to withdraw X per year for N years
    // while money still earns returns
    const presentValueFactor = 
      (1 - Math.pow(1 + this.ANNUAL_RETURN, -yearsInRetirement)) / this.ANNUAL_RETURN;
    
    return annualWithdrawal * presentValueFactor;
  }

  /**
   * Calculate required monthly savings to reach target
   * Accounts for compound interest while saving
   */
  private calculateRequiredMonthlySavings(
    targetAmount: number,
    yearsToSave: number
  ): number {
    const monthlyRate = this.ANNUAL_RETURN / 12;
    const totalMonths = yearsToSave * 12;
    
    // Future value of annuity formula (inverted)
    // How much to save monthly to reach target with compound interest
    const futureValueFactor = 
      (Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate;
    
    return targetAmount / futureValueFactor;
  }
}