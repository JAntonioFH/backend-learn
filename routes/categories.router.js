const express = require('express');


const categoriesService = require('./../services/categories.services')

const router = express.Router();
const service = new categoriesService();

router.get('/',async (req, res) => {
    const categories = await service.find();
    res.json(categories);
  }
);


router.get('/:id', async  (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.findOne(id)
    res.json(product);
  } catch (error) {
    next(error);
  }
});


router.post("/",async (req,res)=>{
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct)
})

router.delete("/:id", async (req,res)=>{
  const { id} = req.params;
  const rta = await service.delete(id)
  res.json(rta)
})


router.patch("/:id", async (req,res, next)=>{
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
