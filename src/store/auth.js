import firebase from "firebase/compat/app";

export default {
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    clearInfo(state) {
      state.user = null;
    },
  },
  actions: {
    async register({ dispatch, commit }, user) {
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(user.email, user.password);
        const uid = await dispatch("getUid");
        await firebase
          .database()
          .ref(`/users/${uid}/info`)
          .set({ ...user, participate: [], organired: [] });
        commit("setUser", { ...user, participate: [], organired: [] });
      } catch (e) {
        console.log(e);
      }
    },
    async auth({ dispatch, commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        const uid = await dispatch("getUid");
        const currentUser = (
          await firebase.database().ref(`/users/${uid}/info`).once("value")
        ).val();
        console.log(currentUser);
        commit("setUser", currentUser);
      } catch (e) {
        console.log(e);
      }
    },
    async logout({ commit }) {
      await firebase.auth().signOut();
      commit("clearInfo");
    },
    getUid() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    },
  },
  getters: {
    getUser: (s) => s.user,
    isUser: (s) => s.user !== null,
  },
};
