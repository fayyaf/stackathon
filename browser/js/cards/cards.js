app.controller('CardsController', function($scope, CardsFactory, $log, $q, $timeout) {
  $scope.currCategory = null;
  var allCards = null;

  var self = this;
  self.simulateQuery = false;
  self.isDisabled    = false;
  // list of `state` value/display objects
  self.states        = loadAll();
  self.querySearch   = querySearch;
  self.selectedItemChange = selectedItemChange;
  self.searchTextChange   = searchTextChange;
  self.newCard = newCard;
  function newCard(card) {
    alert("Sorry! You'll need to invite " + card + " first!");
  }
  // ******************************
  // Internal methods
  // ******************************
  /**
   * Search for states... use $timeout to simulate
   * remote dataservice call.
   */
  function querySearch (query) {
    var results = query ? self.states.filter( createFilterFor(query) ) : self.states,
        deferred;
    if (self.simulateQuery) {
      deferred = $q.defer();
      $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
      return deferred.promise;
    } else {
      return results;
    }
  }
  function searchTextChange(text) {
    $log.info('Text changed to ' + text);
  }
  function selectedItemChange(item) {
    $log.info('Item changed to ' + JSON.stringify(item));
  }
  /**
   * Build `states` list of key/value pairs
   */
  function loadAll() {
    var allCards = 'Grace Hopper, Lydia Scott';
    return allCards.split(/, +/g).map( function (card) {
      return {
        value: card.toLowerCase(),
        display: card
      };
    });
  }
  /**
   * Create filter function for a query string
   */
  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);
    return function filterFn(card) {
      return (card.value.indexOf(lowercaseQuery) === 0);
    };
  }
});

app.factory('CardsFactory', function($http) {
  var cardsObj = {};

  cardsObj.getAllCards = function() {
    return $http.get('/api/users')
      .then(function(res) {
        return res.data;
      });
  }

  cardsObj.getByUser = function (id) {
    return $http.get('/api/' + id)
    .then(function(res) {
      return res.data;
    });
  }

  return cardsObj;
});


app.config(function ($stateProvider) {
    $stateProvider.state('cards', {
        url: '/cards',
        templateUrl: 'js/cards/cards.html',
        controller: 'CardsController'
    });

});
