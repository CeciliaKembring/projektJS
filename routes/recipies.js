const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipieModel');

// GET ALL
router.get('/recipies', async (req, res) => {
  try {
    const recipies = await Recipe.find();
    res.json(recipies);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET ONE
router.get('/recipies/:id', getRecipie, (req, res) => {
  res.json(res.recipie);
});

// POST
router.post('/recipies', async (req, res) => {
  const { name, category, recipie, comment } = req.body;

  try {
    const newRecipe = new Recipe({ name, category, recipie, comment });
    await newRecipe.save();
    res.status(201).json({ message: 'Maträtt tillagd!' });
  } catch (error) {
    console.error('Error adding recipe:', error);
    res.status(500).json({ message: 'Serverfel' });
  }
});

// PUT
router.put('/recipies/:id', getRecipie, async (req, res) => {
  const { name, category, recipie, comment } = req.body;

  try {
    res.recipie.name = name;
    res.recipie.category = category;
    res.recipie.recipie = recipie;
    res.recipie.comment = comment;

    await res.recipie.save();

    res.json({ message: 'Maträtt uppdaterad!' });
  } catch (error) {
    console.error('Error updating recipe:', error);
    res.status(500).json({ message: 'Serverfel' });
  }
});

// DELETE
router.delete('/recipies/:id', getRecipie, async (req, res) => {
  try {
    await res.recipie.deleteOne();
    res.json({ message: 'Maträtt raderad' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET ID
async function getRecipie(req, res, next) {
  let recipie; 
  try {
    recipie = await Recipe.findById(req.params.id);
    if (recipie === null) { 
      return res.status(404).json({ message: 'Maträtt ej hittad' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.recipie = recipie;
  next();
}

module.exports = router;