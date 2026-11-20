import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";
import { DataSource } from "typeorm";
import { Foto } from "./fotos/entities/foto.entity.js";

const app = await NestFactory.createApplicationContext(AppModule);
const fotosRepo = app.get(DataSource).getRepository(Foto);

await fotosRepo.clear();
for (let i = 1; i <= 10; i++){
    await fotosRepo.save({
        titulo: `Foto ${i}`,
        fotografo: `Eddy Lima`,
        descripcion: `Descripcion de la foto ${i}`,
        calificacion: Math.round(Math.random() * 50)/10,
        ruta: `https://picsum.photos/id/${i*10}/600/400`,
    });
}

console.log('10 fotos insertadas correctamente');
await app.close();