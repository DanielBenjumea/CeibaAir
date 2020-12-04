import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RepositorioUsuario } from 'src/dominio/usuario/puerto/repositorio/repositorio-usuario';

@Injectable()
export class ServicioAuth {
	constructor(private readonly _repositorioUsuario: RepositorioUsuario, private jwtService: JwtService) {}

	async validateUser(nombre: string, claveUsuario: string): Promise<any> {
		const user = await this._repositorioUsuario.findUsuarioByName(nombre);
		if (user && user.clave === claveUsuario) {
			const { clave, ...result } = user;
			return result;
		}

		return null;
	}

	async login(user: any) {
		const { fechaCreacion, ...usuario } = user;
		return {
			token: this.jwtService.sign(usuario)
		};
	}
}
