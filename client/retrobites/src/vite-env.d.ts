/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// declare module '*.vue' {
//   import type {defineComponent} from 'vue'
//   const component: ReturnType<typeof defineComponent>;
//   export default component
// }
