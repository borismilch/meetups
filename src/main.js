import Vue from "vue";

import App from "./App.vue";
import VueMeta from 'vue-meta'
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import dateFilter from "./filters/date.filter";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyAq4M6r395twgYXci4TaoVJXF-bjPh4RMM",
  authDomain: "foobar-5fe7a.firebaseapp.com",
  projectId: "foobar-5fe7a",
  storageBucket: "foobar-5fe7a.appspot.com",
  messagingSenderId: "68445483574",
  appId: "1:68445483574:web:48ce38aaeecd3d305ade97",
};

firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false;
Vue.use(VueMeta)
Vue.filter("date", dateFilter);

firebase.auth().onAuthStateChanged(() => {});
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
