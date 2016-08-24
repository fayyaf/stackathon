app.factory('CardFactory', function($http) {
    var cardObj = {};

    cardObj.updateUser = function(id, updatedInfo) {
        return $http.put('/api/users/' + id, updatedInfo)
        .then(function(res) {
            console.log('data', res);
            return res.data;
        });
    }

    cardObj.getCard = function(id) {
    return $http.get('/api/card/' + id)
      .then(function(res) {
        console.log('res*******', res);
        return res.data;
      })
    }

    return cardObj;
});

app.controller('CardCtrl', function ($scope, $state, CardFactory, AuthService, $stateParams, $log) {
    var id = $stateParams.id;
    AuthService.getLoggedInUser(true)
    .then(function(loggedInUser) {
        console.log('logged in');
        $scope.user = loggedInUser;
        return loggedInUser.data;
    });

    CardFactory.getCard(id)
    .then(card => {
        console.log('card', card);
        $scope.card = card;
        console.log($scope.card);
    })
    // if(!$scope.product.imageUrl) {
    //   $scope.product.imageUrl = 'http://www.beniceorleavethanks.com/wp-content/uploads/2015/05/Mason-Jar-Sipper.jpg';
    // }
    .catch($log.error);

    // CardFactory.getCard()
    // .then(function(res) {
    //     console.log('card',res)
    //     return res.data;
    // });
});

app.config(function ($stateProvider) {
    $stateProvider.state('card', {
        url: '/card',
        templateUrl: 'js/card/card.html',
        controller: 'CardCtrl'
    });

});
