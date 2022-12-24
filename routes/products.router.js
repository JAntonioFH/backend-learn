const express = require('express');


const productsService = require('./../services/products.services')
const validatorHandler = require('./../middlewares/validator.handler')
const {createProductSchema,updateProductScema,getProductScema,deleteProductScema} = require('./../schemas/product.schemas')

const router = express.Router();
const service = new productsService();

router.get('/',async (req, res) => {
    const products = await service.find();
    res.json(products);
  }
);


router.get('/:id',
  validatorHandler(getProductScema,'params'),
  async  (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id)
      res.json(product);
    } catch (error) {
      next(error);
    }
  });


router.post("/",
validatorHandler(createProductSchema,'body'),
  async (req,res)=>{
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct)
})

router.delete("/:id",
  validatorHandler(deleteProductScema,'params'),
  async (req,res)=>{
  const { id} = req.params;
  const rta = await service.delete(id)
  res.json(rta)
})


router.patch("/:id",
  validatorHandler(getProductScema,'params'),
  validatorHandler(updateProductScema,'body'),
  async (req,res, next)=>{
  try {
    const { id } = req.params;
    const body = req.body;
    const product =  await service.update(id, body)
    res.json(product)
  } catch (error) {
    next(error);
  }
});


module.exports = router;

