const { env:{ PLANTFORM,ENV } } = process;
const endFixPlantform = PLANTFORM.trim().toLowerCase();
const endFixEnv = ENV.trim().toLowerCase();

const plantformConfigGen = require(`./webpack.config.base.${endFixPlantform}`);
const envConfigGen = require(`./webpack.config.env.${endFixEnv}`);
const basicConfigPlantform = plantformConfigGen(PLANTFORM);
const basicConfig = envConfigGen(basicConfigPlantform);
module.exports = basicConfig;
