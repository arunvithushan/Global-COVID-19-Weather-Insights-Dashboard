const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
  const country = req.query.country || 'Unknown';
  // Example dummy data
  res.json({ country, covidCases: Math.floor(Math.random()*100000), weather: { temp: 25, condition: 'Sunny' } });
});

module.exports = router;
