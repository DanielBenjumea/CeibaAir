import { ErrorDeNegocio } from './error-de-negocio';

export class ErrorCantidadPasajeros extends ErrorDeNegocio {
	constructor(mensaje: string) {
		super(mensaje, ErrorCantidadPasajeros.name);
	}
}
