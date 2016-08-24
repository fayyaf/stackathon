app.factory('AccountFactory', function($http) {
    var AcctFactoryObj = {};

    AcctFactoryObj.updateUser = function(id, updatedInfo) {
        return $http.put('/api/users/' + id, updatedInfo)
        .then(function(res) {
            console.log('data', res);
            return res.data;
        });
    }
    return AcctFactoryObj;
});

app.controller('AccountCtrl', function ($scope, $state, AccountFactory, AuthService) {

    AuthService.getLoggedInUser(true)
    .then(function(loggedInUser) {
        console.log('logged in');
        $scope.user = loggedInUser;
        return loggedInUser.data;
    });

    $scope.sendUpdate = function() {
        console.log('here')
        AccountFactory.updateUser($scope.user.id, $scope.update)
        .then(function() {
            return $state.reload();
        });
    }
});

app.config(function ($stateProvider) {
    $stateProvider.state('account', {
        url: '/account',
        templateUrl: 'js/account/account.html',
        controller: 'AccountCtrl'
    });

});