import { ErrorDeNegocio } from "./error-de-negocio";

export class ErrorPrecioInvalido extends ErrorDeNegocio {
    constructor(mensaje: string) {
      super(mensaje, ErrorPrecioInvalido.name);
    }
  }