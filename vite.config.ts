import path from 'path'
import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html'
import ElementPlus from 'unplugin-element-plus/vite'
import { defineConfig, loadEnv, ConfigEnv } from 'vite';

import Components from 'unplugin-vue-components/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import Unocss from 'unocss/vite'
import {
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'


// https://vitejs.dev/config/
export default defineConfig((config: ConfigEnv) => {
  const env = loadEnv(config.mode, process.cwd())
  return {
    server: {
      port: Number(env.VITE_APP_PORT),
    },
    resolve: {
      alias: {
        '~/': path.resolve(__dirname, 'src') + '/',
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/styles/index.scss" as *;`,
        },
      },
    },
    plugins: [
      vue(),
      ElementPlus(),
      createHtmlPlugin({
        minify: true,
        entry: 'src/main.ts',
        inject: {
          data: {
            title: env.VITE_APP_NAME,
          },
        },
      }),
      createSvgIconsPlugin({
        // 指定要缓存的文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
        // 指定symbolId格式
        symbolId: '[name]'
      }),
      Components({
        // allow auto load markdown components under `./src/components/`
        extensions: ['vue', 'md'],
        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass',
          }),
        ],
        dts: 'src/components.d.ts',
      }),
      // Components({
      //   resolvers: [ElementPlusResolver()],
      // }),

      Unocss({
        presets: [
          presetUno(),
          presetAttributify(),
          presetIcons({
            scale: 1.2,
            warn: true,
          }),
        ],
        transformers: [
          transformerDirectives(),
          transformerVariantGroup(),
        ]
      }),
    ],
  }
})
