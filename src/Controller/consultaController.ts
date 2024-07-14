import { Request, Response } from "express";
import Consulta from "../Model/consulta";
import { getSessionInfo } from "./session";
import { formatISO } from 'date-fns';

const createDatetimeStrings = (dataConsulta: string, horaInicio: string, horaFinal: string): { dataInicio: string, dataFim: string } => {
    return {
        dataInicio: `${dataConsulta} ${horaInicio}`,
        dataFim: `${dataConsulta} ${horaFinal}`,
    };
};

export const getAllConsultas = async (req: Request, res: Response) => {
    try {   
        const consultas = await Consulta.get({});
        res.json(consultas);
    } catch (error) {
        res.json({
            message: "Erro ao buscar consultas!",
            code: 500,
        });
    }
}

export const addConsulta = async (req: Request, res: Response) => {
    try {
        const { dataConsulta, horaInicio, horaFinal, pacienteId, clinicoId, descricao, tipoConsulta } = req.body;

        const { dataInicio, dataFim } = createDatetimeStrings(dataConsulta, horaInicio, horaFinal);
        const session = await getSessionInfo(req, res);
        const userId = session ? (session as any).uid : null;

        let consulta = new Consulta(dataInicio, dataFim, pacienteId, clinicoId, userId, descricao, tipoConsulta);

        const result = await consulta.save();

        res.status(201).json({
            message: "Consulta adicionada com sucesso!",
            code: 201,
            result: result
        });
    } catch (error) {
        console.error("Erro ao adicionar consulta:", error);
        res.status(500).json({
            message: "Erro interno do servidor: " + error,
            code: 500
        });
    }
}

export const getConsultaById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const consulta = await Consulta.get({ id: Number(id) });
        if (consulta.length > 0) {
            res.json(consulta[0]);
        } else {
            res.json({
                message: "Consulta não encontrada!",
                code: 404,
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            message: "Erro ao buscar consulta!",
            code: 500,
        });
    }
}

export const getConsultaByParam = async (req: Request, res: Response) => {
    try {
        const params = req.query;
        const consultas = await Consulta.get(params);
        if (consultas.length > 0) {
            res.json(consultas);
        } else {
            res.json({
                message: "Nenhuma consulta encontrada com os parâmetros fornecidos!",
                code: 404,
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            message: "Erro ao buscar consulta!",
            code: 500,
        });
    }
}

export const updateConsulta = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await Consulta.update(req.body, Number(id));
        if(result){
            res.json({
                message: "Consulta atualizada com sucesso!",
                code: 200,
            });
        } else {
            res.json({
                message: "Erro ao atualizar consulta!",
                code: 500,
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            message: "Erro ao atualizar consulta!",
            code: 500,
        });
    }
}

export const deleteConsulta = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await Consulta.delete(Number(id));
        if(result){
            res.json({
                message: "Consulta deletada com sucesso!",
                code: 200,
            });
        } else {
            res.json({
                message: "Erro ao deletar consulta!",
                code: 500,
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            message: "Erro ao deletar consulta!",
            code: 500,
        });
    }
}

