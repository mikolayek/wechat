var request = require('request');
var getXMLNodeValue = require("../tool/xmlparse.js");
var replyMessage = require("../tool/replyMessage.js");
var formattedValue = require("../tool/formatValue.js");

const url = "http://www.tuling123.com/openapi/api?key=de4ae9269c7438c33de5806562a35cac&info=";

module.exports = function(req, res){

  var _da;
    req.on("data",function(data){
        _da = data.toString("utf-8");
    });

    req.on("end",function(){
        console.log("original text: " + _da);
        var Content = getXMLNodeValue('Content',_da);
        console.log("content: " + Content);
        var voice = getXMLNodeValue("Recognition", _da);
        console.log("Value from Recognition: " + voice);
        if( !!voice ){
           requesturl = url + encodeURI(voice);
        }
        else {
          var formatted = formattedValue(Content);
          console.log("use Tuning API with key: " + formatted);
              requesturl = url + encodeURI(formatted);
        } 
        var options = {
            url: requesturl,
            method: "GET"
        };
        console.log("request sent to Tuning API: " + requesturl);
        request(options,function(error,response,data){
           if(data){
            console.log("response from tuning: " + data);
              var text = JSON.parse(data).text;
              var xml = replyMessage(_da, text);
              res.send(xml);
           }else {
              res.send("Error when calling Tuning API: " + error);
              console.log(error);
           }
        });
    });
};