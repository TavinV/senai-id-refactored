import Joi from "joi";

export const alunoSchema = Joi.object({
    nome: Joi.string().required(),
    rg: Joi.string().required(),
    login: Joi.string().required(),
    senha: Joi.string().required(),
    turma: Joi.string().required(),
    horario_entrada: Joi.string().required(),
    matricula: Joi.string().required(),
    data_nascimento: Joi.string().required(),
    curso: Joi.string().required()
})

export const funcionarioSchema = Joi.object({
    nome: Joi.string().required(),
    cpf: Joi.string().length(11).required(), // CPF com 11 dígitos
    login: Joi.string().required(),
    senha: Joi.string().required(),
    pis: Joi.string().length(11).required(), // PIS com 11 dígitos
    descricao: Joi.string().required(), // Descrição do funcionário
    nif: Joi.string().required(), // Número de identificação fiscal (se aplicável)
    data_nascimento: Joi.string().required(), // Data 
    email: Joi.string().email().required(), // Email do funcionário
});