import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, HttpCode, Post, Query, DefaultValuePipe, ParseFloatPipe, ParseEnumPipe } from '@nestjs/common';
import { FotosService } from './fotos.service.js';
import type { Foto } from './entities/foto.entity.js';
import { Orden } from './fotos.service.js';

@Controller('fotos')
export class FotosController {
    constructor(
        private readonly fotosService: FotosService,
    ) {}


    @Get()
    findAll(
        @Query('min', new DefaultValuePipe(0), ParseFloatPipe) min: number,
        @Query('max', new DefaultValuePipe(5), ParseFloatPipe) max: number,
        @Query('q') q: string | undefined,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
        @Query('etiqueta') etiqueta: string | undefined,
        @Query('orden', new ParseEnumPipe(Orden, {optional: true})) orden: Orden | undefined
    ) {
        return this.fotosService.findAll({min, max, q, etiqueta, page, limit, orden});
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
    create (@Body() datos: Omit<Foto, 'id'>) {
        return this.fotosService.create(datos)
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() cambios: Partial<Omit<Foto, 'id'>>,) {
        return this.fotosService.update(id, cambios);
    }

    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.fotosService.remove(id);
    }
}
