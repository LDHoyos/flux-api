const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/generate', (req, res) => {
  const prompt = req.body.prompt;

  if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

  exec(`python3 generate.py "${prompt}"`, (error, stdout, stderr) => {
    if (error) {
      console.error('Error:', stderr);
      return res.status(500).json({ error: 'Image generation failed' });
    }

    const base64 = fs.readFileSync('output.png', { encoding: 'base64' });
    res.json({ image: base64 });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
