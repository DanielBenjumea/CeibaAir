export enum EnvVariables {
	/* DATABASE VARIABLES */
	DATABASE_TYPE = 'DATABASE_TYPE',
	DATABASE_PORT = 'DATABASE_PORT',
	DATABASE_HOST = 'DATABASE_HOST',
	DATABASE_USER = 'DATABASE_USER',
	DATABASE_PASSWORD = 'DATABASE_PASSWORD',
	DATABASE_NAME = 'DATABASE_NAME',
	DATABASE_SYNCHRONIZE = 'DATABASE_SYNCHRONIZE',

	/* TYPEORM VARIABLES */
	TYPEORM_ENTITIES_DIR = 'TYPEORM_ENTITIES_DIR',
	TYPEORM_MIGRATIONS_DIR = 'TYPEORM_MIGRATIONS_DIR',
	TYPEORM_MIGRATIONS_TABLENAME = 'TYPEORM_MIGRATIONS_TABLENAME',
	TYPEORMCLI_MIGRATIONS_DIR = 'TYPEORMCLI_MIGRATIONS_DIR',

	/* APP VARIABLES */
	APPLICATION_PORT = 'APPLICATION_PORT',
	APPLICATION_CONTEXT_PATH = 'APPLICATION_CONTEXT_PATH'
}
