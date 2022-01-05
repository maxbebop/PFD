const path = require('path');

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },

    output:{
        path: path.resolve(__dirname, './public/js'),
        filename: 'app.js',
    },

    devServer:{
        contentBase: path.join(__dirname, 'public'),
    },

    mode: 'development',
}