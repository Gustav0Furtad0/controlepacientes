-- CreateTable
CREATE TABLE "ConsultaArquivo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "consultaId" INTEGER NOT NULL,
    "caminho" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ConsultaArquivo_consultaId_fkey" FOREIGN KEY ("consultaId") REFERENCES "Consulta" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
