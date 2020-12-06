import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { VueloDto } from 'src/aplicacion/vuelo/consulta/dto/vuelo.dto';
import { DaoVuelo } from 'src/dominio/vuelo/puerto/dao/dao-vuelo';
import { EntityManager } from 'typeorm';

@Injectable()
export class DaoVueloMysql implements DaoVuelo {
	constructor(@InjectEntityManager() private entityManager: EntityManager) {}

	async listar(): Promise<VueloDto[]> {
		return this.entityManager.query('SELECT v.desde, v.hacia, v.precio, v.fecha FROM vuelo as v');
	}

	async getVueloById(id: number): Promise<VueloDto> {
		return this.entityManager.findOne(VueloDto, id);
	}
}
