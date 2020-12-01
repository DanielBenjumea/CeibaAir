import { Usuario } from "src/dominio/usuario/modelo/usuario";


export class Vuelo {
    readonly #desde: string;
    readonly #hacia: string;
    readonly #precio: number;
    readonly #fecha: Date;
    readonly #passengers: Usuario[];

    constructor(desde: string, hacia: string, precio: number, fecha: string, passengers: Usuario[]) {
        this.#desde = desde;
        this.#hacia = hacia;
        this.#precio = precio;
        this.#fecha = new Date(fecha);
        this.#passengers = passengers;
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