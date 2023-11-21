import {
  transformerDirectives,
  transformerVariantGroup,
  transformerCompileClass,
  defineConfig,
  presetIcons,
  presetUno
} from 'unocss';

export default defineConfig({
  content: {
    pipeline: {
      exclude: [/\.(css|postcss|sass|scss|less|stylus|styl)($|\?)/, 'node_modules/*']
    }
  },
  transformers: [transformerDirectives(), transformerVariantGroup(), transformerCompileClass()],
  presets: [
    presetUno(),
    presetIcons({
      collections: {
        ic: () => import('@iconify-json/ic').then((i) => i.icons)
      },
      extraProperties: {
        display: 'inline-block',
        cursor: 'pointer',
        'font-size': '16px',
        'vertical-align': 'middle'
      }
    })
  ],
  shortcuts: {
    'overflow-auto-when-hover': 'overflow-hidden hover:overflow-auto'
  }
});
