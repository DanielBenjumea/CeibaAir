import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ManejadorAuth } from 'src/aplicacion/auth/auth-manejador';
import { ServicioAuth } from 'src/dominio/auth/servicio/servicio-auth';
import { JwtStrategy } from 'src/dominio/auth/strategies/jwt.strategy';
import { LocalStrategy } from 'src/dominio/auth/strategies/local.strategy';
import { UsuarioProveedorModule } from '../usuario/proveedor/usuario-proveedor.module';
import { jwtConstants } from './constants/constants';
import { AuthController } from './controller/auth.controller';

@Module({
	imports: [
		UsuarioProveedorModule,
		PassportModule,
		JwtModule.register({
			secret: jwtConstants.secret,
			signOptions: { expiresIn: '60s' }
		})
	],
	providers: [ ServicioAuth, LocalStrategy, JwtStrategy, ManejadorAuth ],
	exports: [ ServicioAuth ],
	controllers: [ AuthController ]
})
export class AuthModule {}
