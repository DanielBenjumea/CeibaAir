import { Injectable } from '@nestjs/common';
import { ServicioSignInUsuario } from 'src/dominio/usuario/servicio/servicio-signin-usuario';

@Injectable()
export class ManejadorSignInUsuario {
	constructor(private _servicioSignInUsuario: ServicioSignInUsuario) {}

	async ejecutar(nombre: string) {
		return await this._servicioSignInUsuario.ejecutar(nombre);
	}
}
