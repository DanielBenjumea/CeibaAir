import { Injectable } from '@nestjs/common';
import { ServicioEnlistarVuelo } from 'src/dominio/vuelo/servicio/servicio-enlistar.vuelo';

@Injectable()
export class ManejadorEnlistarVuelo {
	constructor(private _servicioEnlistarVuelo: ServicioEnlistarVuelo) {}

	async ejecutar(vuelo: number, usuario: number) {
		await this._servicioEnlistarVuelo.ejecutar(vuelo, usuario);
	}
}
