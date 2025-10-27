import { defineStore } from "pinia";
import { computed, reactive } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const user = reactive({
    id: "",
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    role: ""
  });

  const isAuthenticated = computed(() => {
    return user.id
  });

  return {isAuthenticated}
});
