import { Injectable } from '@nestjs/common';
import { ErrorDeNegocio } from 'src/dominio/errores/error-de-negocio';
import { RepositorioUsuario } from '../puerto/repositorio/repositorio-usuario';


const MONTO_MAXIMO = 2000000;

@Injectable()
export class ServicioActualizarMontoUsuario {
	constructor(private readonly _repositorioUsuario: RepositorioUsuario) {}

	async ejecutar(id: number, monto: number) {
		const userEntity = await this._repositorioUsuario.findUsuarioById(id);
		if (!userEntity) {
			throw new ErrorDeNegocio(`El usuario no existe`);
		}
		const montoTotal = userEntity.monto + monto;
		if (montoTotal > MONTO_MAXIMO) {
			throw new ErrorDeNegocio(`El monto máximo por usuario es ${MONTO_MAXIMO}`);
		}
		userEntity.monto = montoTotal;
		await this._repositorioUsuario.actualizarMontoUsuario(userEntity);
	}
}
