const webpack = require('webpack');
const ExtractTextPlugin=require('extract-text-webpack-plugin');
const path=require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        demo:__dirname+"/demo/entry.jsx",
        code:__dirname+"/demo/code.jsx",
    },
    resolve:{
        alias:{
            $root:__dirname,
        },
    },
    // stats:'verbose',
    devtool: "source-map",

    output:{
        path:__dirname+'/demo/dev-dist/' ,
        filename:"js/[name].js",
    },
    externals:{
        jquery:'$'
    },
    module: {
        rules: [


            {
                test:/\.(ttf|woff|svg|gif|jpg|png)\??.*$/,
                loader:'url-loader?limit=50000&name=../[hash:8][path][name].[ext]'
            },
            // {
            //     test: /\.css$/,
            //
            //     use: ExtractTextPlugin.extract({
            //         fallback: "style-loader",
            //         use: "css-loader?importLoader=1&modules&localIdentName=[local]",
            //         // use:"css-loader",
            //     })
            //
            // },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader,
                    {
                        loader:'css-loader',
                        options:{
                            localIdentName:'[local]',
                            modules:true,
                        }

                    }
            ]
            },
            {
                test:/\.ts$/,
                use:[
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', ],
                            plugins:["transform-typescript","babel-plugin-syntax-object-rest-spread"]
                        }

                    }
                ]
            },
            {
                test:/\.(vtsx)$/,
                use:[
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', ],
                            plugins:["transform-typescript",'babel-plugin-transform-vue-jsx',"babel-plugin-syntax-object-rest-spread"]
                        }

                    }
                ]

            },
            {
                test:/\.tsx$/,

                use:[
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env',
                            '@babel/preset-react'],
                            plugins:["babel-plugin-syntax-object-rest-spread","@babel/plugin-transform-typescript","@babel/plugin-proposal-class-properties",['react-css-modules']
                            ]
                        }

                    },

                ],

            },
            {
                test:/\.(jsx|js)$/,

                use:[
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                            plugins:["babel-plugin-syntax-object-rest-spread",
                                "@babel/plugin-proposal-class-properties",['react-css-modules']
                            ]
                        }

                    }
                ]

            },
        ]
    },

    plugins:[

        // new webpack.DllReferencePlugin({
        //     context: __dirname,
        //     manifest:require('./static/js/staticMod_manifest.json')
        // }),
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        new MiniCssExtractPlugin({filename:"css/[name].css"}),

        // new CompressionPlugin({
        //     test: /\.js$/,
        //     cache:true,
        // })
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: "jquery",
        //
        // })
    ]
}
