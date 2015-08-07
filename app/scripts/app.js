'use strict';

/**
 * @ngdoc overview
 * @name app
 * @description
 * # stationarySalmonBestSalmonApp
 *
 * Main module of the application.
 */
var app  = angular
  .module('stationarySalmonBestSalmonApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '../views/eventFeed.html',
      controller: 'eventFeedCtrl'
    })
    .state('myGroups', {
      url: '/group',
      templateUrl: '../views/myGroups.html',
      controller: 'myGroupsCtrl'
    })
    .state('group', {
      url: '/group/:id',
      templateUrl: '../views/group.html',
      controller: 'groupCtrl'
    })
    .state('event', {
      url: '/event/:id',
      templateUrl: '../views/event.html',
      controller: 'EventController'
    })
    .state('user', {
      url: '/user/:id',
      templateUrl: '../views/user.html',
      controller: 'userCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: '../views/login.html'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: '../views/signup.html'
    });
});
