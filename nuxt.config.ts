import path from "path";

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "nuxt-headlessui",
    "nuxt-icon",
    "@vueuse/nuxt",
    "@vee-validate/nuxt",
    "nuxt-primevue",
  ],
  veeValidate: {
    autoImports: true,
    // Use different names for components
    componentNames: {
      Form: "VeeForm",
      Field: "VeeField",
      FieldArray: "VeeFieldArray",
      ErrorMessage: "VeeErrorMessage",
    },
  },
  headlessui: {
    prefix: "Headless",
  },
  primevue: {
    options: { unstyled: true },
    importPT: { as: "Lara", from: path.resolve(__dirname, "./presets/lara/") },
    components: {
      prefix: "Prime",
      include: ["DataTable", "Toast", "Column", "Paginator", "ProgressBar"],
    },
  },
  vite: {
    optimizeDeps: {
      include: ["quill-blot-formatter"],
    },
  },
  colorMode: {
    preference: "system", // default value of $colorMode.preference
    fallback: "light", // fallback value if not system preference found
    hid: "nuxt-color-mode-script",
    globalName: "__NUXT_COLOR_MODE__",
    componentName: "ColorScheme",
    classPrefix: "",
    classSuffix: "",
    storageKey: "nuxt-color-mode",
  },
});
