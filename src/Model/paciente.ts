import initializeDb from './databaseCon';

export default class Paciente {
    nomeCompleto: string;
    sexo: string;
    cpf: string;
    dataNascimento: any;
    convenio: string;
    telefone: string;
    endereco: string;
    email: string;
    alergias: string;
    doencas: string;
    nomeCompletoResponsavel: string;
    telefoneResponsavel: string;
    cpfResponsavel: string;

    constructor(nomeCompleto: string, sexo: string, cpf: string, dataNascimento: any, convenio: string, telefone: string, endereco: string, email: string, alergias: string, doencas: string, nomeCompletoResponsavel: string, telefoneResponsavel: string, cpfResponsavel: string) {
        this.nomeCompleto = nomeCompleto;
        this.sexo = sexo;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.convenio = convenio;
        this.telefone = telefone;
        this.endereco = endereco;
        this.email = email;
        this.alergias = alergias;
        this.doencas = doencas;
        this.nomeCompletoResponsavel = nomeCompletoResponsavel;
        this.telefoneResponsavel = telefoneResponsavel;
        this.cpfResponsavel = cpfResponsavel;
    }

    static async addPaciente(paciente: Paciente): Promise<boolean> {
        const db = await initializeDb();
        try {
            console.log('Database initialized');
            await db.run("INSERT INTO pacientes (nomeCompleto, sexo, cpf, dataNascimento, convenio, telefone, endereco, email, alergias, doencas, nomeCompletoResponsavel, telefoneResponsavel, cpfResponsavel) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                paciente.nomeCompleto, paciente.sexo, paciente.cpf, paciente.dataNascimento,
                paciente.convenio, paciente.telefone, paciente.endereco, paciente.email,
                paciente.alergias, paciente.doencas, paciente.nomeCompletoResponsavel,
                paciente.telefoneResponsavel, paciente.cpfResponsavel
            ]);
            return true;
        } catch (error) {
            console.error('Error while inserting data into the database:', error);
            return false;
        } finally {
            db.close();
        }
    }

    static getAllPacientes = async (): Promise<any[]> => {
        const db = await initializeDb();
        try {
            return db.all("SELECT * FROM pacientes ORDER BY nomeCompleto ASC");
        } catch (error) {
            console.log(error);
            return [];
        } finally {
            db.close();
        }
    };

    static getPacienteBy = (param: string, value: string) => {
        return new Promise( async (resolve, reject) => {
            const db = await initializeDb();
            try {
                const allowedParams = ['nomeCompleto', 'sexo', 'cpf', 'dataNascimento', 'convenio', 'telefone', 'endereco', 'email', 'alergias', 'doencas', 'nomeCompletoResponsavel', 'telefoneResponsavel', 'cpfResponsavel'];
                if (!allowedParams.includes(param)) {
                    throw new Error("Parâmetro de busca inválido.");
                }
                db.get(`SELECT * FROM pacientes WHERE ${param} = ?`, [value], (err: any, result: unknown) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        console.log(result);
                        resolve(result);
                    }
                });
            } catch (error) {
                console.log(error);
                reject(error);
            } finally {
                db.close();
            }
        });
    };

    static getPacienteByLike = async (param: string,value: string) => {

        const db = await initializeDb();
        return new Promise( async (resolve, reject) => {
            value = "%" + value + "%";
            db.all(`SELECT * FROM pacientes WHERE ${param} LIKE ?`, [value], (err: any, result: unknown) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    console.log(result);
                    resolve(result);
                }
            });
        });
    };

    static updatePaciente = async (paciente: Paciente) => {
        return new Promise(async (resolve, reject) => {
            const db = await initializeDb();
            try {
                db.run("UPDATE pacientes SET nomeCompleto = ?, sexo = ?, cpf = ?, dataNascimento = ?, convenio = ?, telefone = ?, endereco = ?, email = ?, alergias = ?, doencas = ?, nomeCompletoResponsavel = ?, telefoneResponsavel = ?, cpfResponsavel = ? WHERE cpf = ?", 
                [paciente.nomeCompleto, paciente.sexo, paciente.cpf, paciente.dataNascimento, paciente.convenio, paciente.telefone, paciente.endereco, paciente.email, paciente.alergias, paciente.doencas, paciente.nomeCompletoResponsavel, paciente.telefoneResponsavel, paciente.cpfResponsavel, paciente.cpf],
                function (err: any) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        resolve(true);
                    }
                });
            } catch (error) {
                console.log(error);
                reject(error);
            } finally {
                db.close();
            }
        });
    };
}
