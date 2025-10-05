import { Controller, Post, Patch, Body } from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { 
  CalculateDto, 
  UpdateAndCalculateDto, 
  CalculationResponseDto 
} from './dto/analysis.dto';

@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  /**
   * POST /analysis/calculate
   * Calculate with current DB values (no updates)
   */
  @Post('calculate')
  async calculate(@Body() dto: CalculateDto): Promise<CalculationResponseDto> {
    console.log('📥 POST /analysis/calculate');
    console.log('Token:', dto.token, 'Objective:', dto.objective);
    return await this.analysisService.calculate(dto);
  }

  /**
   * PATCH /analysis/update-user
   * Update user data in DB + recalculate
   */
  @Patch('update-user')
  async updateAndCalculate(@Body() dto: UpdateAndCalculateDto): Promise<CalculationResponseDto> {
    console.log('📥 PATCH /analysis/update-user');
    console.log('Token:', dto.token, 'Objective:', dto.objective);
    if (dto.salary) console.log('Updating salary:', dto.salary);
    if (dto.yearOfStarting) console.log('Updating yearOfStarting:', dto.yearOfStarting);
    if (dto.plannedYearOfRetirement) console.log('Updating plannedYearOfRetirement:', dto.plannedYearOfRetirement);
    return await this.analysisService.updateAndCalculate(dto);
  }
}