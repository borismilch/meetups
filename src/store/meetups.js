import firebase from "firebase/compat/app";
export default {
  state: {
    meetups: [],
  },
  mutations: {
    setMeetups(state, meetups) {
      state.meetups = meetups;
    },
  },
  actions: {
   // eslint-disable-next-line
    async addMeetup ({dispatch, commit}, meetup) {
      await firebase.database().ref("/meetups").push(meetup);
      await dispatch('fetchMeetups')
    },

    async fetchMeetups({ dispatch, commit }) {
      const uid = await dispatch("getUid");
      const subscribes = await dispatch("getSubs");
      console.log(subscribes);
      const meetups = (
        await firebase.database().ref("/meetups").once("value")
      ).val();
      const mets = Object.keys(meetups).map((key) => ({
        ...meetups[key],
        id: key,
        organize: meetups[key].creator === uid,
        fating: !!subscribes.find((s) => s === key),
      }));
      console.log(mets);
      commit("setMeetups", mets);
    },
    async subscribeOnMeetup({ dispatch }, id) {
      const uid = await dispatch("getUid");
      firebase.database().ref(`/users/${uid}/subscribes`).push(id);
      await dispatch("fetchMeetups");
    },
    async unSub({ dispatch }, id) {
      const uid = await dispatch("getUid");
      const key = await dispatch("getKey", id);
      console.log(key);
      await firebase.database().ref(`/users/${uid}/subscribes/${key}`).remove();
      await dispatch("fetchMeetups");
    },
    async getSubs({ dispatch }) {
      const uid = await dispatch("getUid");
      const subscribes = (
        await firebase.database().ref(`/users/${uid}/subscribes`).once("value")
      ).val();
      return Object.values(subscribes);
    },
    async getKey({ dispatch }, id) {
      const uid = await dispatch("getUid");
      const subscribes = (
        await firebase.database().ref(`/users/${uid}/subscribes`).once("value")
      ).val();
      const key = Object.keys(subscribes).find((key) => subscribes[key] === id);
      return key;
    },
    // eslint-disable-next-line
    async keyMeetup ({ dispatch }, item) {
     const meetUps = (await firebase.database().ref('/meetups').once).val()
     const key = Object.keys(meetUps).find(key => meetUps[key].desc = item.desc)
     return key;
    },
    // eslint-disable-next-line
    async deleteMeetup ({ dispatch }, id) {
      await firebase.database().ref(`/meetups/${id}`).remove()
      await dispatch('fetchMeetups')
    },
    async updateMeetup ({ dispatch }, temp) {
      await firebase.database().ref(`/meetups/${temp[0]}`).update({...temp[1]})
      await dispatch('fetchMeetups')
    }
    
  },
  getters: {
    meetups: (s) => s.meetups,
  },
};
