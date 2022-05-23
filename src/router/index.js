import { createRouter, createWebHistory } from "vue-router";

const Timeline = () => import("@/views/TimelinePage.vue");
const About = () => import("@/views/AboutPage.vue");

const router = createRouter({
  history: createWebHistory(),
    routes: [
        { path: "/", component: Timeline },
        { path: "/about", component: About }
    ],
});

export default router;
