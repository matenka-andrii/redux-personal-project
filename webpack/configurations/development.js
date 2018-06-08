// Presets
import { source } from '../paths';
import { generateCommonConfiguration } from './common';

// Instruments
import merge from 'webpack-merge';
import { loadPostCSS, generateSourceMaps } from '../modules';

// Plugins
import { HotModuleReplacementPlugin } from 'webpack';

export const generateDevelopmentConfiguration = () =>
    merge(
        generateCommonConfiguration(),
        {
            mode:   'development',
            output: {
                filename: 'js/[name].[hash:5].js',
            },
            devServer: {
                hot:                true,
                historyApiFallback: true,
                host:               '0.0.0.0',
                overlay:            true,
                port:               3000,
                stats:              'errors-only',
                useLocalIp:         true,
                headers:            {
                    'Access-Control-Allow-Origin': '*',
                },
            },
            module: {
                rules: [
                    {
                        test:    /\.css$/,
                        include: [source, /node_modules/],
                        use:     [
                            {
                                loader:  'style-loader',
                                options: {
                                    sourceMap: true,
                                },
                            },
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
            plugins: [new HotModuleReplacementPlugin()],
        },
        generateSourceMaps({ devtool: 'cheap-module-eval-source-map' })
    );
