import { Injectable } from '@nestjs/common';
import { RepositorioUsuario } from 'src/dominio/usuario/puerto/repositorio/repositorio-usuario';
import { RepositorioAuth } from '../repositorio/repositorio-auth';

@Injectable()
export class ServicioAuth {
	constructor(private readonly _repositorioUsuario: RepositorioUsuario, private _repositorioAuth: RepositorioAuth) {}

	async validateUser(nombre: string, claveUsuario: string): Promise<any> {
		const user = await this._repositorioUsuario.findUsuarioByName(nombre);
		if (user && user.clave === claveUsuario) {
			const { clave, ...result } = user;
			return result;
		}
		
		console.log(user)
		return false;
	}

	async login(user: any) {
		return this._repositorioAuth.signToken(user);
	}
}
