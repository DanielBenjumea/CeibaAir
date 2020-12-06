import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ManejadorAuth } from 'src/aplicacion/auth/auth-manejador';
import { RepositorioAuth } from 'src/dominio/auth/repositorio/repositorio-auth';
import { ServicioAuth } from 'src/dominio/auth/servicio/servicio-auth';
import { JwtStrategy } from 'src/dominio/auth/strategies/jwt.strategy';
import { LocalStrategy } from 'src/dominio/auth/strategies/local.strategy';
import { UsuarioProveedorModule } from '../usuario/proveedor/usuario-proveedor.module';
import { jwtConstants } from './constants/constants';
import { AuthController } from './controller/auth.controller';
import { repositorioAuthProvider } from './proveedor/repositorio-auth.proveedor';
import { servicioAuthProveedor } from './servicio/servicio-auth.proveedor';

@Module({
	imports: [
		UsuarioProveedorModule,
		PassportModule,
		JwtModule.register({
			secret: jwtConstants.secret,
			signOptions: { expiresIn: '3600s' }
		})
	],
	providers: [
		{
			provide: ServicioAuth,
			inject: [ RepositorioAuth ],
			useFactory: servicioAuthProveedor
		},
		repositorioAuthProvider,
		ServicioAuth,
		LocalStrategy,
		JwtStrategy,
		ManejadorAuth
	],
	exports: [ ServicioAuth, RepositorioAuth ],
	controllers: [ AuthController ]
})
export class AuthModule {}
