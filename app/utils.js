
module.exports = {

  escapeHtml: function (str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  },

  unescapeHtml: function (escapedStr) {
    var div = document.createElement('div');
    div.innerHTML = escapedStr;
    var child = div.childNodes[0];
    return child ? child.nodeValue : '';
  },

  toggleSpinner: function(elSelector){

    var indicator = document.getElementById(elSelector),
        classList = [],
        i         = 0;

    if( indicator.className.indexOf('active') === -1 ) {

      indicator.className += 'active';

    } else {

      classList = indicator.className.split('');

      for (i; i < classList.length; i++){

        if (classList[i] === 'active'){

          classList[i].pop();
          break;

        }

      }

      indicator.className = classList;
      
    }

  },

  // Thank you https://javascriptweblog.wordpress.com/2010/11/29/json-and-jsonp/
  jsonp : {
    callbackCounter: 0,
 
    fetch: function(url, callback) {
      var fn = 'JSONPCallback_' + this.callbackCounter++;
      window[fn] = this.evalJSONP(callback);
      url = url.replace('=JSONPCallback', '=' + fn);

      var scriptTag = document.createElement('SCRIPT');
      scriptTag.src = url;
      document.getElementsByTagName('HEAD')[0].appendChild(scriptTag);
    },
 
    evalJSONP: function(callback) {
      return function(data) {
        var validJSON = false;
        
        if (typeof data == "string") {
          try {validJSON = JSON.parse(data);} catch (e) {
              /*invalid JSON*/}
        } else {
          validJSON = JSON.parse(JSON.stringify(data));
          window.console && console.warn(
          'response data was not a JSON string');
        }
        if (validJSON) {
          callback(validJSON);
        } else {
          throw("JSONP call returned invalid or empty JSON");
        }
      }
    }
  }


  //  Thank you http://shebang.brandonmintern.com/foolproof-html-escaping-in-javascript/
}