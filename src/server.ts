import express from 'express';

const app = express();

app.get('/test', (request, response) => {
  return response.status(202).json({ mensagem: 'Ola Nlw' });
});

app.post('/test', (request, response) => {
  return response.status(202).json({ mensagem: 'Ola Nlw Post' });
});

app.listen(3000, () => {
  console.log('Server is running');
});
