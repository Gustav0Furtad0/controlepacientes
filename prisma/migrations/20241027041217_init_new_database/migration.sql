-- CreateTable
CREATE TABLE "Paciente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nomeCompleto" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "sexo" TEXT,
    "dataNascimento" TEXT,
    "convenio" TEXT,
    "telefone" TEXT,
    "endereco" TEXT,
    "email" TEXT,
    "alergias" TEXT,
    "doencas" TEXT,
    "nomeCompletoResponsavel" TEXT,
    "telefoneResponsavel" TEXT,
    "cpfResponsavel" TEXT
);

-- CreateTable
CREATE TABLE "Usuario" (
    "uid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nomeUsuario" TEXT NOT NULL,
    "nomeCompleto" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "tipoUsuario" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Consulta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pacienteId" INTEGER NOT NULL,
    "clinicoId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "dataInicio" TEXT NOT NULL,
    "dataFim" TEXT NOT NULL,
    "tipoConsulta" TEXT NOT NULL DEFAULT '0',
    "abertoEm" TEXT NOT NULL,
    "descricao" TEXT,
    CONSTRAINT "Consulta_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Consulta_clinicoId_fkey" FOREIGN KEY ("clinicoId") REFERENCES "Usuario" ("uid") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Consulta_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Usuario" ("uid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Paciente_cpf_key" ON "Paciente"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_nomeUsuario_key" ON "Usuario"("nomeUsuario");
