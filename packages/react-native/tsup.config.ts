import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  splitting: false,
  minify: false,
  external: [
    'react',
    'react-native',
    'react-native-svg',
    '@ArcTimer/core',
  ],
  target: 'es2020',
  esbuildOptions(options) {
    options.jsx = 'automatic'
  },
})
