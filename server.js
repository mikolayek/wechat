var express = require('express');
var routesEngine = require('./jerryapp/routes/index.js'); // index.js actually
    // X, X.js, X.json and X.node see blog http://www.ruanyifeng.com/blog/2015/05/require.html
    
var app = express();

app.use('/ui5', express.static(process.cwd() + '/webapp'));
routesEngine(app);

var redis = require("redis"),
    client = redis.createClient();

client.set("some key", "i042416");
client.get("some key", function(err, reply) {
    // reply is null when the key is missing
    console.log("Jerry Redis practice: ******************** " + reply);
});

app.listen(process.env.PORT || 3000, function () {
      // c:\\code\\git\\wechat\\app
  console.log('Listening on port, process.cwd(): ' + process.cwd() );
});

   