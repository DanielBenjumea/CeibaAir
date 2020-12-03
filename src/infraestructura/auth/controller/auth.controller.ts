import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ServicioAuth } from 'src/dominio/auth/servicio/servicio-auth';

@Controller()
export class AuthController {
	constructor(private authService: ServicioAuth) {}

	@UseGuards(AuthGuard('local'))
	@Post('auth/login')
	async login(@Request() req) {
		return this.authService.login(req.user);
	}

}
