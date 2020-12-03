import { ErrorLongitudInvalida } from 'src/dominio/errores/error-longitud-invalida';

const NUMERO_MINIMO_CARACTERES_CLAVE = 4;
export class Usuario {
  readonly #nombre: string;
  readonly #clave: string;
  readonly #fechaCreacion: Date;
  readonly #monto: number;
  readonly #isAdmin: boolean;

  constructor(
      nombre: string,
      clave: string,
      fechaCreacion: string,
      monto = 0,
      isAdmin = false
      ) {
    this.validarTamanoClave(clave);
    this.#nombre = nombre;
    this.#clave = clave;
    this.#fechaCreacion = new Date(fechaCreacion);
    this.#monto = monto;
    this.#isAdmin = isAdmin;
  }

  private validarTamanoClave(clave: string) {
    if (clave.length < NUMERO_MINIMO_CARACTERES_CLAVE) {
      throw new ErrorLongitudInvalida(
        `El tamaño mínimo de la clave debe ser ${NUMERO_MINIMO_CARACTERES_CLAVE}`,
      );
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
  }

  get nombre(): string {
    return this.#nombre;
  }

  get clave(): string {
    return this.#clave;
  }

  get fechaCreacion(): Date {
    return this.#fechaCreacion;
  }

  get monto(): number {
    return this.#monto
  }

  get isAdmin(): boolean {
    return this.#isAdmin;
  }
}
