import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, HttpCode, Post, Query} from '@nestjs/common';
import { FotosService } from './fotos.service.js';
import { QueryFotosDto } from './dto/query-fotos.dto.js';
import { CreateFotoDto } from './dto/create-foto.dto.js';
import { UpdateFotoDto } from './dto/update-foto.dto.js';

@Controller('fotos')
export class FotosController {
    constructor(
        private readonly fotosService: FotosService,
    ) {}


    @Get()
    findAll(@Query() filtro: QueryFotosDto) {
        return this.fotosService.findAll(filtro);
    }

    /*@Get()
    findAll() {
        return this.fotosService.findAll();
    }
    */

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id:number) {
        return this.fotosService.findOne(id);
    }

    @Post()
    create (@Body() dto: CreateFotoDto) {
        return this.fotosService.create(dto);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateFotoDto){
        return this.fotosService.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.fotosService.remove(id);
    }
}
