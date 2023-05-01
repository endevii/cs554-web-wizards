const routesAPI = require('./routesAPI');
const mapRoutes = require('./map');

const constructorMethod = (app) => {
    app.use('/', routesAPI);
    app.use('/map', mapRoutes);

  app.use('*', (req, res) => {
    res.json({error: 'Route not valid'});
  });
};

module.exports = constructorMethod;