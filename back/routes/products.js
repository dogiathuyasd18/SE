router.get('/', async (req, res) => {
    const products = await Product.findAll();
    res.json(products);
  });
  
  router.get('/:id', async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  });
  