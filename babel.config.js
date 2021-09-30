module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@repositories': './src/repositories',
          '@controllers': './src/controllers',
          '@middleware': './src/middleware',
          '@interfaces': './src/interfaces',
          '@database': './src/database',
          '@services': './src/services',
          '@models': './src/models',
          '@config': './src/config',
          '@routes': './src/routes',
          '@errors': './src/errors',
          '@dtos': './src/dtos',
        },
      },
    ],
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
};
