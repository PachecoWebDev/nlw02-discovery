const Database = require('./db');
const createProffy = require('./createProffy');

Database.then(async (db) => {
  // Inserir dados
  proffyValue = {
    name: 'Diego Fernandes',
    avatar: 'https://avatars2.githubusercontent.com/u/2254731?s=460&u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&v=4',
    whatsapp: '12345678912',
    bio: 'Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.',
  };

  classValue = {
    subject: 1,
    cost: '20,00',
  };

  classScheduleValues = [
    {
      weekday: 0,
      time_from: 720,
      time_to: 1220
    },
    {
      weekday: 1,
      time_from: 480,
      time_to: 1220
    },
  ];

  //await createProffy(db, {proffyValue, classValue, classScheduleValues});

  // Consultar os dados inseridos

  // Todos os proffys
  const selectedAllPRoffys = await db.all("SELECT * FROM proffys");

  // Consutlar as classes de um determinado proffrssor
  // e trazer junto os dados do professor
  const selectedClassesAndProffys = await db.all(`
    SELECT classes.*, proffys.*
    FROM proffys
    JOIN classes ON (classes.proffy_id = proffys.id)
    WHERE classes.proffy_id = 1;
  `);

  // Filtrar por horário
  const selectedClassesSchedules = await db.all(`
    SELECT class_schedule.*
    FROM class_schedule
    WHERE class_schedule.class_id = "5"
    AND class_schedule.weekday = "0"
    AND class_schedule.time_from <= "720"
    AND class_schedule.time_to > "720"
  `);

  // console.log(selectedClassesSchedules);
});
