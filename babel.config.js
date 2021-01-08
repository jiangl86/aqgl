module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset'
    ],
    // "presets": [
    //     ["es2015", { "modules": false }]
    // ],
    "presets": [
        ["@babel/preset-env", { "modules": false }]
    ],
    "plugins": [
        [
            "component",
            {
                "libraryName": "element-ui",
                "styleLibraryName": "theme-chalk"
            }
        ]
    ],
    plugins: [
        ['import', {
            libraryName: 'vant',
            libraryDirectory: 'es',
            style: true
        }, 'vant']
    ],
}