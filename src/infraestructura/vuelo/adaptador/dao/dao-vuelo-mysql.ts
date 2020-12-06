import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { VueloDto } from 'src/aplicacion/vuelo/consulta/dto/vuelo.dto';
import { DaoVuelo } from 'src/dominio/vuelo/puerto/dao/dao-vuelo';
import { EntityManager } from 'typeorm';
import { VueloEntidad } from '../../entidad/vuelo.entidad';

@Injectable()
export class DaoVueloMysql implements DaoVuelo {
	constructor(@InjectEntityManager() private entityManager: EntityManager) {}

	async listar(): Promise<VueloEntidad[]> {
		return this.entityManager.find(VueloEntidad ,{
			relations: [ 'passengers' ]
		});
	}

	async getVueloById(id: number): Promise<VueloDto> {
		return this.entityManager.findOne(VueloDto, id);
	}
}
