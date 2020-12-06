import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RepositorioAuth } from 'src/dominio/auth/repositorio/repositorio-auth';
import { Usuario } from 'src/dominio/usuario/modelo/usuario';

@Injectable()
export class RepositorioAuthImpl implements RepositorioAuth {
	constructor(private jwtService: JwtService) {}

	async signToken(usuario: Usuario) {
		return {
			token: this.jwtService.sign(usuario)
		};
	}
}
