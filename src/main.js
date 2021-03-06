import { createApp } from "vue";
import vuetify from "@/plugins/vuetify";
import { loadFonts } from "@/plugins/webfontloader";
import App from "@/App.vue";
import router from "@/router";

loadFonts();

createApp(App).use(vuetify).use(router).mount("#app");
