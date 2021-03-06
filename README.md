# react-on-flickr
Sample project to get into ReactJS and Webpack.

## Description
It is a simple app that allows you to see latest 20 uploads to Flickr. 
See the [DEMO](http://devgaze.github.io/demo/reactjs-on-flickr/)


## How to use it in your project

1. Clone the app into your project folder `git clone https://github.com/Devgaze/react-on-flickr.git`.

2. Then install all the packages and run development server

    ```bash
    npm install && webpack-dev-server
    ```

3. Visit `http://localhost:8080/webpack-dev-server/` and then click on `public`

### For production

1. Generate production version of `bundle.js`

    ```bash
    webpack -p
    ```

2. Transfer your complete `public` folder to your web server location

Et voilà!

## Project structure
```
.
├── app
│   ├── components
│   │   └── Main.js
│   └── utils.js
├── public
│   ├── css
│   │   └── styles.css
│   ├── images
│   │   └── spinner.gif
│   ├── js
│   │   └── bundle.js
│   └── index.html
├── LICENSE
├── README.md
├── package.json
└── webpack.config.js

```

## TODO

- found spinner bug
- refactor
- test it, test it, test it
