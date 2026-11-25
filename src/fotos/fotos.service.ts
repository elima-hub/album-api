import { Injectable, NotFoundException, Patch } from '@nestjs/common';
import { Foto } from './entities/foto.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import {Between, ILike, Repository} from 'typeorm';

export interface FiltroFotos{
    min: number; max: number; q?:string; page: number; limit: number;
}

@Injectable()
export class FotosService {
    constructor(
        @InjectRepository(Foto)
        private readonly fotosRepo: Repository<Foto>,
    ){}


async findAll({ min, max, q, page, limit} : FiltroFotos){
    const [data, total] = await this.fotosRepo.findAndCount({
        where: {calificacion: Between(min, max),...(q && { titulo: ILike(`%${q}%`)}),},
        relations: { etiquetas: true},
        order: { id: 'ASC'},
        skip: (page - 1) * limit,
        take: limit,
    });
    return { data, total, page, limit};
}

/*async findAll(): Promise<Foto[]> {
    return this.fotosRepo.find({ order: {id: 'ASC'}});
}    
*/

async findOne(id: number): Promise<Foto> {
    const foto = await this.fotosRepo.findOne({
        where: {id},
        relations: {album: true, etiquetas:true},    
});
    if(!foto) throw new NotFoundException (`Foto ${id} no encontrada`);
    return foto;
}

create(datos: Partial<Foto>): Promise<Foto> {
    const foto = this.fotosRepo.create(datos)
    return this.fotosRepo.save(foto);
    }

async update(id: number, cambios: Partial<Omit<Foto, 'id'>>): Promise<Foto> {
    const foto = await this.findOne(id);
    Object.assign(foto, cambios);
    return this.fotosRepo.save(foto);
}

async remove(id: number): Promise<void> {
    const foto = await this.findOne(id);
    await this.fotosRepo.remove(foto);
}

}

