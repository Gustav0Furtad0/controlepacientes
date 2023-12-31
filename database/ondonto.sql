-- DROP SCHEMA public;

CREATE SCHEMA public AUTHORIZATION pg_database_owner;

-- DROP SEQUENCE public.paciente_id_seq;

CREATE SEQUENCE public.paciente_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.usuarios_id_seq;

CREATE SEQUENCE public.usuarios_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;-- public.pacientes definition

-- Drop table

-- DROP TABLE pacientes;

CREATE TABLE pacientes (
	id int4 NOT NULL DEFAULT nextval('paciente_id_seq'::regclass),
	nome text NOT NULL,
	cpf text NOT NULL,
	rg text NULL,
	data_nasc date NULL,
	sexo text NULL,
	telefone text NULL,
	email text NULL,
	endereco text NULL,
	numero text NULL,
	complemento text NULL,
	bairro text NULL,
	cidade text NULL,
	estado text NULL,
	convenio text NULL,
	tipo_sanguineo text NULL,
	fator_rh text NULL,
	alergias text NULL,
	medicamentos text NULL,
	cirurgias text NULL,
	observacoes text NULL,
	nome_responsavel text NULL,
	telefone_responsavel text NULL,
	email_responsavel text NULL,
	parentesco text NULL,
	CONSTRAINT paciente_pkey PRIMARY KEY (id)
);


-- public.usuarios definition

-- Drop table

-- DROP TABLE usuarios;

CREATE TABLE usuarios (
	id serial4 NOT NULL,
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
AS SELECT id,
    usuario,
    senha,
    tipo_usuario
   FROM usuarios;