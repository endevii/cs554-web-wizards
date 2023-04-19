const mapRoutes = require('./map');

const constructorMethod = (app) => {
  app.use('/map', mapRoutes);

  app.use('*', (req, res) => {
    res.json({error: 'Route no valid'});
  });
};

module.exports = constructorMethod;
