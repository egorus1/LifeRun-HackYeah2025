import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionsModule } from './questions/questions.module';
import { UsersModule } from './users/users.module';
import { AnalysisModule } from './analysis/analysis.module';

@Module({
  imports: [QuestionsModule, UsersModule, AnalysisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
