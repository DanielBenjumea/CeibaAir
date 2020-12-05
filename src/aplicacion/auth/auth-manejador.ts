import { Injectable } from '@nestjs/common';
import { ServicioAuth } from 'src/dominio/auth/servicio/servicio-auth';
import { Usuario } from 'src/dominio/usuario/modelo/usuario';

@Injectable()
export class ManejadorAuth {
	constructor(private _servicioAuth: ServicioAuth) {}
	async ejecutar(usuario: Usuario) {
		return await this._servicioAuth.login(usuario);
	}
}
