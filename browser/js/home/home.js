app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'QuotesController'
    });
});

app.factory('QuotesFactory', function($http) {
  var quotesObj = {};

  quotesObj.getAllQuotes = function() {
    return $http.get('/api/quotes')
    .then(function(res) {
    	// console.log(res);
    	return res.data;
    });
  }

  quotesObj.getByTag = function (tag) {
    return $http.get('/api/quotes/filter/' + tag)
    .then(function(res) {
      return res.data;
    });
  }

  quotesObj.getAllTags = function(){
    return this.getAllQuotes()
    .then(quotes => {
      var tags = [];
      quotes.forEach(quote => {
        tags = tags.concat(quote.tags);
      });
      tags = new Set(tags);
      return tags;
    });
  }
  
  return quotesObj;
});

app.controller('QuotesController', function($scope, QuotesFactory, $log, $timeout) {
	$scope.allTags = [];
	$scope.currCategory = null;
	var allQuotes = null;
	$scope.str = '';

	var self = this;
    self.simulateQuery = false;
    self.isDisabled = false;
    // list of `quote` value/display objects
    self.quotes = loadAll();
    self.querySearch = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange = searchTextChange;
    self.newQuote = newQuote;

    function newQuote(tag) {
      alert("Sorry! You'll need to create a new Quote for: " + tag + " first!");
    }

    function querySearch (query) {
    	var results = query ? self.quotes.filter(createFilterFor(query)) : self.quotes, deferred;
    	if (self.simulateQuery) {
    		deferred = $q.defer();
    		$timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
    		return deferred.promise;
    	}
    	else {
    		return results;
    	}
    }
    
    function searchTextChange(text) {
    	$log.info('Text changed to ' + text);
    }
    
    function selectedItemChange(item) {
    	$log.info('Item changed to ' + JSON.stringify(item));
    }

    function loadAll() {
    	QuotesFactory.getAllTags()
		.then(tags => {
			tags = Array.from(tags);
			$scope.allTags = tags;
			$scope.allTags.sort();
			for (var i = 0; i < $scope.allTags.length; i++) {
				$scope.str = $scope.allTags.toString();
			}
			console.log('alltags',$scope.str);
		});
		var all = 'Alabama, Alaska';
		return all.split(/, +/g).map( function (tag) {
      	return {
      		value: tag.toLowerCase(),
      		display: tag
      	};
      });
  	}

  	$scope.submit = function() {
    	$scope.currCategory = true;
    	var filterProduct = allProducts.filter(function(product) {
      	var lcProduct = product.name.toLowerCase();
      	var scopeProduct = $scope.search.toLowerCase();
      	return lcProduct.includes(scopeProduct);
    	});
    	$scope.products = filterProduct;
  	};

	function createFilterFor(query) {
		var lowercaseQuery = angular.lowercase(query);
		return function filterFn(quote) {
			return (quote.value.indexOf(lowercaseQuery) === 0);
		};
	}

	function resetCategory() {
		$scope.currCategory = null;
		QuotesFactory.getAllQuotes()
		.then(quotes =>{
			$scope.quotes = quotes;
			allQuotes = quotes;
		})
		.catch($log.error);
	}

	QuotesFactory.getAllQuotes()
	.then(quotes => {
		$scope.allQuotes = quotes;
		// console.log(allQuotes);
	});
});
