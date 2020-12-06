import { ErrorDeNegocio } from './error-de-negocio';

export class ErrorVueloInvalido extends ErrorDeNegocio {
  constructor(mensaje: string) {
    super(mensaje, ErrorVueloInvalido.name);
  }
}