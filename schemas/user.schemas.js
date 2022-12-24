const Joi = require('joi')

const email = Joi.string().email();
const id = Joi.number();
// const name = Joi.string().min(3).max(15);
// const image = Joi.string().uri();
const password = Joi.string().min(8);



const createUserSchema = Joi.object({
    email: email.required(),
    password: password.required()
});

const updateUserScema= Joi.object({
  email: email.required(),
  password: password.required()
})

const getUserScema= Joi.object({
    id: id.required()
})


const deleteUsersScema= Joi.object({
    id: id.required()
})


module.exports={createUserSchema,updateUserScema,getUserScema,deleteUsersScema}

