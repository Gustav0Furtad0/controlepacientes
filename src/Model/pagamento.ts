import initializeDb from "./databaseCon";
import Usuario from "./usuario";

export default class Pagamento {
    id: number | null;
    consultaId: number | null;
    userId: number | null;
    valor: number;
    status: string | null;
    abertoEm: string | null;
    pacienteId: number | null;

    constructor(
        id: number | null = null,
        consultaId: number | null = null,
        userId: number,
        valor: number,
        status: string | null = null,
        abertoEm: string | null = null,
        pacienteId: number,

    ) {
        this.id = id;
        this.consultaId = consultaId;
        this.userId = userId;
        this.valor = valor;
        this.status = status;
        this.abertoEm = abertoEm;
        this.pacienteId = pacienteId;
    }

    async save() {
        const db = await initializeDb();
        let todayDate = new Date();
        let abertoEm = `${todayDate.getFullYear()}-${(todayDate.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${todayDate
            .getDate()
            .toString()
            .padStart(2, "0")} ${todayDate
            .getHours()
            .toString()
            .padStart(2, "0")}`;

        const result = await db.run(
            `INSERT INTO pagamentos (consultaId, userId, valor, status, abertoEm, pacienteId) 
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                this.consultaId,
                this.userId,
                this.valor,
                this.status,
                abertoEm,
                this.pacienteId
            ]
        );

        return result;
    }


    static async get(params: Record<string, any>) {
        const db = await initializeDb();
    
        let pagamentosQuery = `
            SELECT 
                pagamentos.*,
                pacientes.id AS pacienteId,
                pacientes.nomeCompleto AS pacienteNome,
                pacientes.sexo AS pacienteSexo,
                pacientes.cpf AS pacienteCpf,
                pacientes.dataNascimento AS pacienteDataNascimento,
                pacientes.convenio AS pacienteConvenio,
                pacientes.telefone AS pacienteTelefone,
                pacientes.endereco AS pacienteEndereco,
                pacientes.email AS pacienteEmail,
                pacientes.alergias AS pacienteAlergias,
                pacientes.doencas AS pacienteDoencas,
                pacientes.nomeCompletoResponsavel AS pacienteNomeCompletoResponsavel,
                pacientes.telefoneResponsavel AS pacienteTelefoneResponsavel,
                pacientes.cpfResponsavel AS pacienteCpfResponsavel,
                usuarios.uid AS clinicoId,
                usuarios.nomeCompleto AS clinicoNome,
                usuarios.nomeUsuario AS clinicoNomeUsuario,
                usuarios.email AS clinicoEmail,
                usuarios.tipoUsuario AS clinicoTipoUsuario,
                usuarios.status AS clinicoStatus
            FROM pagamentos
            JOIN pacientes ON pagamentos.pacienteId = pacientes.id
            JOIN usuarios ON pagamentos.userId = usuarios.uid
        `;
    
        const pagamentosValues: any[] = [];
        if (params && Object.keys(params).length > 0) {
            pagamentosQuery += " WHERE ";
            const keys = Object.keys(params);
            for (let i = 0; i < keys.length; i++) {
                pagamentosQuery += `${keys[i]} = ?`;
                pagamentosValues.push(params[keys[i]]);
                if (i < keys.length - 1) {
                    pagamentosQuery += " AND ";
                }
            }
        }
    
        pagamentosQuery += " ORDER BY pagamentos.id DESC";
        const pagamentosResult = await db.all(pagamentosQuery, pagamentosValues);
    
        const pagamentosArray: any[] = [];
        for (const item of pagamentosResult) {
            pagamentosArray.push({
                id: item.id,
                valor: item.valor,
                formaPagamento: item.formaPagamento,
                dataPagamento: item.dataPagamento,
                consultaId: item.consultaId,
                userId: item.userId,
                abertoEm: item.abertoEm,
                paciente: {
                    id: item.pacienteId,
                    nome: item.pacienteNome,
                    sexo: item.pacienteSexo,
                    cpf: item.pacienteCpf,
                    dataNascimento: item.pacienteDataNascimento,
                    convenio: item.pacienteConvenio,
                    telefone: item.pacienteTelefone,
                    endereco: item.pacienteEndereco,
                    email: item.pacienteEmail,
                    alergias: item.pacienteAlergias,
                    doencas: item.pacienteDoencas,
                    nomeResponsavel: item.pacienteNomeCompletoResponsavel,
                    telefoneResponsavel: item.pacienteTelefoneResponsavel,
                    cpfResponsavel: item.pacienteCpfResponsavel
                },
                usuario: {
                    id: item.clinicoId,
                    nome: item.clinicoNome,
                    nomeUsuario: item.clinicoNomeUsuario,
                    email: item.clinicoEmail,
                    tipoUsuario: item.clinicoTipoUsuario,
                    status: item.clinicoStatus
                },
                parcelas: []
            });
            
        }

        const pagamentoIds = pagamentosArray.map((pagamento: any) => pagamento.id);
    
        if (pagamentoIds.length > 0) {
            const parcelasQuery = `
                SELECT 
                    parcelas.*, 
                    usuarios.nomeCompleto AS usuarioNomeCompleto,
                    usuarios.nomeUsuario AS usuarioNomeUsuario
                FROM parcelas
                JOIN usuarios ON parcelas.userId = usuarios.uid
                WHERE pagamentoId IN (${pagamentoIds.join(',')})
            `;
    
            const parcelasResult = await db.all(parcelasQuery);
            parcelasResult.forEach((parcela: any) => {
                const pagamento = pagamentosArray.find((pagamento: any) => pagamento.id === parcela.pagamentoId);
                pagamento.parcelas.push({
                    id: parcela.id,
                    numero: parcela.numero,
                    valor: parcela.valor,
                    dataVencimento: parcela.dataVencimento,
                    status: parcela.status,
                    formaPagamento: parcela.formaPagamento,
                    usuario: {
                        id: parcela.userId,
                        nomeCompleto: parcela.usuarioNomeCompleto,
                        nomeUsuario: parcela.usuarioNomeUsuario
                    },
                    dataPagamento: parcela.dataPagamento,
                    abertoEm: parcela.abertoEm,
                });
            });
        }
        return Array.from(pagamentosArray.values());
    }    

    static async update(params: Record<string, any>, id: number) {
        const db = await initializeDb();
        let query = `UPDATE pagamentos SET `;
        const keys = Object.keys(params);
        const values: any[] = [];
        for (let i = 0; i < keys.length; i++) {
            query += `${keys[i]} = ?`;
            values.push(params[keys[i]]);
            if (i < keys.length - 1) {
                query += ", ";
            }
        }
        query += ` WHERE id = ?`;
        values.push(id);
        const result = await db.run(query, values);
        return result;
    }

    static async delete(id: number) {
        const db = await initializeDb();
        const result = await db.run(`DELETE FROM pagamentos WHERE id = ?`, [id]);
        return result;
    }
}