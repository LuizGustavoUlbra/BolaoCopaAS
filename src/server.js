const express = require('express');
const loginRoutes = require('./routes/loginRoutes');
const jogosRoutes = require('./routes/jogosRoutes');
const palpitesRoutes = require('./routes/palpitesRoutes');

const app = express();

// Middleware para permitir que a API receba requisições no formato JSON
app.use(express.json());

// Rotas da API
app.use('/api', loginRoutes);
app.use('/api', jogosRoutes);
app.use('/api', palpitesRoutes);

// Rota de teste simples para verificar se a API está no ar
app.get('/', (req, res) => {
  return res.json({ mensagem: 'API do Bolão da Copa 2026 rodando com sucesso!' });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta 🚀 ${PORT}`);
});
