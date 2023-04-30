const routesAPI = require('./routesAPI');
const mapRoutes = require('./map');

const constructorMethod = (app) => {
    app.use('/map', mapRoutes);
    app.use('/', routesAPI);

  app.use('*', (req, res) => {
    res.json({error: 'Route not valid'});
  });
};

module.exports = constructorMethod;