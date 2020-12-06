import { ErrorCantidadPasajeros } from 'src/dominio/errores/error-cantidad-pasajeros';
import { ErrorDeNegocio } from 'src/dominio/errores/error-de-negocio';
import { ErrorMontoInsuficiente } from 'src/dominio/errores/error-monto-insuficiente';
import { RepositorioUsuario } from 'src/dominio/usuario/puerto/repositorio/repositorio-usuario';
import { VueloEntidad } from 'src/infraestructura/vuelo/entidad/vuelo.entidad';
import { RepositorioVuelo } from '../puerto/repositorio/repositorio-vuelo';

const CANTIDAD_MAXIMA_PASAJEROS = 30;

export class ServicioEnlistarVuelo {
	constructor(
		private readonly _repositorioVuelo: RepositorioVuelo,
		private readonly _repositorioUsuario: RepositorioUsuario
	) {}

	async ejecutar(vuelo: number, usuario: number) {
		const vueloEntidad: VueloEntidad = await this._repositorioVuelo.getVueloById(vuelo);
		if (!vuelo) {
			throw new ErrorDeNegocio(`No se encontró el vuelo ${vuelo}`);
		}
		if (this.validarCantidadPasajeros(vueloEntidad)) {
			throw new ErrorCantidadPasajeros('El vuelo ya tiene la cantidad máxima permitida');
		}
		vueloEntidad.precio = await this.actualizarPrecioVuelo(vueloEntidad);

		const usuarioUpdate = await this.actualizarMontoUsuario(vueloEntidad, usuario);
		vueloEntidad.passengers.push(usuarioUpdate);
		await this._repositorioVuelo.enlistar(vueloEntidad, usuarioUpdate);
	}

	async actualizarPrecioVuelo(vuelo: VueloEntidad) {
		let aumento = 0;
		const month = vuelo.fecha.getMonth();
		if (month === 11 || month === 5) {
			aumento += vuelo.precio * 0.2;
		}
		const day = vuelo.fecha.getDate() + 1;
		if (day % 2 !== 0) {
			aumento += vuelo.precio * 0.1;
		}
		return vuelo.precio + aumento;
	}

	validarCantidadPasajeros(vuelo: VueloEntidad) {
		return vuelo.passengers.length >= CANTIDAD_MAXIMA_PASAJEROS;
	}

	async actualizarMontoUsuario(vuelo: VueloEntidad, usuario: number) {
		let usuarioVuelo = vuelo.passengers.find((user) => user.id === usuario);
		if (usuarioVuelo) {
			throw new ErrorDeNegocio(`El usuario ya se encuentra registrado en este vuelo`);
		}
		usuarioVuelo = await this._repositorioUsuario.findUsuarioById(usuario);
		if (usuarioVuelo.monto <= vuelo.precio) {
			throw new ErrorMontoInsuficiente(`El saldo es insuciente para este vuelo`);
		}
		usuarioVuelo.monto = usuarioVuelo.monto - vuelo.precio;
		return usuarioVuelo;
	}
}
