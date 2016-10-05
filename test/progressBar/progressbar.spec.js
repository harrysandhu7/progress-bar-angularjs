describe('Progress Bar', function () {
  var rootScope, scope, bars, buttons, $compile, $controller, $document, ctrl;
  beforeEach(module('progressbar'));
  beforeEach(module('app/templates/progressbar.html'));

  beforeEach(inject(function ($injector, _$compile_, _$rootScope_, _$document_, _$controller_, $templateCache) {
    $compile = _$compile_;
    $document = _$document_;
    $controller = _$controller_;
    rootScope = _$rootScope_;
    scope = rootScope.$new();
    var $httpBackend = $injector.get('$httpBackend');
    var authRequestHandler = $httpBackend.when('GET', 'http://pb-api.herokuapp.com/bars')
    .respond({buttons:[46,27,-11,-37],bars:[83,85,81],limit:200});

    ctrl = $controller('progressbarController', {$scope:scope});
    scope.selectedBar = 0;
    $httpBackend.flush();

    $templateCache.put('templates/progressbar.html', "<div>\n" +
      " <div class=\"row\">\n" +
      "   <div class=\"row margin-0\">{{label}}</div>\n" +
      "        <div class=\"progress height-35 line-height-35\">\n" +
      "            <div class=\"progress-bar line-height-35 {{barClass}}\" role=\"progressbar\" aria-valuenow=\"{{progress}}\" aria-valuemin=\"0\" style=\"width:{{progress}}%\">\n" +
      "                <span class=\"sr-only\">{{progress}}% Complete</span>\n" +
      "                <span class=\"progress-text\">{{progress}}%</span>\n" +
      "            </div>\n" +
      "        </div>\n" +
      "    </div>\n" +
      "</div>");
  }));

  describe('Progress Bar', function () {

    it('should set progress bar data in scope', function() {
      expect(JSON.stringify(scope.progressBarData)).toBe('{"buttons":[46,27,-11,-37],"bars":[83,85,81],"limit":200}');
    });

    it('should create three progress bars', function() {

      element = angular.element('<progress-bar ng-repeat="bar in progressBarData.bars" bar-label="Progress Bar {{$index+1}}" bar-value="{{bar}}" bar-limit="{{progressBarData.limit}}"></progress-bar>');
      angular.element(document.body).append(element);
      bars = $compile(element)(scope);
      scope.$digest();

      var pBars = $document.find('.progress-bar');
      expect(pBars.length).toBe(3);
    });

    it('should create four buttons', function() {

      element = angular.element('<button ng-repeat="button in progressBarData.buttons track by $index" class="btn btn-info margin-right-10 margin-top-20" ng-click="updateProgressBar(button)">{{button}}</button>');
      angular.element(document.body).append(element);
      buttonGroups = $compile(element)(scope);
      scope.$digest();

      buttons = $document.find('button');
      expect(buttons.length).toBe(4);
    });

    it('should update progress bar data and should not go less than zero', function() {
      scope.updateProgressBar(-37);
      expect(JSON.stringify(scope.progressBarData)).toBe('{"buttons":[46,27,-11,-37],"bars":[46,85,81],"limit":200}');
      scope.updateProgressBar(-37);
      scope.updateProgressBar(-37);
      expect(JSON.stringify(scope.progressBarData)).toBe('{"buttons":[46,27,-11,-37],"bars":[0,85,81],"limit":200}');
    });

    it('should update progress bar data and can go over bar-limit', function() {
      scope.updateProgressBar(46);
      expect(JSON.stringify(scope.progressBarData)).toBe('{"buttons":[46,27,-11,-37],"bars":[129,85,81],"limit":200}');
      scope.updateProgressBar(46);
      scope.updateProgressBar(46);
      scope.updateProgressBar(46);
      scope.updateProgressBar(46);
      expect(JSON.stringify(scope.progressBarData)).toBe('{"buttons":[46,27,-11,-37],"bars":[313,85,81],"limit":200}');
    });

  });

});