import create from "zustand";
import axios from "axios";

const authStore = create((set) => ({
  loggedIn: null,
  loginForm: {
    email: "",
    password: "",
  },
  signupForm: {
    email: "",
    password: "",
  },

  updateLoginForm: (e) => {
    const { name, value } = e.target;

    set((state) => {
      return {
        loginForm: {
          ...state.loginForm,
          [name]: value,
        },
      };
    });
  },

  updateSignupForm: (e) => {
    const { name, value } = e.target;

    set((state) => {
      return {
        signupForm: {
          ...state.signupForm,
          [name]: value,
        },
      };
    });
  },

  login: async () => {
    const { loginForm } = authStore.getState(); // Avoid accessing state directly

    try {
      const res = await axios.post("/login", loginForm, {
        withCredentials: true,
      });

      set({ loggedIn: true, loginForm: { email: "", password: "" } });
      console.log(res);
    } catch (error) {
      console.error("Login error:", error);
      // Handle login error (e.g., display error message to the user)
    }
  },

  checkAuth: async () => {
    try {
      await axios.get("/check-auth");
      set({ loggedIn: true });
    } catch (err) {
      set({ loggedIn: false });
    }
  },
  signup: async () => {
    const { signupForm } = authStore.getState();
    const res = await axios.post("/signup", signupForm, {
      withCredentials: true,
    });

    set({
      signupForm: {
        email: "",
        password: ",",
      },
    });
    console.log(res);
  },
  logout: async (e) => {
    await axios.get("/logout")
    set({loggedIn: false})
  },
}));

export default authStore;
