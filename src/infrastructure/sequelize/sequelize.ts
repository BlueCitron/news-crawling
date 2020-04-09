import {Sequelize} from "sequelize-typescript";
const path = require('path');
const fs = require('fs');

const environment = process.env.NODE_ENV || 'development';

const configFilePath = path.resolve(__dirname, 'config', `config.${environment}.json`);
const configStr = fs.readFileSync(configFilePath, { encoding: 'utf8' });
const config = JSON.parse(configStr);

const sequelize =  new Sequelize({
    ...config,
    storage: ':memory:',
    logging: environment !== 'production',
    models: [ __dirname + '/**/*.model.ts' ]
});

export default sequelize;