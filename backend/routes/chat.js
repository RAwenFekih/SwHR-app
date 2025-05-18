const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.post('/', async (req, res) => {
  try {
    const response = await fetch('http://127.0.0.1:11434/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'mistral',
        messages: [{ role: 'user', content: req.body.message }],
        stream: false  // important: disable streaming to simplify response!
      })
    });

    const data = await response.json();

    // Mistral returns the last message like this:
    const assistantMessage = data?.message?.content;

    if (assistantMessage) {
      res.json({ response: assistantMessage });
    } else {
      res.status(500).json({ error: 'No response from model.' });
    }

  } catch (error) {
    console.error('Error with Ollama:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
