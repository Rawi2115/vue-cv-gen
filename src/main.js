import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Card from "primevue/card";
import Toast from "primevue/toast";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { BiLinkedin } from "oh-vue-icons/icons";

const app = createApp(App); // Store the app instance

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});
addIcons(BiLinkedin);
// Register components
app.component("Button", Button);
app.component("InputText", InputText);
app.component("Card", Card);
app.component("Toast", Toast);
app.component("v-icon", OhVueIcon);
// Mount the app
app.mount("#app");
