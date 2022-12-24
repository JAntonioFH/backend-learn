const express = require('express');
const usersServices = require('./../services/users.services')
const validatorHandler  = require('./../middlewares/validator.handler')
const {createUserSchema,updateUserScema,getUserScema,deleteUsersScema} = require('./../schemas/user.schemas')

const router = express.Router();

const service = new usersServices();


router.get('/',async  (req, res) => {
    const users = await service.find();
    res.json(users);
  }
);

router.get('/:id',
  validatorHandler(getUserScema,'params'),
  async  (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id)
      res.json(user);
    } catch (error) {
      next(error)
    }
});

router.post("/",
  validatorHandler(createUserSchema,'body'),
  async (req,res,next)=>{
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.status(201).json(newUser)
    } catch (error) {
      next(error)
    }
})

router.delete("/:id",
  validatorHandler(deleteUsersScema,'params'),
  async (req,res,next)=>{
    try {
      const { id} = req.params;
      const rta = await service.delete(id)
      res.json(rta)
    } catch (error) {
      next(error);
    }
})


  router.patch("/:id",
    validatorHandler(getUserScema,'params'),
    validatorHandler(updateUserScema,'body'),
    async (req,res,next)=>{
    try {
      const { id } = req.params;
      const body = req.body;
      const user =  await service.update(id, body)
      res.json(user)
    } catch (error) {
        next(error)
    }
  });





module.exports = router;
