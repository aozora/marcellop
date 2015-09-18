var path = require('path');
var fs = require('fs');

var readConfig = function(){

   var env = process.env.NODE_ENV || 'development';
   var config;
   var data = fs.readFileSync(path.resolve(__dirname, '../../', 'config.json'));

   try {
      config = JSON.parse(data);
      //console.dir(config);
      if (env === 'development')
         console.dir('app config loaded for env:' + env);

      return config[env] || {};
   }
   catch (err) {
      console.log('There has been an error parsing your config.json.');
      console.log(err);
   }

};


module.exports = readConfig;