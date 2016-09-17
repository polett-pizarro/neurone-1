import { Meteor } from 'meteor/meteor';

import Utils from '../../../lib/utils';

export default class SnippetTrackService {
  constructor() {}

  saveSnippet() {
    var snippet = window.getSelection().toString();

    if (!Utils.isEmpty(snippet)) {
      var current_url = window.location.href;
      var current_title = document.title;

      var snippetObject = {
        title: current_title,
        url: current_url,
        snipped_text: snippet,
        local_time: Utils.getTimestamp()
      };

      if (Meteor.user() && snippetObject != null) {
        snippetObject.owner = Meteor.userId();
        snippetObject.username = Meteor.user().emails[0].address;

        Meteor.call('storeSnippet', snippetObject, function(err, result) {});
        
        Utils.logToConsole('Snippet Saved!');
        alert('Your snippet has been saved!');
      }
      else {
        Utils.logToConsole('Error while saving snippet');
      }
    }
  }
}