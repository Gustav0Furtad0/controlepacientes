import initializeDb from "./databaseCon";

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
        let query = `SELECT 
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
                        usuarios.status AS clinicoStatus,
                        parcelas.id AS parcelaId,
                        parcelas.valor AS parcelaValor,
                        parcelas.numero AS parcelaNumero,
                        parcelas.dataVencimento AS parcelaDataVencimento,
                        parcelas.status AS parcelaStatus,
                        parcelas.formaPagamento AS parcelaFormaPagamento,
                        parcelas.userId AS parcelaUserId,
                        parcelas.dataPagamento AS parcelaDataPagamento
                    FROM pagamentos
                    JOIN pacientes ON pagamentos.pacienteId = pacientes.id
                    JOIN usuarios ON pagamentos.userId = usuarios.uid
                    LEFT JOIN parcelas ON pagamentos.id = parcelas.pagamentoId`;
    
        const values: any[] = [];
        if (params && Object.keys(params).length > 0) {
            query += " WHERE ";
            const keys = Object.keys(params);
            for (let i = 0; i < keys.length; i++) {
                query += `${keys[i]} = ?`;
                values.push(params[keys[i]]);
                if (i < keys.length - 1) {
                    query += " AND ";
                }
            }
        }
    
        query += " ORDER BY pagamentos.id DESC";
        const result = await db.all(query, values);
    
        const pagamentosMap = new Map();
        result.forEach((item: any) => {
            if (!pagamentosMap.has(item.id)) {
                pagamentosMap.set(item.id, {
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
                    clinico: {
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
    
            const pagamento = pagamentosMap.get(item.id);
            if (item.parcelaId) {
                pagamento.parcelas.push({
                    id: item.parcelaId,
                    valor: item.parcelaValor,
                    numero: item.parcelaNumero,
                    dataVencimento: item.parcelaDataVencimento,
                    status: item.parcelaStatus,
                    formaPagamento: item.parcelaFormaPagamento,
                    userId: item.parcelaUserId,
                    dataPagamento: item.parcelaDataPagamento
                });
            }
        });
    
        const formattedResult = Array.from(pagamentosMap.values());
        return formattedResult;
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