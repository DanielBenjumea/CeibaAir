import { Injectable } from '@nestjs/common';
import { Usuario } from 'src/dominio/usuario/modelo/usuario';
import { Vuelo } from 'src/dominio/vuelo/modelo/Vuelo';
import { ServicioAgregarVuelo } from 'src/dominio/vuelo/servicio/servicio-agregar-vuelo';
import { ComandoAgregarVuelo } from './agregar-vuelo.comando';

@Injectable()
export class ManejadorAgregarVuelo {
	constructor(private _servicioAgregarVuelo: ServicioAgregarVuelo) {}

	async ejecutar(comandoAgregarVuelo: ComandoAgregarVuelo) {
		const { desde, hacia, precio, fecha } = comandoAgregarVuelo;
		await this._servicioAgregarVuelo.ejecutar(new Vuelo(desde, hacia, precio, fecha, new Array<Usuario>()));
	}
}
