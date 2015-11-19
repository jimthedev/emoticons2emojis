#!/usr/bin/env node --harmony

var Hipchatter = require('hipchatter');
var _ = require('lodash');

/**
 * Hipchat config.
 * 
 * EDIT THE NEXT LINE
 * IT MUST HAVE VIEW GROUP API PERMISSIONS 
 */
var hipchatToken = '<<HIPCHAT v2 API TOKEN HERE>>';

var hipchatter = new Hipchatter(hipchatToken);
var yaml = require('write-yaml');

// Load the emoticons from hipchat
hipchatter.emoticons({ 'start-index': 0, 'max-results': 1000 }, function(err, emoticons){
    if(err) { console.error(err); } 
    else {
      console.log(emoticons);
      
      // Grab only the parts we need and format them in a way that we can quickly
      // output to a yaml file for consumption
      
      var pack = {
        title: 'emoticons',
        emojis: []
      };
      
      _.map(emoticons, function(emoticon) {
        pack.emojis.push({
          name: emoticon.shortcut,
          src: emoticon.url
        });
      });
      
      console.log(JSON.stringify(pack, null, 2));
      
      yaml('emoticons.yml', pack, function(err) {
         if (err) console.log(err);

            // Blatently copied from the emojipacks bin
            var program = require('commander');
            var Prompt = require('../node_modules/emojipacks/lib/prompt');
            var Slack = require('../node_modules/emojipacks/lib/slack');
            var Pack = require('../node_modules/emojipacks/lib/pack');
            var co = require('co');
            
            /**
            * Usage.
            */
            
            program
              .version(require('../package').version)
              .option('-d, --debug', 'Run in debug mode')
              .parse(process.argv);
            
            
            /**
            * Start process.
            */
            
            co(function *() {
              var user = yield Prompt.start();
              var pack = yield Pack.get(user.pack);
              user.emojis = pack.emojis;
              var slack = new Slack(user, program.debug);
              yield slack.import();
              process.exit();
            });

//       });
//     }
// });