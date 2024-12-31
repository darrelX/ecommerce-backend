const express = require('express');
const app = express();
const prisma = require('./middleware/middleware.js')
const { router } = require('./routes/router');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;


async function main() {
  app.use(express.json());
  app.use(bodyParser.json())
  app.use('/api', router);
  app.listen(port, () => console.log(`Ecommerce backend is loading on port ${port}`));

}

main().then(async () => {
  await prisma.$connect();
  // const a = await prisma.user.findMany();
  // console.log(a);
  
}).catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  // process.exit(1);

});


// Routes de l'application


// Démarrage du serveur


