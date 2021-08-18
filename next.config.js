module.exports = {
  reactStrictMode: true,

  // Webpack module bundler used by Next.js doesn’t know how to bundle schema.graphql file; to fix this we can use package webpack-graphql-loader
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.graphql?$/,
      loader: 'webpack-graphql-loader'
    })

    return config
  }
}
