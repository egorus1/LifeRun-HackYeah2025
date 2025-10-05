import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AnalysisModule } from './analysis/analysis.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [ UsersModule, AnalysisModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
