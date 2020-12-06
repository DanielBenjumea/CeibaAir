import { Injectable } from '@nestjs/common';
import { DaoVuelo } from 'src/dominio/vuelo/puerto/dao/dao-vuelo';
import { VueloEntidad } from 'src/infraestructura/vuelo/entidad/vuelo.entidad';

@Injectable()
export class ManejadorListarVueloByUser {
	constructor(private _daoVuelo: DaoVuelo) {}

	async ejecutar(user: number): Promise<VueloEntidad[]> {
		return await this._daoVuelo.listarByUser(user);
	}
}