export const verificaHorario = async (req: Request, res: Response) => {
    try {
        const { data, horaInicio, horaFinal, clinicoId } = req.body;

        const { dataInicio, dataFim } = createDatetimeStrings(data, horaInicio, horaFinal);

        const consultas = await Consulta.verificaHorario({ clinicoId, dataInicio, dataFim });
        if (consultas.length > 0) {
            console.log("Já existe uma consulta marcada para este horário!")
            res.json({
                message: "Já existe uma consulta marcada para este horário!",
                code: 409,
            });
        } else {
            console.log("Horário disponível para consulta!")
            res.json({
                message: "Horário disponível para consulta!",
                code: 200,
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            message: "Erro ao verificar horário da consulta!",
            code: 500,
        });
    }
}

export const verificaHorarioIntervalo = async (req: Request, res: Response) => {
    try {
        type Consulta = {
            dia: string;
            inicio: string;
            fim: string;
        };

        const { clinicoId, dataInicio, dataFim, horaInicio, horaFim, duracaoMinutos, diasSemana } = req.body;

        const consultas = await Consulta.verificaHorarioIntervalo({
            clinicoId: clinicoId,
            dataInicio: dataInicio,
            dataFim: dataFim,
            horaInicio: horaInicio,
            horaFim: horaFim,
        });

        const gerarDias = (dataInicio: string, dataFim: string, diasSemana: number[]): string[] => {
            const dias: string[] = [];
            const inicio = new Date(dataInicio);
            const fim = new Date(dataFim);
            let diaAtual = new Date(inicio);

            while (diaAtual <= fim) {
                if (diasSemana.includes(diaAtual.getDay())) {
                    dias.push(diaAtual.toISOString().split('T')[0]);
                }
                diaAtual.setDate(diaAtual.getDate() + 1);
            }

            return dias;
        };

        const converterParaMinutos = (hora: string): number => {
            const [h, m, s] = hora.split(':').map(Number);
            return h * 60 + m + (s ? s / 60 : 0);
        };

        const verificarIntervalo = (consultas: Consulta[], dataInicio: string, dataFim: string, horaInicio: string, horaFim: string, diasSemana: number[], duracaoMinutos: number): string[] => {
            const diasVerificar = gerarDias(dataInicio, dataFim, diasSemana);
            const inicioMinutos = converterParaMinutos(horaInicio);
            const fimMinutos = converterParaMinutos(horaFim);
            const duracaoMinutosInt = parseInt(duracaoMinutos.toString(), 10);
            console.log("Duração em minutos:", duracaoMinutosInt);
            console.log(consultas);
        
            const diasComIntervalo: string[] = [];
        
            diasVerificar.forEach(dia => {
                const consultasDia = consultas.filter(consulta => consulta.dia === dia);
                if (consultasDia.length === 0) {
                    diasComIntervalo.push(dia);
                    return;
                }
        
                consultasDia.sort((a, b) => converterParaMinutos(a.inicio) - converterParaMinutos(b.inicio));
        
                let tempoLivre = inicioMinutos;
        
                // Verificar espaço antes da primeira consulta do dia
                const primeiraConsulta = consultasDia[0];
                const inicioPrimeiraConsulta = converterParaMinutos(primeiraConsulta.inicio);
                if (inicioPrimeiraConsulta >= tempoLivre + duracaoMinutosInt) {
                    diasComIntervalo.push(dia);
                    return;
                }
        
                // Verificar espaço entre consultas
                for (let i = 0; i < consultasDia.length - 1; i++) {
                    const fimConsultaAtual = converterParaMinutos(consultasDia[i].fim);
                    const inicioProximaConsulta = converterParaMinutos(consultasDia[i + 1].inicio);
        
                    if (inicioProximaConsulta >= fimConsultaAtual + duracaoMinutosInt) {
                        diasComIntervalo.push(dia);
                        return;
                    }
        
                    tempoLivre = Math.max(tempoLivre, fimConsultaAtual);
                }
        
                // Verificar espaço após a última consulta do dia
                const fimUltimaConsulta = converterParaMinutos(consultasDia[consultasDia.length - 1].fim);
                if (fimMinutos >= fimUltimaConsulta + duracaoMinutosInt) {
                    diasComIntervalo.push(dia);
                }
            });
        
            console.log("Dias com intervalo:", diasComIntervalo);
        
            return diasComIntervalo;
        };

        const diasDisponiveis = verificarIntervalo(consultas, dataInicio, dataFim, horaInicio, horaFim, diasSemana, duracaoMinutos);

        res.json(diasDisponiveis);

    } catch (error) {
        console.log(error);
        res.json({
            message: "Erro ao verificar horário da consulta!",
            code: 500,
        });
    }
};
