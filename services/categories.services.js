const faker = require('faker');
const boom = require('@hapi/boom')
const {models} = require('../libs/sequelize')

class categoriesServices{

    constructor(){
        this.categories = []
        this.generate()
    }

    generate(){
        this.categories.push(
            {
            id: faker.datatype.uuid(),
            name: 'Hamburguesas',
            image: faker.image.imageUrl()
            },
            {
            id: faker.datatype.uuid(),
            name: 'Sushi',
            image: faker.image.imageUrl()
            },
            {
            id: 3,
            name: faker.datatype.uuid(),
            image: faker.image.imageUrl()
            },
            {
            id: faker.datatype.uuid(),
            name: 'Snacks',
            image: faker.image.imageUrl()
            }

        )
    }
    async create(data){
        const newCategory = {
            id: faker.datatype.uuid(),
            ...data
        }
        this.categories.push(newCategory);
        return newCategory;
    }
    async find(){
      const rta = await models.Category.findAll();
      return rta;
    }
    async findOne(id){
        const category = this.categories.find(item=> item.id === id)
        if(!category){
            throw boom.notFound('product not found');
        }
        if(category.isBlock){
            throw boom.conflict('product is block');
        }
        return category;
    }
    async update(id, changes){
        const index = this.categories.findIndex(item=> item.id === id)
        if(index === -1){
            throw boom.notFound('Producto no encontrado');
        }
        const category = this.categories[index];
        this.categories[index] = {
            ...category,
            ...changes
        };
        return this.categories[index]
    }
    async delete(id){
        const index = this.categories.findIndex(item=> item.id === id)
        if(index === -1){
            throw boom.notFound('Producto no encontrado');
        }
        this.categories.splice(index,1)
        return {id};
    }
}

module.exports = categoriesServices;
