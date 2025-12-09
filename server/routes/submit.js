const express = require('express');
const router = express.Router();

router.post('/', (req,res) => {
  const data = req.body;
  console.log('Received submission:', data);
  res.json({ status:'success', data });
});

module.exports = router;
