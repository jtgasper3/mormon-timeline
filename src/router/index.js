import { createRouter, createWebHistory } from "vue-router";

const HistoricTimeline = () => import("@/components/HistoricTimeline.vue");

const router = createRouter({
  history: createWebHistory(),
    routes: [
        { path: "/", component: HistoricTimeline },
        { path: "/about", component: HistoricTimeline }
    ],
});

export default router;
