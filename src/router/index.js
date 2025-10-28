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
import { useAuthStore } from "@/stores/auth";

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
      meta: { requiresAuth: true },
    },
    {
      path: "/jobs/:id",
      name: "job",
      component: JobView,
      meta: { requiresAuth: true },
    },
    {
      path: "/jobs/edit/:id",
      name: "edit-job",
      component: EditJobView,
      meta: { requiresAuth: true, requiresEditorOrAdmin: true },
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();
        if (
          to.meta.requiresEditorOrAdmin &&
          (authStore.user.role === "editor" || authStore.user.role === "admin")
        ) {
          next("/"); // Redirect to home if not admin
        } else {
          next();
        }
      },
    },
    {
      path: "/jobs/add",
      name: "add-job",
      component: AddJobView,
      meta: { requiresAuth: true, requiresEditorOrAdmin: true },
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();
        if (
          to.meta.requiresEditorOrAdmin &&
          (authStore.user.role === "editor" || authStore.user.role === "admin")
        ) {
          next("/"); // Redirect to home if not admin
        } else {
          next();
        }
      },
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: NotFoundView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // Vérifier uniquement les routes qui nécessitent l'authentification
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/login"); // Rediriger vers login
  } else {
    next(); // Continuer
  }
});

export default router;
