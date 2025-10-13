import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/thevikalp-designable/',
  resolve: {
    alias: {
      '@thevikalp/designable-core': path.resolve(__dirname, '../../packages/core/src'),
      '@thevikalp/designable-react': path.resolve(__dirname, '../../packages/react/src'),
      '@thevikalp/designable-react-settings-form': path.resolve(__dirname, '../../packages/react-settings-form/src'),
      '@thevikalp/designable-shared': path.resolve(__dirname, '../../packages/shared/src'),
      '@thevikalp/designable-formily-antd': path.resolve(__dirname, '../../formily/antd/src'),
      '@thevikalp/designable-formily-transformer': path.resolve(__dirname, '../../formily/transformer/src'),
    },
  },
})
