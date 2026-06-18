const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { auth, roleCheck } = require('../middleware/auth');

const prisma = new PrismaClient();

// List all users (Admin only)
router.get('/', auth, roleCheck(['ADMIN']), async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, createdAt: true }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching users' });
  }
});

// Update profile (Seller or Admin)
router.put('/profile', auth, roleCheck(['SELLER', 'ADMIN']), async (req, res) => {
  try {
    const { profileImage, coverImage, bio, location } = req.body;
    
    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        profileImage,
        coverImage,
        bio,
        location
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        profileImage: true,
        coverImage: true,
        bio: true,
        location: true
      }
    });
    
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Server error updating profile' });
  }
});

// Get public seller profile
router.get('/:id/profile', async (req, res) => {
  try {
    const seller = await prisma.user.findUnique({
      where: { id: req.params.id, role: 'SELLER' },
      select: {
        id: true,
        name: true,
        profileImage: true,
        coverImage: true,
        bio: true,
        location: true,
        createdAt: true
      }
    });
    
    if (!seller) {
      return res.status(404).json({ error: 'Seller not found' });
    }
    
    res.json(seller);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching seller profile' });
  }
});

// Get all sellers
router.get('/sellers', async (req, res) => {
  try {
    const sellers = await prisma.user.findMany({
      where: { role: 'SELLER' },
      select: {
        id: true,
        name: true,
        profileImage: true,
        coverImage: true,
        bio: true,
        location: true,
        _count: {
          select: { products: true }
        }
      }
    });
    res.json(sellers);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching sellers' });
  }
});

module.exports = router;
