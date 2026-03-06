const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
    type: String,
    enum: [
      'Starters', 'Soups & Salads', 'Mains', 'Pasta & Risotto',
      'Grills & Steaks', 'Vegetarian', 'Desserts', 'Cocktails', 'Wine', 'Non-Alcoholic'
    ],
    required: true
  },
  tags: [{ type: String }],
  isChefsPick: { type: Boolean, default: false },
  isAvailable: { type: Boolean, default: true },
  imageUrl: { type: String, default: '' },
  allergens: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
