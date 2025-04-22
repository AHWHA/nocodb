import type { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "base" | "dashboard" | "default" | "empty" | "general" | "new" | "shared-view" | "top"
declare module "../../../../node_modules/.pnpm/nuxt@3.15.4_@parcel+watcher@2.4.1_@types+node@22.13.1_db0@0.2.1_mysql2@3.12.0__encoding_db5a3062506739fad16e081139d49bf1/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}