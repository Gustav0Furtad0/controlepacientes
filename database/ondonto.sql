BEGIN;

CREATE TABLE IF NOT EXISTS public.usuarios
(
    id serial PRIMARY KEY,
    usuario text NOT NULL,
    senha text NOT NULL,
    nome text NOT NULL,
    email text NOT NULL,
    tipo_usuario integer NOT NULL DEFAULT 2,
    cargo text NOT NULL
);

CREATE TABLE IF NOT EXISTS public.pacientes
(
    id serial PRIMARY KEY,
    nome text,
    cpf integer,
    idade integer,
    contato json,
    necessidades json
);

CREATE TABLE IF NOT EXISTS public.debitos
(
    id serial PRIMARY KEY,
    id_paciente integer NOT NULL,
    parcelas text NOT NULL,
    valor money NOT NULL,
    titulo text NOT NULL,
    data_vencimento date NOT NULL,
    id_usuario integer NOT NULL
);

CREATE TABLE IF NOT EXISTS public.orcamento
(
    id serial PRIMARY KEY,
    id_usuario integer NOT NULL,
    id_paciente integer NOT NULL,
    informacoes text,
    pasta_documentos text
);

CREATE TABLE IF NOT EXISTS public.consulta
(
    id serial PRIMARY KEY,
    id_paciente integer NOT NULL,
    id_usuario integer NOT NULL,
    data_consulta date NOT NULL,
    pasta_documentos text,
    informacoes text
);

ALTER TABLE IF EXISTS public.debitos
    ADD CONSTRAINT usuario FOREIGN KEY (id_usuario)
    REFERENCES public.usuarios (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION VALIDATE;

ALTER TABLE IF EXISTS public.debitos
    ADD CONSTRAINT paciente FOREIGN KEY (id_paciente)
    REFERENCES public.pacientes (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION VALIDATE;

ALTER TABLE IF EXISTS public.orcamento
    ADD CONSTRAINT usuario FOREIGN KEY (id_usuario)
    REFERENCES public.usuarios (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION VALIDATE;

ALTER TABLE IF EXISTS public.orcamento
    ADD CONSTRAINT paciente FOREIGN KEY (id_paciente)
    REFERENCES public.pacientes (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION VALIDATE;

ALTER TABLE IF EXISTS public.consulta
    ADD CONSTRAINT usuario FOREIGN KEY (id_usuario)
    REFERENCES public.usuarios (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION VALIDATE;

ALTER TABLE IF EXISTS public.consulta
    ADD CONSTRAINT paciente FOREIGN KEY (id_paciente)
    REFERENCES public.pacientes (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION VALIDATE;

END;