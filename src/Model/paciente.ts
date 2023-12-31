import pool from "./databasePool";

    export default class Paciente {
        nome: string;
        cpf: string;    
        rg: string;
        data_nasc: string;
        sexo: string;
        telefone: string;
        email: string;
        endereco: string;
        numero: string;
        complemento: string;
        bairro: string;
        cidade: string;
        estado: string;
        convenio: string;
        tipo_sanguineo: string;
        fator_rh: string;
        alergias: string;
        medicamentos: string;
        cirurgias: string;
        observacoes: string;
        nome_responsavel: string;
        telefone_responsavel: string;
        email_responsavel: string;
        parentesco: string;

    constructor(nome?: string, cpf?: string, rg?: string, data_nasc?: any, sexo?: string, telefone?: string, email?: string, endereco?: string, numero?: string, complemento?: string, bairro?: string, cidade?: string, estado?: string, convenio?: string, tipo_sanguineo?: string, fator_rh?: string, alergias?: string, medicamentos?: string, cirurgias?: string, observacoes?: string, nome_responsavel?: string, telefone_responsavel?: string, email_responsavel?: string, parentesco?: string) {
        this.nome = nome || '';
        this.cpf = cpf || '';
        this.rg = rg || '';
        this.data_nasc = data_nasc || null;
        this.sexo = sexo || '';
        this.telefone = telefone || '';
        this.email = email || '';
        this.endereco = endereco || '';
        this.numero = numero || '';
        this.complemento = complemento || '';
        this.bairro = bairro || '';
        this.cidade = cidade || '';
        this.estado = estado || '';
        this.convenio = convenio || '';
        this.tipo_sanguineo = tipo_sanguineo || '';
        this.fator_rh = fator_rh || '';
        this.alergias = alergias || '';
        this.medicamentos = medicamentos || '';
        this.cirurgias = cirurgias || '';
        this.observacoes = observacoes || '';
        this.nome_responsavel = nome_responsavel || '';
        this.telefone_responsavel = telefone_responsavel || '';
        this.email_responsavel = email_responsavel || '';
        this.parentesco = parentesco || '';
    }

    static getAllPacientes = () => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM pacientes", (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res.rows);
                }
            });
        });
    };

    static getPacienteBy = async (param: string, value: string) => {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM pacientes WHERE $1 = $2`, [param, value], (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    console.log(result.rows);
                    resolve(result.rows[0]);
                }
            });
        });
    };

    static getPacienteByLike = async (param: string,value: string) => {
        value = "%" + value + "%";
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM pacientes WHERE $1 LIKE $2`, [param, value], (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    console.log(result.rows);
                    resolve(result.rows);
                }
            });
        });
    };

    updatePaciente = async () => {
        return new Promise((resolve, reject) => {
            pool.query(`UPDATE pacientes SET nome = $1, cpf = $2, rg = $3, data_nasc = $4, sexo = $5, telefone = $6, email = $7, endereco = $8, numero = $9, complemento = $10, bairro = $11, cidade = $12, estado = $13, convenio = $14, tipo_sanguineo = $15, fator_rh = $16, alergias = $17, medicamentos = $18, cirurgias = $19, observacoes = $20, nome_responsavel = $21, telefone_responsavel = $22, email_responsavel = $23, parentesco = $24 WHERE cpf = $25`, [this.nome, this.cpf, this.rg, this.data_nasc, this.sexo, this.telefone, this.email, this.endereco, this.numero, this.complemento, this.bairro, this.cidade, this.estado, this.convenio, this.tipo_sanguineo, this.fator_rh, this.alergias, this.medicamentos, this.cirurgias, this.observacoes, this.nome_responsavel, this.telefone_responsavel, this.email_responsavel, this.parentesco, this.cpf], (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    addPaciente = async () => {
        return new Promise((resolve, reject) => {
            pool.query(`INSERT INTO pacientes (nome, cpf, rg, data_nasc, sexo, telefone, email, endereco, numero, complemento, bairro, cidade, estado, convenio, tipo_sanguineo, fator_rh, alergias, medicamentos, cirurgias, observacoes, nome_responsavel, telefone_responsavel, email_responsavel, parentesco) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10 ,$11 ,$12 ,$13 ,$14 ,$15 ,$16 ,$17 ,$18 ,$19 ,$20 ,$21 ,$22 ,$23 ,$24)`, 
            [this.nome, this.cpf, this.rg, this.data_nasc, this.sexo, this.telefone, this.email, this.endereco, this.numero, this.complemento, this.bairro, this.cidade, this.estado, this.convenio, this.tipo_sanguineo, this.fator_rh, this.alergias, this.medicamentos, this.cirurgias, this.observacoes, this.nome_responsavel, this.telefone_responsavel, this.email_responsavel, this.parentesco], 
            (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}
