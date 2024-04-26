--
-- File generated with SQLiteStudio v3.4.4 on ter abr 23 03:35:54 2024
--
-- Text encoding used: System
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: consultas
CREATE TABLE consultas (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, pacienteId INTEGER REFERENCES pacientes (id) NOT NULL, clinicoId INTEGER REFERENCES usuarios (uid) NOT NULL, userId INTEGER REFERENCES usuarios (uid) NOT NULL, dataInicio TEXT NOT NULL, dataFim TEXT NOT NULL, tipoConsulta TEXT DEFAULT (0) NOT NULL, abertoEm TEXT NOT NULL AS (datetime('now', 'localtime')));

-- Table: fotosConsulta
CREATE TABLE fotosConsulta (id INTEGER PRIMARY KEY AUTOINCREMENT, consultaId INTEGER REFERENCES consultas (id) NOT NULL, caminhoFoto TEXT NOT NULL);

-- Table: pacientes
CREATE TABLE pacientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT, -- Um campo id como chave prim�ria
    nomeCompleto TEXT NOT NULL,
    sexo TEXT,
    cpf TEXT UNIQUE NOT NULL, -- CPF como �nico para evitar duplicatas
    dataNascimento DATE,
    convenio TEXT,
    telefone TEXT,
    endereco TEXT,
    email TEXT,
    alergias TEXT,
    doencas TEXT,
    nomeCompletoResponsavel TEXT,
    telefoneResponsavel TEXT,
    cpfResponsavel TEXT
);

-- Table: pagamentos
CREATE TABLE pagamentos (id INTEGER PRIMARY KEY AUTOINCREMENT, consultaId INTEGER REFERENCES consultas (id) NOT NULL, valor REAL, dataCobranca TEXT, statusPagamento TEXT NOT NULL DEFAULT ('pendente'), numeroParcela INTEGER DEFAULT (1));

-- Table: parcelas
CREATE TABLE parcelas (id INTEGER PRIMARY KEY AUTOINCREMENT, pagamentosId INTEGER NOT NULL REFERENCES pagamentos (id), numeroParcela INTEGER NOT NULL, valorParcela REAL NOT NULL, dataVencimento TEXT, statusParcela TEXT DEFAULT ('pendente'));

-- Table: usuarios
CREATE TABLE usuarios (uid INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE NOT NULL, nomeUsuario TEXT NOT NULL UNIQUE, nomeCompleto TEXT NOT NULL, senha TEXT NOT NULL, email TEXT NOT NULL, tipoUsuario TEXT NOT NULL, status INTEGER DEFAULT (0) NOT NULL);

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
