'use strict';

var React = require('react');
var ReactDom = require('react-dom');
var utils = require('../utils');



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
            <div className="col-xs-12">
              <h3>{this.state.title}</h3>
            </div>
          </div>
          <div className="row border-top">
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
    var description = utils.escapeHtml(image.description);
    description = utils.unescapeHtml(description);
    
    return (
      
      <div className="col-xs-12 col-sm-5 col-sm-offset-2 col-md-3 col-md-offset-0 col-lg-2 flex-item">
        <div>
          <img src={image.media.m} alt={image.author} title={image.author} className="img-responsive" />
        </div>
      </div>

    );
    

  }

});



var SearchForm = React.createClass({

  spinnerSelector: 'ajax-loader',

  callAPI: function( url ){

    var self            = this,
        updateResults   = this.props.updateResults;

    utils.toggleSpinner(this.spinnerSelector);

    utils.jsonp.fetch(url, function(response) {

      updateResults(response);

      utils.toggleSpinner(self.spinnerSelector);

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
            <form id="searchForm" onSubmit={ this.handleChange }>
              <div id={ this.spinnerSelector }></div>
              <div className="form-group">
                <input type="text" placeholder="search what inspires you (ex. sailing, caribbean)" ref="interest" className="form-control" /> &nbsp;
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


