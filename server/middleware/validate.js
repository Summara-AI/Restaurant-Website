const { body, param, query, validationResult } = require('express-validator');

function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg, errors: errors.array() });
  }
  next();
}

const loginRules = [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password required')
];

const reservationRules = [
  body('name').trim().notEmpty().withMessage('Name required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('phone').trim().notEmpty().withMessage('Phone required'),
  body('date').notEmpty().withMessage('Date required'),
  body('time').notEmpty().withMessage('Time required'),
  body('partySize').isInt({ min: 1, max: 20 }).withMessage('Party size 1-20'),
  body('seatingPreference').isIn(['Indoor', 'Outdoor Patio', 'Private Dining Room', 'Bar Area']).withMessage('Invalid seating'),
  body('specialOccasion').optional().isIn(['None', 'Birthday', 'Anniversary', 'Business Dinner', 'Proposal', 'Other']),
  body('specialRequests').optional().trim()
];

const eventRules = [
  body('name').trim().notEmpty().withMessage('Name required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('phone').trim().notEmpty().withMessage('Phone required'),
  body('eventType').trim().notEmpty().withMessage('Event type required'),
  body('date').notEmpty().withMessage('Date required'),
  body('guestCount').isInt({ min: 1 }).withMessage('Guest count required'),
  body('message').optional().trim()
];

const contactRules = [
  body('name').trim().notEmpty().withMessage('Name required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('subject').trim().notEmpty().withMessage('Subject required'),
  body('message').trim().notEmpty().withMessage('Message required')
];

const menuItemRules = [
  body('name').trim().notEmpty().withMessage('Name required'),
  body('description').trim().notEmpty().withMessage('Description required'),
  body('price').isFloat({ min: 0 }).withMessage('Valid price required'),
  body('category').notEmpty().withMessage('Category required'),
  body('tags').optional().isArray(),
  body('isChefsPick').optional().isBoolean(),
  body('isAvailable').optional().isBoolean(),
  body('imageUrl').optional().trim(),
  body('allergens').optional().isArray()
];

const blogPostRules = [
  body('title').trim().notEmpty().withMessage('Title required'),
  body('slug').trim().notEmpty().withMessage('Slug required'),
  body('content').trim().notEmpty().withMessage('Content required'),
  body('excerpt').trim().notEmpty().withMessage('Excerpt required'),
  body('category').trim().notEmpty().withMessage('Category required'),
  body('featuredImage').optional().trim(),
  body('author').optional().trim(),
  body('readTime').optional().isInt({ min: 1 }),
  body('published').optional().isBoolean()
];

module.exports = {
  handleValidation,
  loginRules,
  reservationRules,
  eventRules,
  contactRules,
  menuItemRules,
  blogPostRules
};
