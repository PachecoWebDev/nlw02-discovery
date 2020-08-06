const express = require('express');
const nunjucks = require('nunjucks');
const server = express();

const proffys = [
  {
    name: 'Diego Fernandes',
    avatar: 'https://avatars2.githubusercontent.com/u/2254731?s=460&u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&v=4',
    whatsapp: '12345678912',
    bio: 'Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.',
    subject: 'Química',
    cost: '20,00',
    weekday: [0],
    time_from: [720],
    time_to: [1220]
  }
];

const subjects = [
  'Artes',
  'Biologia',
  'Ciências',
  'Educação Física',
  'Física',
  'Geografia',
  'História',
  'Matemática',
  'Português',
  'Química'
];

const weekdays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado'
];

function getSubject(subjectNumber) {
  const position = +subjectNumber - 1;

  return subjects[position];
}

function pageLanding(request, response) {
  return response.render('index.html');
};

function pageStudy(request, response) {
  const filters = request.query;
  return response.render('study.html', { proffys, filters, subjects, weekdays });
};

function pageGiveClasses(request, response) {
  const data = request.query;

  const isNotEmpty = Object.keys(data).length > 0;

  if (isNotEmpty) {
    data.subject = getSubject(data.subject);

    proffys.push(data);

    return response.redirect('/study');
  }

  return response.render('give-classes.html', { subjects, weekdays });
};

nunjucks.configure('src/views', {
  express: server,
  noCache: true
});

server
  .use(express.static('public'))
  .get('/', pageLanding)
  .get('/study', pageStudy)
  .get('/give-classes', pageGiveClasses)
  .listen(5500);
