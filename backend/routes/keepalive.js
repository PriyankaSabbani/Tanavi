const express = require('express');
const router = express.Router();

router.get('/ping', (req, res) => {
  res.json({ status: 'alive', timestamp: new Date().toISOString() });
});

module.exports = router;
