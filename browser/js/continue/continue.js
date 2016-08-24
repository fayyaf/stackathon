app.config(function($stateProvider) {

  $stateProvider.state('continue', {
    url: '/continue',
    templateUrl: 'js/continue/continue.html',
    controller: 'ContinueCtrl'
  });
});

app.controller('ContinueCtrl', function($scope, CFactory, $state, AuthService) {
  var user = null;
  AuthService.getLoggedInUser(true)
  .then(function(loggedInUser) {
    if (loggedInUser === null) {
      $scope.loggedIn = false;
    }
    else {
      $scope.loggedIn = true;
      user = loggedInUser;
      return loggedInUser.data;
    }
  });

  $scope.createCard = function() {
    console.log('here');
    CFactory.create($scope.newCard)
    .then(function(card) {
      console.log('card', card);
      $state.go('card');
    })
    .catch(function(err) {
      $scope.hasSubmitted = false;
    })
  }
});


app.factory('CFactory', function($http, $state) {
  var cardObj = {};

  cardObj.getUser = function(id){
    return $http.get('/api/users/' + id)
    .then(res => {
      return res.data;
    })
  }

  cardObj.create = function (data) {
    console.log(data);
    return $http.post('/api/cards', data)
    .then(function(res) {
      return res.data;
    });
  };

  cardObj.isLoggedIn = function() {
    return cardObj.currentUser.loggedIn;
  };

  return cardObj;
});