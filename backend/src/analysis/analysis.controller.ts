import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { CreateObjectiveDto, CalculationResponseDto } from './dto/analysis.dto';

@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Post('calculate')
  async calculateSavings(
    @Body() dto: CreateObjectiveDto
  ): Promise<CalculationResponseDto> {
    console.log('📥 Received request - Token:', dto.token, 'Objective:', dto.objective);
    return await this.analysisService.processObjective(dto);
  }
  
}