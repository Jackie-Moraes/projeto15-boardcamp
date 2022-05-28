import DateExtension from "@joi/date"
import Joi from "joi"
const joi = Joi.extend(DateExtension)

const userSchema = joi.object({
    name: joi.string().required(),
    phone: joi
        .string()
        .min(10)
        .max(11)
        .pattern(/^[0-9]+$/)
        .required(),
    cpf: joi
        .string()
        .length(11)
        .pattern(/^[0-9]+$/)
        .required(),
    birthday: joi.date().format("YYYY-MM-DD").required(),
})

export default userSchema
