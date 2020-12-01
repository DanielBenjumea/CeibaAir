import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ManejadorSignInUsuario } from 'src/aplicacion/usuario/comando/signin-usuario.manejador';

@Injectable()
export class ServicioAuth {
	constructor(private _manejadorSignInUsuario: ManejadorSignInUsuario, private jwtService: JwtService) {}

	async validateUser(nombre: string, claveUsuario: string): Promise<any> {
		const user = await this._manejadorSignInUsuario.ejecutar(nombre);
		if (user && user.clave === claveUsuario) {
			const { clave, ...result } = user;
			return result;
		}

		return null;
	}

	async login(user: any) {
		const payload = { username: user.nombre, sub: user.id };
		return {
			token: this.jwtService.sign(payload)
		};
	}
}
