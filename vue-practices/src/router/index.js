


import { createRouter, createWebHistory } from "vue-router";

import GeneratorPage from "../pages/GeneratorPage.vue";
import CustomPage from "../pages/CustomPage.vue";
import ExportPage from "../pages/ExportPage.vue";

const routes = [
  { path: "/", name: "generator", component: GeneratorPage },
  { path: "/custom", name: "custom", component: CustomPage },
  { path: "/export", name: "export", component: ExportPage }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;




