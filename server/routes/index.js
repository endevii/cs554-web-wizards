const routesAPI = require('./routesAPI');

const constructorMethod = (app) => {
    app.use('/', routesAPI)

  app.use('*', (req, res) => {
    res.json({error: 'Route no valid'});
  });
};

module.exports = constructorMethod;