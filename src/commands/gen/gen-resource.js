const { logger } = require('../../utils/logger');
const { exec } = require('../../utils/exec');

const fs = require('fs-extra');
const path = require('path');

async function genResource(name) {
  name = name.toLowerCase();

  const resourcePath = path.resolve(__dirname, '..', '..', '..', 'resource');
  logger.success('Generating resource', name.grey + '...');

  const className = name[0].toUpperCase() + name.slice(1);
  await exec(`mkdir src/${name}`);

  let moduleFileText = (
    await fs.readFile(path.resolve(resourcePath, 'module.ts'))
  ).toString();

  let controllerFileText = (
    await fs.readFile(path.resolve(resourcePath, 'controller.ts'))
  ).toString();

  let serviceFileText = (
    await fs.readFile(path.resolve(resourcePath, 'service.ts'))
  ).toString();

  moduleFileText = moduleFileText.replace('./controller', `./${name}.controller`);
  moduleFileText = moduleFileText.replace('./service', `./${name}.service`);
  moduleFileText = moduleFileText.replace(/AppController/g, `${className}Controller`);
  moduleFileText = moduleFileText.replace(/AppService/g, `${className}Service`);
  moduleFileText = moduleFileText.replace(/AppModule/g, `${className}Module`);

  controllerFileText = controllerFileText.replace(/AppService/g, `${className}Service`);
  controllerFileText = controllerFileText.replace(/AppController/g, `${className}Controller`);
  controllerFileText = controllerFileText.replace(/appService/g, `${name}Service`);
  controllerFileText = controllerFileText.replace('./service', `./${name}.service`);

  serviceFileText = serviceFileText.replace('AppService', `${className}Service`);
  await fs.writeFile(path.resolve(process.cwd(), 'src', name, `${name}.module.ts`), moduleFileText);

  await fs.writeFile(
    path.resolve(process.cwd(), 'src', name, `${name}.service.ts`),
    serviceFileText,
  );

  await fs.writeFile(
    path.resolve(process.cwd(), 'src', name, `${name}.controller.ts`),
    controllerFileText,
  );

  logger.success('Resource', name.grey, 'generated!');
}

module.exports = { genResource };
