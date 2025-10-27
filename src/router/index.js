import { createRouter } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import { createWebHistory } from "vue-router";
import JobsView from "@/views/JobsView.vue";
import JobView from "@/views/JobView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import AddJobView from "@/views/AddJobView.vue";
import EditJobView from "@/views/EditJobView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/jobs",
      name: "jobs",
      component: JobsView,
    },
    {
      path: '/jobs/:id',
      name: "job",
      component: JobView,
    },
    {
      path: '/jobs/edit/:id',
      name: "edit-job",
      component: EditJobView,
    },
    {
      path: '/jobs/add',
      name: "add-job",
      component: AddJobView
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    }
  ],
});

export default router;
