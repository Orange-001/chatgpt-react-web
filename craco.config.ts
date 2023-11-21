import UnoCSS from '@unocss/webpack';
import {} from '@craco/craco';
import path from 'path';

export default {
  plugins: [],
  webpack: {
    plugins: {
      add: [UnoCSS()]
    },
    configure: (webpackConfig: any, { env, paths }: any) => {
      const ModuleScopePlugin = webpackConfig.resolve.plugins.find(
        (plugin: any) => plugin.constructor.name === 'ModuleScopePlugin'
      );
      ModuleScopePlugin.allowedPaths.push(path.join(__dirname, '_virtual_%2F__uno.css'));
      webpackConfig.optimization.realContentHash = true;
      // delete webpackConfig.cache
      webpackConfig.cache = false;
      console.log(webpackConfig);
      return webpackConfig;
    }
  }
};
