'use strict';


var React = require('react');
var ReactDom = require('react-dom');


// Thanks to https://javascriptweblog.wordpress.com/2010/11/29/json-and-jsonp/
var jsonp = {
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

var Main = React.createClass({

  getInitialState: function() {
    
    return {
    
      state: 'idle',
      images: <li>No images yet.</li>
    
    };
  
  },

  callAPI: function( url ){

    var self = this;

    jsonp.fetch(url, function(response) {

      self.setState({

        state: 'idle',
        images: response.items.map(function(image){

          return (<li><img src="{image.link}" alt="{image.author}" />{image.description}</li>)

        })

      });

    });

  },

  getInspired: function( e ) {
    
    e.preventDefault();
    
    var interest = ReactDom.findDOMNode(this.refs.interest).value,
        url = 'http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=JSONPCallback&tags=' + interest; // nojsoncallback=1&
    
    this.callAPI( url );
  
  },

  render: function(){

    return (

      <section>
        <form onSubmit={ this.getInspired }>
          <div>
            <input type="text" placeholder="what interest you" ref="interest" /> &nbsp;
            <input type="submit" value="Get inspired" /> &nbsp;
            <span>{this.state.data}</span>
          </div>  
        </form>
        <ul>{this.state.images}</ul>
      </section>

    )

  }

});

ReactDom.render(<Main />, document.getElementById('app'));


