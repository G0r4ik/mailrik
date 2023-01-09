import { createStore } from 'vuex'
import api from './api'

export default createStore({
  state() {
    return {
      currentMessage: null,
      currentFolder: 'Входящие',
      currentMessages: [],
      filter: { unread: false, bookmark: false, withAttachments: false },
      language: localStorage.getItem('language') || 'ru',
      sortOfMessages: 'newToOld',
      page: 1,
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
    language(state) {
      return state.language
    },
    page(state) {
      return state.page
    },
    sortOfMessages(state) {
      return state.sortOfMessages
    },
  },

  actions: {
    async loadMessages(context, obj) {
      let messages = await api.getMessagesByFolder(
        context.getters.currentFolder,
        context.getters.page,
        25,
        context.getters.filter,
        context.getters.sortOfMessages
      )
      if (obj.push) return context.commit('pushCurrentMessages', messages)
      context.commit('setCurrentMessages', messages)
    },
  },

  mutations: {
    changePage(state, page) {
      state.page = page
    },
    changeSort(state, sort) {
      state.sortOfMessages = sort
    },
    setFilter(state, filter) {
      state.filter[filter] = !state.filter[filter]
    },
    clearFilter(state) {
      state.filter.withAttachments = false
      state.filter.unread = false
      state.filter.bookmark = false
    },
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
  },
})
