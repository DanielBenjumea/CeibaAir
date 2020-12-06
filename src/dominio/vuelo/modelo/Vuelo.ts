import { ErrorPrecioInvalido } from "src/dominio/errores/error-precio-invalido";
import { Usuario } from "src/dominio/usuario/modelo/usuario";

const VALOR_MAXIMO_VUELO = 1000000;
const VALOR_MINIMO_VUELO = 0;
export class Vuelo {
    readonly #desde: string;
    readonly #hacia: string;
    readonly #precio: number;
    readonly #fecha: Date;
    readonly #passengers: Usuario[];

    constructor(desde: string, hacia: string, precio: number, fecha: string, passengers: Usuario[]) {
        this.validarPrecioVuelo(precio);
        this.#desde = desde;
        this.#hacia = hacia;
        this.#precio = precio;
        this.#fecha = new Date(fecha);
        this.#passengers = passengers;
    }

    private validarPrecioVuelo(precio) {
        if(precio <= VALOR_MINIMO_VUELO || precio > VALOR_MAXIMO_VUELO) {
            throw new ErrorPrecioInvalido(
                `El precio del vuelo debe estar entre ${VALOR_MINIMO_VUELO} y ${VALOR_MAXIMO_VUELO}`
            );
        }
    }

    get desde(): string {
        return this.#desde;
    }

    get hacia() :string {
        return this.#hacia;
    }

    get precio(): number {
        return this.#precio;
    }


    get fecha(): Date {
        return this.#fecha;
    }

    get passengers(): Usuario[] {
        return this.#passengers;
    }
}