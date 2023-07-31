const path = require('path');

module.exports = {
    reactStrictMode: false,
    swcMinify: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'src/components')],
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'media.giphy.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'media3.giphy.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'storage.cloud.google.com',
                port: '',
            }
        ]
    }
};
