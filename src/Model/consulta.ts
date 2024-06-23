import initializeDb from "./databaseCon";

export default class Consulta {
    dataInico: Date | null;
    dataFim: Date | null;
    pacienteId: number | null;
    clinicoId: number | null;
    userId: number | null;
    descricao: string;
    tipoConsulta: string;
    abertoEm: Date | null;

    constructor(
        dataInico: Date | null = null,
        dataFim: Date | null = null,
        pacienteId: number | null = null,
        clinicoId: number | null = null,
        userId: number | null = null,
        descricao: string = "",
        tipoConsulta: string = "",
        abertoEm: Date | null = null
    ) {
        this.dataInico = dataInico;
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
        const result = await db.run(
            "INSERT INTO Consulta (dataInicio, dataFim, pacienteId, clinicoId, userId, descricao, tipoConsulta, abertoEm) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [
                this.dataInico,
                this.dataFim,
                this.pacienteId,
                this.clinicoId,
                this.userId,
                this.descricao,
                this.tipoConsulta,
                this.abertoEm,
            ]
        );
        return result;
    }

    static async get(params: Record<string, any>) {
        const db = await initializeDb();
        let query = "SELECT * FROM Consulta";
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
        const result = await db.all(query, values);
        return result;
    }

    static async update(params: Record<string, any>, id: number) {
        const db = await initializeDb();
        let query = "UPDATE Consulta SET ";
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
        const result = await db.run("DELETE FROM Consulta WHERE id = ?", [id]);
        return result;
    }
}
