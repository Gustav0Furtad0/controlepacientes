-- CreateTable
CREATE TABLE "Cobranca" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pacienteId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "descricao" TEXT,
    "valorTotal" REAL NOT NULL,
    "criadoEm" TEXT NOT NULL,
    CONSTRAINT "Cobranca_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Cobranca_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("uid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Parcela" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cobrancaId" INTEGER NOT NULL,
    "numeroParcela" INTEGER NOT NULL,
    "valor" REAL NOT NULL,
    "vencimento" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "pagamentoId" INTEGER,
    CONSTRAINT "Parcela_cobrancaId_fkey" FOREIGN KEY ("cobrancaId") REFERENCES "Cobranca" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Parcela_pagamentoId_fkey" FOREIGN KEY ("pagamentoId") REFERENCES "Pagamento" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pagamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cobrancaId" INTEGER,
    "dataPagamento" TEXT NOT NULL,
    "valorPago" REAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "tipoPagamento" TEXT NOT NULL,
    CONSTRAINT "Pagamento_cobrancaId_fkey" FOREIGN KEY ("cobrancaId") REFERENCES "Cobranca" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Pagamento_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("uid") ON DELETE RESTRICT ON UPDATE CASCADE
);
