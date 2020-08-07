const express = require('express');
const nunjucks = require('nunjucks');
const server = express();

const { pageLanding, pageStudy, pageGiveClasses, pageSaveClasses } = require('./pages');

// configuração do nunjucks (template engine)
nunjucks.configure('src/views', {
  express: server,
  noCache: true
});

// Configuração do servidor
server
  // Receber os dados no req.body
  .use(express.urlencoded({ extended: true }))
  // Configruar arquivos estáticos (css, scripts, imagens)
  .use(express.static('public'))
  // Rotas da aplicação
  .get('/', pageLanding)
  .get('/study', pageStudy)
  .get('/give-classes', pageGiveClasses)
  .post('/save-classes', pageSaveClasses)
  // Start do servidor
  .listen(5500);
