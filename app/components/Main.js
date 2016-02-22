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

//  Thank you http://shebang.brandonmintern.com/foolproof-html-escaping-in-javascript/
// Use the browser's built-in functionality to quickly and safely escape the
// string
function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
};

// UNSAFE with unsafe strings; only use on previously-escaped ones!
function unescapeHtml(escapedStr) {
    var div = document.createElement('div');
    div.innerHTML = escapedStr;
    var child = div.childNodes[0];
    return child ? child.nodeValue : '';
};


var PhotoFeed = React.createClass({

  
  getInitialState: function() {
  
    return {
  
      photos: [],
      title: ''
  
    };
  
  },
  
  digestSearchResults: function(data) {
    
    this.setState({
  
      photos: data.items,
      title: data.title
  
    });
  
  },
  

  render: function(){

    var items = this.state.photos.map(function(item, i) {

      return <Photo image={item} key={i} />;
    
    });

    return (

      <div className="row">
        <div className="col-xs-12">
          <div className="row">
            <div className="col-xs-12">
              <SearchForm updateResults={this.digestSearchResults} />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 flex-list">
              {items}
            </div>
          </div>
        </div>
      </div>

    )
    
  }

});


var Photo = React.createClass({

  render: function(){
    
    var image = this.props.image;
    var index = this.props.index;
    var description = escapeHtml(image.description);
    description = unescapeHtml(description);
    
    return (
      
      <div className="col-xs-12 col-sm-5 col-sm-offset-2 col-md-3 col-md-offset-0 col-lg-2 flex-item">
        <img src={image.media.m} alt={image.author} title={image.author} className="img-responsive" />
        {unescapeHtml}
      </div>

    );
    

  }

});



var SearchForm = React.createClass({

  getInitialState: function() {

    return {value: 'Hello!'};

  },

  callAPI: function( url ){

    var self = this,
        updateResults = this.props.updateResults;

    jsonp.fetch(url, function(response) {

      updateResults(response);

    });

  },

  handleChange: function( e ) {
    
    e.preventDefault();
    
    var interest = ReactDom.findDOMNode(this.refs.interest).value,
        url = 'http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=JSONPCallback&tags=' + interest; // nojsoncallback=1&
    
    this.callAPI( url );
  
  },

  render: function() {

    return (
      <section id="searchFormContainer">
        <div className="row">
          <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
            <form onSubmit={ this.handleChange }>
              <div className="form-group">
                <input type="text" value={this.state.searchTerm} placeholder="what interest you" ref="interest" className="form-control" /> &nbsp;
                <input type="submit" value="Get inspired" className="form-control btn btn-info" /> &nbsp;
              </div>  
            </form>
          </div>
        </div>
      </section>

    )
  
  }

});


var Main = React.createClass({

  render: function(){

    return (

      <PhotoFeed />

    )

  }

});

ReactDom.render(<Main />, document.getElementById('app'));


