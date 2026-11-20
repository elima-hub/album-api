import { Module } from '@nestjs/common';
import { FotosController } from './fotos.controller.js';
import { Foto } from './entities/foto.entity.js';
import { FotosService } from './fotos.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Foto])],
  controllers: [FotosController],
  providers: [FotosService],
  exports: [FotosService],
})

export class FotosModule {}
