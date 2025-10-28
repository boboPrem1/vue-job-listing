import { defineStore } from "pinia";
import { computed, reactive } from "vue";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const user = reactive({
      _id: "",
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      role: "",
    });

    const isAuthenticated = computed(() => {
      return user._id != "";
    });

    const login = (user_in) => {
      user._id = user_in._id;
      user.firstname = user_in.firstname;
      user.lastname = user_in.lastname;
      user.username = user_in.username;
      user.email = user_in.email;
      user.role = user_in.role;
    };

    const logout = () => {
      user._id = "";
      user.firstname = "";
      user.lastname = "";
      user.username = "";
      user.email = "";
      user.role = "";
    };

    return { user, isAuthenticated, login, logout };
  },
  {
    persist: true, // Enable persistence for this store
  }
);
