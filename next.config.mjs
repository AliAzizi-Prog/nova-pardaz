/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    loader: 'akamai',
    path: ''
  },

  assetPrefix: './',

  webpack(config, { isServer }) {
    // Use @svgr/webpack to handle SVG files
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        and: [/\.(js|ts|md)x?$/]
      },
      use: [
        '@svgr/webpack',
        {
          loader: 'file-loader',
          options: {
            esModule: false,
            publicPath: '/_next',
            name: 'static/media/[name].[hash].[ext]'
          }
        }
      ]
    })

    return config
  }
}

export default nextConfig
