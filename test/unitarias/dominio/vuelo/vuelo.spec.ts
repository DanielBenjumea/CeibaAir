import { ErrorPrecioInvalido } from 'src/dominio/errores/error-precio-invalido';
import { Usuario } from 'src/dominio/usuario/modelo/usuario';
import { Vuelo } from 'src/dominio/vuelo/modelo/Vuelo';

describe('Vuelo', () => {
	const _vuelo = Vuelo as any;

	it('vuelo con precio menor o igual a 0 o mayor a 1000000 deberia retornar error', () => {
		return expect(
			async () => new _vuelo('Bogotá', 'Cali', 0, new Date().toISOString(), new Array<Usuario>())
		).rejects.toStrictEqual(new ErrorPrecioInvalido(`El precio del vuelo debe estar entre 0 y 1000000`));
	});

	it('vuelo con precio correcto debería crearlo bien', () => {
        const vuelo = new _vuelo('Bogotá', 'Cali', 500000, new Date().toISOString(), new Array<Usuario>());

        expect(vuelo.desde).toBe('Bogotá');
        expect(vuelo.hacia).toBe('Cali');
    });
});
