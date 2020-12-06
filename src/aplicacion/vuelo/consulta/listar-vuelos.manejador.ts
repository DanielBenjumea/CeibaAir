import { Injectable } from '@nestjs/common';
import { DaoVuelo } from 'src/dominio/vuelo/puerto/dao/dao-vuelo';
import { VueloEntidad } from 'src/infraestructura/vuelo/entidad/vuelo.entidad';
import { VueloDto } from './dto/vuelo.dto';

@Injectable()
export class ManejadorListarVuelo {
	constructor(private _daoVUelo: DaoVuelo) {}

	async ejecutar(): Promise<VueloEntidad[]> {
		return this._daoVUelo.listar();
	}
}
