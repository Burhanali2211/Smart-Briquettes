const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { auth, roleCheck } = require('../middleware/auth');

const prisma = new PrismaClient();

// Get all products (Public)
router.get('/', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: { seller: { select: { name: true, profileImage: true, location: true } } }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching products' });
  }
});

// Get seller's own products (ADMIN sees all)
router.get('/my-products', auth, roleCheck(['SELLER', 'ADMIN']), async (req, res) => {
  try {
    const where = req.user.role === 'ADMIN' ? {} : { sellerId: req.user.id };
    const products = await prisma.product.findMany({ where });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching your products' });
  }
});

// Get single product (Public)
router.get('/:id', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: { seller: { select: { name: true, profileImage: true, coverImage: true, bio: true, location: true } } }
    });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching product' });
  }
});

// Get all products for a specific seller (Public)
router.get('/seller/:id', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: { sellerId: req.params.id },
      include: { seller: { select: { name: true } } }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching seller products' });
  }
});

// Add a product
router.post('/', auth, roleCheck(['SELLER', 'ADMIN']), async (req, res) => {
  try {
    const { title, description, price, stock, category, imageUrl } = req.body;
    const product = await prisma.product.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
        category,
        imageUrl,
        sellerId: req.user.id
      }
    });
    res.json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Server error creating product' });
  }
});

// Delete a product
router.delete('/:id', auth, roleCheck(['SELLER', 'ADMIN']), async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product || (req.user.role !== 'ADMIN' && product.sellerId !== req.user.id)) {
      return res.status(403).json({ error: 'Not authorized to delete this product' });
    }
    
    await prisma.product.delete({ where: { id } });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error deleting product' });
  }
});

// Update a product
router.put('/:id', auth, roleCheck(['SELLER', 'ADMIN']), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, stock, category, imageUrl } = req.body;

    const product = await prisma.product.findUnique({ where: { id } });
    if (!product || (req.user.role !== 'ADMIN' && product.sellerId !== req.user.id)) {
      return res.status(403).json({ error: 'Not authorized to edit this product' });
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        title,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
        category,
        ...(imageUrl && { imageUrl })
      }
    });
    
    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Server error updating product' });
  }
});

module.exports = router;
