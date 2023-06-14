const path = require('path');
const fs = require('fs');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BeautifyHtmlWebpackPlugin = require('beautify-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const PugPlugin = require('pug-plugin');

const LAYOUT_PATH = 'layout';

const PATHS = {
    src: path.join(__dirname, `../${LAYOUT_PATH}/src`),
    dist: path.join(__dirname, `../${LAYOUT_PATH}/dist`),
    assets: 'assets',
};

const PAGES_DIR = `${PATHS.src}/pages/`;
const PAGES = fs
    .readdirSync(PAGES_DIR)
    .filter(fileName => fileName.endsWith('.pug'));

const MODALS_DIR = `${PATHS.src}/modals/`;
const MODALS = fs
    .readdirSync(MODALS_DIR)
    .filter(fileName => fileName.endsWith('.pug'));

const beautifyOptions = new BeautifyHtmlWebpackPlugin({
    'indent_size': 4,
    'indent_char': ' ',
    'indent_with_tabs': false,
    'editorconfig': false,
    'eol': '\n',
    'end_with_newline': false,
    'indent_level': 0,
    'preserve_newlines': true,
    'max_preserve_newlines': 2,
    'space_in_paren': false,
    'space_in_empty_paren': false,
    'jslint_happy': false,
    'space_after_anon_function': false,
    'space_after_named_function': false,
    'brace_style': 'collapse',
    'unindent_chained_methods': false,
    'break_chained_methods': false,
    'keep_array_indentation': false,
    'unescape_strings': false,
    'wrap_line_length': 0,
    'e4x': false,
    'comma_first': false,
    'operator_position': 'before-newline',
    'indent_empty_lines': false,
    'templating': ['auto'],
});

const pugToHtml = PAGES.map(page => {
    const pageName = page.substring(0, page.length - 4);
    let chunks = ['runtime', 'vendors', 'common'];

    switch (pageName) {
        // case 'main':
        //     chunks.push('main');
        //     break;
        default:
            chunks.push('index');
    }

    return (
        new HtmlWebpackPlugin({
            template: `${PAGES_DIR}/${page}`,
            filename: pageName + '.html',
            chunks,
            title: `${page.replace(/\.pug/, '')}`,
            minify: {
                removeAttributeQuotes: false,
            },
        })
    );
});

module.exports = {
    externals: {
        paths: PATHS,
    },
    entry: {
        ['index']: `${PATHS.src}/js/pages/index`,
        // ['main']: `${PATHS.src}/js/pages/main`,
    },
    output: {
        filename: `${PATHS.assets}/js/[name].js`,
        path: PATHS.dist,
        publicPath: '/',
        clean: true,
        assetModuleFilename: 'assets/img/[name][ext]',
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendors: {
                    name: 'vendors',
                    test: /node_modules/,
                    chunks: 'async',
                    enforce: true,
                },
                common: {
                    name: 'common',
                    test: /common.js/,
                    chunks: 'async',
                    enforce: true,
                },
            },
        },
    },
    module: {
        rules: [
            {
                // JavaScript
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/',
            },
            {
                // Pug
                test: /\.pug$/,
                loader: PugPlugin.loader,
            },
            // {
            //     // Vue
            //     test: /\.vue$/,
            //     loader: 'vue-loader',
            //     options: {
            //         loader: {
            //             sass: 'vue-style-loader!css-loader!sass-loader'
            //         }
            //     }
            // },
            {
                // Sass
                test: /\.sass$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { esModule: false },
                    },
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true, url: false },
                    },
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true },
                    },
                ],
            },
            {
                // css
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { esModule: false },
                    },
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true },
                    },
                    'postcss-loader',
                ],
            },
            {
                test: /\.svg$/i,
                use: [
                    {
                        loader: 'svg-sprite-loader',
                        options: {
                            extract: true,
                            spriteFilename: `${PATHS.assets}/img/sprite.svg`,
                        },
                    },
                    'svg-transform-loader',
                    'svgo-loader',
                ],
            },
        ],
    },
    resolve: {
        alias: {
            '~': PATHS.src,
            utils: `${PATHS.src}/js/helpers/utils`,
            // vue$: 'vue/dist/vue.js'
        },
    },
    plugins: [
        // Provide utils
        new webpack.ProvidePlugin({
            $: 'utils',
            axios: ['axios', 'default'],
        }),
        new SpriteLoaderPlugin({
            plainSprite: true,
        }),
        // Vue
        // new VueLoaderPlugin(),
        // CSS
        new ESLintPlugin(),
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}/css/[name].css`,
        }),
        // Copy files
        new CopyWebpackPlugin({
            patterns: [
                { from: `${PATHS.src}/${PATHS.assets}/img`, to: `${PATHS.assets}/img` },
                { from: `${PATHS.src}/${PATHS.assets}/fonts`, to: `${PATHS.assets}/fonts` },
                // { from: `${PATHS.src}/${PATHS.assets}/json`, to: `${PATHS.assets}/json` },
                { from: `${PATHS.src}/static`, to: '' },
            ],
        }),
        // PUG pages
        ...pugToHtml,

        // PUG modals
        ...MODALS.map(
            modal =>
                new HtmlWebpackPlugin({
                    inject: false,
                    template: `${MODALS_DIR}/${modal}`,
                    filename: `./modals/${modal.replace(/\.pug/, '.html')}`,
                    minify: {
                        removeAttributeQuotes: false,
                    },
                }),
        ),
        beautifyOptions,
    ],
};
