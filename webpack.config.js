const path = require('path');

module.exports = {
    entry: {
        app: './src/app/index.js',
    },
    output: {
        path: path.join(__dirname, '/src/public'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                }
            }
        ]
    }
}

// module.exports = {
//     entry: {
//       app: './src/app/index.js',
//     },
//     output: {
//       filename: 'bundle.js',
//       path: __dirname + '/src/public'
//     }
//   };