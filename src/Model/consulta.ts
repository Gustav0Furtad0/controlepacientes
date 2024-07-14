import initializeDb from "./databaseCon";

export default class Consulta {
    dataInicio: string | null;
    dataFim: string | null;
    pacienteId: number | null;
    clinicoId: number | null;
    userId: number | null;
    descricao: string;
    tipoConsulta: string;
    abertoEm: string | null;

    constructor(
        dataInicio: string | null = null,
        dataFim: string | null = null,
        pacienteId: number | null = null,
        clinicoId: number | null = null,
        userId: number | null = null,
        descricao: string = "",
        tipoConsulta: string = "",
        abertoEm: string | null = null
    ) {
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
        this.pacienteId = pacienteId;
        this.clinicoId = clinicoId;
        this.userId = userId;
        this.descricao = descricao;
        this.tipoConsulta = tipoConsulta;
        this.abertoEm = abertoEm;
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
            .padStart(2, "0")}:${todayDate
            .getMinutes()
            .toString()
            .padStart(2, "0")}`;

        const result = await db.run(
            `INSERT INTO consultas (dataInicio, dataFim, pacienteId, clinicoId, userId, abertoEm, descricao, tipoConsulta) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                this.dataInicio,
                this.dataFim,
                this.pacienteId,
                this.clinicoId,
                this.userId,
                abertoEm,
                this.descricao,
                this.tipoConsulta,
            ]
        );
        return result;
    }

    static async get(params: Record<string, any>) {
        const db = await initializeDb();
        let query = `
            SELECT 
                consultas.*,
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
            FROM 
                consultas
            JOIN 
                pacientes ON consultas.pacienteId = pacientes.id
            JOIN 
                usuarios ON consultas.clinicoId = usuarios.uid
        `;
        const values: any[] = [];
        if (params && Object.keys(params).length > 0) {
            query += " WHERE ";
            const keys = Object.keys(params);
            for (let i = 0; i < keys.length; i++) {
                if (keys[i] === "data") {
                    query += `substr(consultas.dataInicio, 1, 10) = ?`; 
                } else {
                    query += `${keys[i]} = ?`;
                }
                if (
                    keys[i] === "clinicoId" ||
                    keys[i] === "pacienteId" ||
                    keys[i] === "userId" ||
                    keys[i] === "id"
                ) {
                    values.push(Number(params[keys[i]]));
                } else {
                    values.push(params[keys[i]]);
                }
                if (i < keys.length - 1) {
                    query += " AND ";
                }
            }
        }
        query += " ORDER BY consultas.dataInicio DESC";
        const result = await db.all(query, values);
        const formmattedResult = result.map((item: any) => {
            return {
                id: item.id,
                dataInicio: item.dataInicio,
                dataFim: item.dataFim,
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
                    nomeCompletoResponsavel:
                        item.pacienteNomeCompletoResponsavel,
                    telefoneResponsavel: item.pacienteTelefoneResponsavel,
                    cpfResponsavel: item.pacienteCpfResponsavel,
                },
                clinico: {
                    id: item.clinicoId,
                    nome: item.clinicoNome,
                    nomeUsuario: item.clinicoNomeUsuario,
                    email: item.clinicoEmail,
                    tipoUsuario: item.clinicoTipoUsuario,
                    status: item.clinicoStatus,
                },
                userId: item.userId,
                abertoEm: item.abertoEm,
                descricao: item.descricao,
                tipoConsulta: item.tipoConsulta,
            };
        });
        return formmattedResult;
    }

    static async update(params: Record<string, any>, id: number) {
        const db = await initializeDb();
        let query = "UPDATE consultas SET ";
        const values: any[] = [];
        const keys = Object.keys(params);
        for (let i = 0; i < keys.length; i++) {
            query += `${keys[i]} = ?`;
            values.push(params[keys[i]]);
            if (i < keys.length - 1) {
                query += ", ";
            }
        }
        query += " WHERE id = ?";
        values.push(id);
        const result = await db.run(query, values);
        return result;
    }

    static async delete(id: number) {
        const db = await initializeDb();
        const result = await db.run("DELETE FROM consultas WHERE id = ?", [id]);
        return result;
    }

    static async verificaHorario(params: Record<string, any>) {
        const db = await initializeDb();
        const { clinicoId, dataInicio, dataFim } = params;
    
        const formattedDataInicio = new Date(dataInicio).toISOString().slice(0, 19).replace('T', ' ');
        const formattedDataFim = new Date(dataFim).toISOString().slice(0, 19).replace('T', ' ');
    
        const query = `
            SELECT *
            FROM consultas
            WHERE clinicoId = ?
            AND (
                (dataInicio BETWEEN ? AND ?) OR
                (dataFim BETWEEN ? AND ?) OR
                (? BETWEEN dataInicio AND dataFim) OR
                (? BETWEEN dataInicio AND dataFim)
            )
            LIMIT 1;
        `;
    
        const result = await db.all(query, [
            clinicoId,
            formattedDataInicio,
            formattedDataFim,
            formattedDataInicio,
            formattedDataFim,
            formattedDataInicio,
            formattedDataFim,
        ]);

        return result;
    }

    static async verificaHorarioIntervalo(params: Record<string, any>) {
        const db = await initializeDb(); 
        const {
            clinicoId,
            dataInicio,
            dataFim,
            horaInicio,
            horaFim,
        } = params;
    
        const query = `
            SELECT 
                date(dataInicio) as dia, 
                time(dataInicio) as inicio,
                time(dataFim) as fim
            FROM consultas
            WHERE clinicoId = ?
            AND date(dataInicio) BETWEEN ? AND ?
            AND (
                (time(dataInicio) BETWEEN ? AND ?) OR
                (time(dataFim) BETWEEN ? AND ?) OR
                (time(dataInicio) < ? AND time(dataFim) > ?)
            )
        `;
    
        const result = await db.all(query, [
            clinicoId,
            dataInicio,
            dataFim,
            horaInicio,
            horaFim,
            horaInicio,
            horaFim,
            horaInicio,
            horaFim,
        ]);
    
        return result;
    }
}
