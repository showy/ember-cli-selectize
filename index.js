/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-selectize',
  included: function(app) {
    this._super.included.apply(this, arguments);
    var app;

    // If the addon has the _findHost() method (in ember-cli >= 2.7.0), we'll just
    // use that.
    if (typeof this._findHost === 'function') {
      app = this._findHost();
    } else {
      // Otherwise, we'll use this implementation borrowed from the _findHost()
      // method in ember-cli.
      var current = this;
      do {
        app = current.app || app;
      } while (current.parent.parent && (current = current.parent));
    }

    //default theme name is 'default'
    var options = { theme: 'default' };
    
    if (app.options && app.options['ember-cli-selectize']) {
      options = app.options['ember-cli-selectize'];
    }

    if (process.env.EMBER_CLI_FASTBOOT !== 'true') {
      //import theme based on options
      if (options.theme) {
        app.import(app.bowerDirectory + '/selectize/dist/css/selectize.' + options.theme + '.css');
      }

      //import javascript
      app.import(app.bowerDirectory + '/selectize/dist/js/standalone/selectize.js');
    }
  }
};
