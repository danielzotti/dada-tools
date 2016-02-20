var DateController = (function () {
    function DateController(moment) {
        var _this = this;
        this.moment = moment;
        this.daysBetweenDates = function () {
            _this.result = _this.moment(_this.from).format();
        };
        console.log("DateController");
        console.log(this);
    }
    return DateController;
})();
var TestController = (function () {
    function TestController() {
        console.log("TestController");
        this.list = [
            { name: "Mario", surname: "Rossi", age: 57 },
            { name: "Luigi", surname: "Bianchi", age: 60 },
            { name: "Duilio", surname: "Verdi", age: 88 }
        ];
        console.log(this.list);
    }
    return TestController;
})();
var TestItemController = (function () {
    function TestItemController() {
        var _this = this;
        this.testMethod = function () {
            return "I'm " + _this.item.name + " " + _this.item.surname + " and i have " + _this.item.age + " years";
        };
        console.log("TestItemController");
    }
    return TestItemController;
})();
var TestDirective = (function () {
    function TestDirective() {
    }
    TestDirective.getInstance = function () {
        return {
            restrict: "AE",
            replace: true,
            scope: true,
            bindToController: {
                item: "=testItem"
            },
            controller: "TestItemController",
            controllerAs: "testItem",
            templateUrl: "app/templates/test/test-item.html",
            link: function ($scope, $elem, $attrs, cd) {
                console.log("Test Directive");
            }
        };
    };
    return TestDirective;
})();
var TestService = (function () {
    function TestService() {
    }
    return TestService;
})();
/// <reference path="../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../scripts/typings/angularjs/angular-route.d.ts" />
/// <reference path="../scripts/typings/jquery/jquery.d.ts" />
//CONTROLLERS
/// <reference path="controllers/DateController.ts" />
/// <reference path="controllers/TestController.ts" />
/// <reference path="controllers/TestItemController.ts" />
//DIRECTIVES
/// <reference path="directives/TestDirective.ts" />
//MODELS
/// <reference path="models/ITest.ts" />
//SERVICES
/// <reference path="services/TestService.ts" />
(function () {
    // Main module
    var app = angular.module("test", ["ngRoute"]);
    // APIs
    //app.service("TestService", TestService);
    app.constant("moment", moment);
    // Controllers
    app.controller("DateController", DateController);
    app.controller("TestController", TestController);
    app.controller("TestItemController", TestItemController);
    // Directives
    app.directive("test", TestDirective.getInstance);
    // Routing configuration
    app.config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/", { templateUrl: "app/views/home.html", controller: "TestController", controllerAs: "test" })
            .when("/date", { templateUrl: "app/views/date.html", controller: "DateController", controllerAs: "date" })
            .otherwise({ templateUrl: "app/views/home.html", controller: "TestController", controllerAs: "test" });
        $locationProvider.html5Mode(false);
    });
})();
