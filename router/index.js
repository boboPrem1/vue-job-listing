import { createRouter } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import { createWebHistory } from "vue-router";
import JobsView from "@/views/JobsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/jobs",
      name: "jobs",
      component: JobsView,
    },
  ],
});

export default router;
