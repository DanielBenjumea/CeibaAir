import { Injectable } from '@nestjs/common';
import { ErrorDeNegocio } from 'src/dominio/errores/error-de-negocio';
import { RepositorioUsuario } from '../puerto/repositorio/repositorio-usuario';

@Injectable()
export class ServicioActualizarMontoUsuario {
	constructor(private readonly _repositorioUsuario: RepositorioUsuario) {}

	async ejecutar(id: number, monto: number) {
		const userEntity = await this._repositorioUsuario.findUsuarioById(id);
		if (!userEntity) {
			throw new ErrorDeNegocio(`El usuario no existe`);
		}
		const montoTotal = userEntity.monto + monto;
		if (montoTotal > 1000000) {
			throw new ErrorDeNegocio(`El monto máximo por usuario es 1000000`);
		}
		userEntity.monto = montoTotal;
		await this._repositorioUsuario.actualizarMontoUsuario(userEntity);
	}
}
