module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'views': '@/views',
                'network': '@/network',
                'service': '@/service',
            }
        }
    },

    css: {
        loaderOptions: {
            stylus: {
                'resolve url': true,
                'import': [
                    './src/theme'
                ]
            },
        }
    },

    pluginOptions: {
        'cube-ui': {
            postCompile: true,
            theme: true
        }
    },
}