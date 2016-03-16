(function(angular, window) {
    'use strict';

    angular.module('guthub.services', ['ngRoute', 'ngResource'])
        .factory('Recipe', ['$resource', function($resource) {
            return $resource('/recipes/:id', {
                id: '@id'
            });
        }])
        .factory('MultiRecipeLoader', ['Recipe', '$q', function(Recipe, $q) {
            return function() {
                var delay = $q.defer();
                Recipe.query(function(recipes) {
                    delay.resolve(recipes);
                }, function() {
                    delay.reject('Unable to fetch recipes');
                });
                return delay.promise;
            };
        }])
        .factory('RecipeLoader', ['Recipe', '$route', '$q', function(Recipe, $route, $q) {
            return function() {
                var delay = $q.defer();
                Recipe.get({
                    id: $route.current.params.recipeId
                }, function(recipe) {
                    delay.resolve(recipe);
                }, function() {
                    delay.reject('Unable to fetch recipe ' + $route.current.params.recipeId);
                });
                return delay.promise;
            };
        }]);
})(angular, window);
