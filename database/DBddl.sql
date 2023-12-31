-- DROP SCHEMA public;

	CREATE SCHEMA public AUTHORIZATION pg_database_owner;

	-- DROP SEQUENCE public.usuarios_id_seq;

	CREATE SEQUENCE public.usuarios_id_seq
		INCREMENT BY 1
		MINVALUE 1
		MAXVALUE 2147483647
		START 1
		CACHE 1
		NO CYCLE;-- public.usuarios definition

	-- Drop table

	-- DROP TABLE usuarios;

	CREATE TABLE usuarios (
		id serial4 PRIMARY KEY NOT NULL,
		nome varchar NOT NULL,
		email varchar NOT NULL,
		senha varchar NOT NULL,
		cargo varchar NOT NULL,
		tipo_usuario int4 NOT NULL,
		usuario varchar NOT NULL
	);


	-- public.userdata source

	CREATE OR REPLACE VIEW public.userdata
	AS SELECT nome,
		email,
		cargo,
		tipo_usuario,
		usuario
	FROM usuarios;


	-- public.userprofile source

	CREATE OR REPLACE VIEW public.userprofile
	AS SELECT usuario,
		senha
	FROM usuarios;