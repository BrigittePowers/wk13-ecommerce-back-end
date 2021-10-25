const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET all categories, include assc. products
router.get('/', async (req, res) => {
  const categoryData = await Category.findAll(
    {
      include: {
        model: Product,
        attributes: ['product_name']
      }
    }
  )
  .catch((err) => {
    res.status(500).json(err);
  });
  res.json(categoryData);
});

// GET category by id, include assc. products
router.get('/:id', async (req, res) => {
  const categoryDataById = await Category.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['category_id']
    }
  })
  .catch((err) => {
    res.status(500).json(err);
  });
  res.json(categoryDataById);
});

// POST new category
router.post('/', async (req, res) => {
  const newCategory = await Category.create({
    category_name: req.body.category_name
  })
  .catch((err) => {
    res.status(500).json(err);
  })
  res.json(newCategory);
});

// PUT update category by ID
router.put('/:id', async (req, res) => {
  const updateCategory = await Category.update({
    category_name: req.body.category_name
  },
  {
    where: {
      id: req.params.id
    }
  })
  .catch((err) => {
    res.status(500).json(err);
  })
  res.json(updateCategory);
});

// DELETE category by ID
router.delete('/:id', async (req, res) => {
  const deleteCategory = await Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .catch((err) => {
    res.status(500).json(err);
  })
  res.json(deleteCategory);
});

module.exports = router;
