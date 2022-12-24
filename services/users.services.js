const faker = require('faker');
const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');
const { User } = require('../db/models/user.model');
// var newUser = []
class usersServices{

constructor(){
    this.users = [];
    this.generate()
}
   async generate(){
        for (let index = 0; index < 100; index++) {
            this.users.push({
                email: faker.internet.email(),
                password:faker.internet.password()
            });
            // newUser =  models.User.create(this.users[index]);
            // console.log(this.users[index])
        }
    }

    async create(data){
      const newUser = await models.User.create(data);
      return newUser;
    }
    async find(){
      const rta = await models.User.findAll();
      return rta;
    }
    async findOne(id){
      const user = await User.findByPk(id);
      if(!user){
        throw boom.notFound('Usuario no encontrado');
      }
      return user;
    }
    async update(id, changes){
        const user = await this.findOne(id);
        const rta = await user.update(changes)
      return rta;

    }
    async delete(id){
        const user = await this.findOne(id);
        await user.destroy();
        return { id }
    }

}


module.exports = usersServices;
