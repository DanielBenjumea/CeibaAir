import { Injectable } from '@nestjs/common';
import { ServicioActualizarMontoUsuario } from 'src/dominio/usuario/servicio/servicio-actualizar-monto-usuario';

@Injectable()
export class ManejadorActualizarMontoUsuario {
	constructor(private readonly _servicioActualizarMontoUsuario: ServicioActualizarMontoUsuario) {}

	async ejecutar(id: number, monto: number) {
		await this._servicioActualizarMontoUsuario.ejecutar(id, monto);
	}
}
