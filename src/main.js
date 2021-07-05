import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// ( Admin Start import เองแล้ว ) import "bootstrap/dist/css/bootstrap.css" // bootstrap 5 css
import "bootstrap/dist/js/bootstrap.bundle.js" // bootstrap 5 js ( bootstrap + Popper.js)

// Admin Template
import "startbootstrap-sb-admin/dist/css/styles.css" // รวม Bootstrap 5 มาแล้ว
import "startbootstrap-sb-admin/dist/js/scripts.js"

//pagination css
import "@hennge/vue3-pagination/dist/vue3-pagination.css"

createApp(App).use(store).use(router).mount("#app");
