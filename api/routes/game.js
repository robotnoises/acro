var base = '/v1/game';

var routes = {
  create: base + '/create'
};

function _gameRouter(router) {
  
  router.post(routes.create, function (req, res) {
    res.json({
      'hello': 'world'
    });
  })
  
}

module.exports = _gameRouter;