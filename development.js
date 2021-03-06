import path from 'path'

const src = path.resolve(__dirname, 'views')
const dist = path.resolve(__dirname, 'public/js')

export default {
  mode: 'development',
  entry: src + '/index.jsx',

  output: {
    path: dist,
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  plugins: []
}
