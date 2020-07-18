export default {
  isAuthenticated() {
    return localStorage.getItem("token");
  }
};
