import { createStore } from 'vuex'
import api from './api'

export default createStore({
  state() {
    return {
      currentMessage: null,
      currentFolder: 'Входящие',
      currentMessages: [],
      filter: null,
      theme: {
        colorText: null,
        bg: null,
      },
      language: localStorage.getItem('language') || 'ru',
    }
  },

  getters: {
    currentMessage(state) {
      return state.currentMessage
    },
    currentFolder(state) {
      return state.currentFolder
    },
    currentMessages(state) {
      return state.currentMessages
    },
    filter(state) {
      return state.filter
    },
    theme(state) {
      return state.theme
    },
    language(state) {
      return state.language
    },
  },

  actions: {
    async loadMessages(context, obj) {
      let messages = await api.getMessagesByFolder(
        obj.currentFolder,
        obj.page,
        25,
        obj.filter
      )
      if (obj.push) return context.commit('pushCurrentMessages', messages)
      context.commit('setCurrentMessages', messages)
    },
  },

  mutations: {
    setCurrentMessage(state, currentMessage) {
      state.currentMessage = currentMessage
    },
    setLanguage(state, language) {
      localStorage.setItem('language', language)
      state.language = language
    },
    setCurrentFolder(state, currentFolder) {
      state.currentFolder = currentFolder
    },
    setCurrentMessages(state, messages) {
      state.currentMessages = messages
    },
    pushCurrentMessages(state, messages) {
      state.currentMessages.push(...messages)
    },
    clearCurrentMessages(state) {
      state.currentMessages = []
    },
    filteredCurrentMessages(state, filter) {
      if (filter === 'all') {
      }

      // state.currentMessages = state.currentMessages.filter(message => )
    },
  },
})
