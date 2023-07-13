import merge from 'lodash.merge';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const stage = process.env.STAGE || "local";
let envConfig

console.log('stage', stage);

if(stage === "production"){
    envConfig = require('./prod').default;
    console.log('envConfig', envConfig);
} else if (stage === "staging"){
    envConfig = require('./staging').default;
} else{
    envConfig = require('./local').default;
}

const defaultConfig = {
    stage,
    dbUrl: process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET,
    port: process.env.PORT,
    logging:false
};


export default merge(defaultConfig, envConfig);