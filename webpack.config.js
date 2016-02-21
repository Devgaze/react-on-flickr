module.exports = {

  entry:  './app/components/Main.js',
  output: {

    filename: 'public/js/bundle.js'

  },
  module: {

    loaders: [
      {

        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {

          presets: ['react', 'es2015']

        }

      }
    ]
  }

};