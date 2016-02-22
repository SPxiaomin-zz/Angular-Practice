(function(angular) {
  angular.module('app', []) .controller('ctrl', ['$scope', function($scope) {
  }])
  .directive('myCols', [function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {},
      templateUrl: 'template/my-cols.html',
      controller: function($scope) {
        $scope.dragEl = null;

        var cols = $scope.cols = [];

        this.removeOver = function() {
          angular.forEach(cols, function(col) {
            col.removeClass('over');
            col.css({
              opacity: '1'
            });
          });
        };

        this.addCol = function(col) {
          cols.push(col);
        };
      }
    };
  }])
  .directive('myCol', [function() {
    return {
      restrict: 'E',
      replace: true,
      require: '^myCols',
      scope: {},
      templateUrl: 'template/my-col.html',
      link: function(scope, elm, attr, myColsCtrl) {
        myColsCtrl.addCol(elm);
        scope.content = attr.content;

        elm.on('dragstart', function(event) {
          event.target.style.opacity = '0.5';

          myColsCtrl.dragEl = this;

          event.dataTransfer.effectAllowed = 'move';
          event.dataTransfer.setData('Text', this.innerHTML)
        });

        elm.on('dragend', function(event) {
          myColsCtrl.removeOver();
        });

        elm.on('dragenter', function(event) {
          event.preventDefault();

          event.target.classList.add('over');

          event.dataTransfer.dropEffect = 'move';
        });

        elm.on('dragover', function(event) {
          event.preventDefault();
        });

        elm.on('dragleave', function(event) {
          event.target.classList.remove('over');
        });

        elm.on('drop', function(event) {
          event.preventDefault();

          if ( myColsCtrl.dragEl !== this ) {
            myColsCtrl.dragEl.innerHTML = this.innerHTML;
            this.innerHTML = event.dataTransfer.getData('Text');
          }
        });
      }
    };
  }]);
})(angular);
