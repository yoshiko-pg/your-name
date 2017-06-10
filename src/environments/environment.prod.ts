const generatedEnv = require('../../.prod.env.json');

export const environment = {
  ...generatedEnv,
  production: true,
};
