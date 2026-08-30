import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  // GitHub project Pages is served from /<repository-name>/.
  base: '/cloud-materials-common/',
  resolve: {
    alias: {
      '@cloud-materials/common/ve-o-iconbox': fileURLToPath(
        new URL('../@cloud-materials/common/ve-o-iconbox', import.meta.url),
      ),
    },
  },
  esbuild: {
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
  },
});
