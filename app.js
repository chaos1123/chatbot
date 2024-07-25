const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.post('/chat', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await openai.createCompletion({
      model: process.env.DEFAULT_MODEL || 'gpt-3.5-turbo',
      prompt: prompt,
      max_tokens: 150,
    });

    res.json({
      message: response.data.choices[0].text,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.get('/', (req, res) => {
  res.send('Hello, this is a simple Chatbot UI.');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
