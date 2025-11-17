const express = require('express');
const router = express.Router();
const Character = require('../models/Character');

// Get all characters
router.get('/', async (req, res) => {
  try {
    const characters = await Character.find();
    res.json(characters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get one character
router.get('/:id', async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    if (character) {
      res.json(character);
    } else {
      res.status(404).json({ message: 'Character not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create character
router.post('/', async (req, res) => {
  try {
    console.log('Received data:', req.body);
    const character = new Character(req.body);
    const newCharacter = await character.save();
    res.status(201).json(newCharacter);
  } catch (error) {
    console.error('Error creating character:', error);
    res.status(400).json({ message: error.message });
  }
});

// Update character
router.put('/:id', async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    if (character) {
      Object.assign(character, req.body);
      const updatedCharacter = await character.save();
      res.json(updatedCharacter);
    } else {
      res.status(404).json({ message: 'Character not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete character
router.delete('/:id', async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    if (character) {
      await character.deleteOne();
      res.json({ message: 'Character deleted' });
    } else {
      res.status(404).json({ message: 'Character not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 