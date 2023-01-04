import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      currentMessage: null,
      currentFolder: 'Входящие',
    }
  },

  getters: {
    currentMessage(state) {
      return state.currentMessage
    },
    currentFolder(state) {
      return state.currentFolder
    },
  },

  mutations: {
    setCurrentMessage(state, currentMessage) {
      state.currentMessage = currentMessage
    },
    setCurrentFolder(state, currentFolder) {
      state.currentFolder = currentFolder
    },
  },
})
