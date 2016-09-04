import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './search.html';
import { Documents } from '../../../api/documents';

import SearchResultsService from './services/searchResultsService';

class Search {
  constructor($scope, $reactive, $state) {
    'ngInject';

    $reactive(this).attach($scope);

    this.searchText = '';
  }

  doSearch() {
    console.log('doSearch()');
    var query = this.searchText.toString();
    
    Meteor.call('searchIndex', query, function(error, result) {
      if (!error) {
        var searchResult = result;
        console.log(searchResult);
      }
      else {
        console.log(error);
      }
    });
  }
}

const name = 'search';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter
])
.component(name, {
  template,
  controllerAs: name,
  controller: Search
})
.config(config)
.service(SearchResultsService);

function config($stateProvider) {
  'ngInject';

  $stateProvider
    .state('search', {
      url: '/search',
      template: '<search></search>',
      resolve: {
      currentUser($q) {
        if (Meteor.userId() === null) {
          return $q.reject('AUTH_REQUIRED');
        }
        else {
          return $q.resolve();
        }
      }
    }
  });
};