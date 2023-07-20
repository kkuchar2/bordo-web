const path = require('path');

module.exports = {
    reactStrictMode: false,
    swcMinify: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'src/components')],
    }
};
