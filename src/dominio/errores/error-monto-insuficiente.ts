import { ErrorDeNegocio } from './error-de-negocio';

export class ErrorMontoInsuficiente extends ErrorDeNegocio {
  constructor(mensaje: string) {
    super(mensaje, ErrorMontoInsuficiente.name);
  }
}