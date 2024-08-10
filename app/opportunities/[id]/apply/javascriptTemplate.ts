// javascriptTemplate.ts
import { Project } from '@stackblitz/sdk';

export const javascriptProject: Project = {
  title: 'Dynamically Created Project',
  description: 'Created with StackBlitz API',
  template: 'javascript',
  files: {
    'index.js': `console.log('Hello from StackBlitz');`,
    'index.html': `<div id="app"></div>`,
  },
  settings: {
    compile: {
      trigger: 'auto',
      clearConsole: false,
    },
  },
};