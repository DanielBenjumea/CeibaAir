import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ManejadorAuth } from 'src/aplicacion/auth/auth-manejador';
import { ServicioAuth } from 'src/dominio/auth/servicio/servicio-auth';

@Controller()
export class AuthController {
	constructor(private _manejadorAuth: ManejadorAuth) {}

	@UseGuards(AuthGuard('local'))
	@Post('auth/login')
	async login(@Request() req) {
		return this._manejadorAuth.ejecutar(req.user);
	}

}
