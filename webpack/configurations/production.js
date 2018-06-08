// Presets
import { source, build } from '../paths';
import { generateCommonConfiguration } from './common';

// Instruments
import merge from 'webpack-merge';
import {
    loadPostCSS,
    generateSourceMaps,
    createBuildAnalyzer
} from '../modules';

// Plugins
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

export const generateProductionConfiguration = () =>
    merge(
        generateCommonConfiguration(),

        /**
         * Проверка необходима, потому что при NODE_ENV = development
         * этот плагин не отпускает вебпак около 120 секунд
         */
        process.env.NODE_ENV !== 'development' && createBuildAnalyzer(),
        {
            mode:   'production',
            output: {
                filename:   'js/[name].[chunkhash:5].js',
                publicPath: process.env.REPOSITORY_NAME
                    ? `/${process.env.REPOSITORY_NAME}`
                    : '',
            },
            module: {
                rules: [
                    {
                        test:    /\.css$/,
                        include: [source, /node_modules/],
                        use:     [
                            MiniCssExtractPlugin.loader,
                            {
                                loader:  'css-loader',
                                options: {
                                    sourceMap: true,
                                },
                            },
                            loadPostCSS()
                        ],
                    }
                ],
            },
            plugins: [
                new MiniCssExtractPlugin({
                    filename:      'css/[contenthash].[hash:5].css',
                    chunkFilename: 'css/[contenthash].[hash:5].css',
                }),
                new CleanWebpackPlugin(build, {
                    allowExternal: true,
                })
            ],
        },
        generateSourceMaps({ devtool: 'source-map' })
    );
