<template>
  <div class="messages" id="id1">
    <div
      v-for="message of db"
      :key="message"
      class="messages__item message"
      tabindex="0"
      @click="goToMessage(message)"
    >
      <icon-status
        class="message__status-wrapper"
        @click.stop="changeStatus(message)"
        :isRead="!message.read"
      >
      </icon-status>

      <div class="message__user">
        <img
          v-if="message.author?.avatar"
          class="message__user-img"
          :src="message.author?.avatar"
          alt="logo"
        />
        <div v-else class="message__user-img message__user-img_word">
          {{ message.author.surname[0] }}
        </div>
        <span
          :class="{ 'message__user-name_bold': !message.read }"
          class="message__user-name"
          >{{ message.author.name }} {{ message.author.surname }}</span
        >
      </div>
      <div
        v-if="message.important"
        @click.stop="changeImportant(message)"
        class="message__important"
      >
        <icon-important></icon-important>
      </div>
      <div
        v-if="!message.important"
        @click.stop="changeMark(message)"
        class="message__mark"
        :class="{ message__mark_active: message.bookmark }"
      >
        <icon-bookmark :active="message.bookmark"></icon-bookmark>
      </div>

      <div class="message__text-wrapper">
        <span
          :class="{ 'message__user-name_bold': !message.read }"
          class="message__title"
          >{{ message.title }}</span
        >
        <span class="message__text"> {{ message.text }} </span>
      </div>
      <img
        v-if="message.flag"
        :src="getFlagIcon(message.flag)"
        class="messages__flag"
        width="24"
        height="24"
      />
      <div
        v-if="message.doc"
        class="messages__has-attach"
        @click.stop="showAttach(message)"
      >
        <icon-attach></icon-attach>
      </div>

      <span class="time">{{ timeMessage(message.date) }}</span>
      <popup-attach
        v-if="currentAttaches && currentAttaches === message"
        @closePopup="closePopup"
        :attaches="message.doc"
      ></popup-attach>
    </div>
  </div>
  <button
    v-if="$store.getters.page < maxPages && db.length"
    @click="resize($event, true)"
    class="messages__load-more"
  >
    {{ $t('showMore') }}
  </button>
</template>

<script>
import AppMessage from './AppMessage.vue'
import PopupAttach from './PopupAttach.vue'
import IconBookmark from './svg-icons/IconBookmark.vue'
import IconImportant from './svg-icons/IconImportant.vue'
import IconAttach from './svg-icons/IconAttach.vue'
import IconStatus from './svg-icons/IconStatus.vue'
import api from '../api.js'

export default {
  components: {
    AppMessage,
    PopupAttach,
    IconBookmark,
    IconImportant,
    IconAttach,
    IconStatus,
  },
  data() {
    return {
      db: [],
      page: 1,
      visibleMessage: null,
      countMessagesInFolder: Infinity,
      firstCountOfLoadImages: null,
      currentAttaches: null,
    }
  },

  computed: {
    currentFolder() {
      return this.$store.getters.currentFolder
    },
    maxPages() {
      return Math.ceil(this.countMessagesInFolder / 25)
    },
    currentMessages() {
      return this.$store.getters.currentMessages
    },
  },

  watch: {
    async currentMessages() {
      this.db = this.currentMessages
      const filters = this.$store.getters.filter
      this.countMessagesInFolder = await api.getLengthOfMessagesOfFolder(
        this.currentFolder,
        filters
      )
    },

    async currentFolder() {
      this.$store.commit('changePage', 1)
      await this.$store.commit('clearCurrentMessages')

      const filters = this.$store.getters.filter
      this.countMessagesInFolder = await api.getLengthOfMessagesOfFolder(
        this.currentFolder,
        filters
      )
      this.$store.commit('changePage', 1)
      await this.$store.dispatch('loadMessages', { push: false })
    },
  },

  async mounted() {
    this.throttledResize = this.throttle(this.resize, 1000)
    const main = document.querySelector('.main')
    main.addEventListener('scroll', this.throttledResize)
    window.addEventListener('resize', this.throttledResize)
    const filters = this.$store.getters.filter
    this.countMessagesInFolder = await api.getLengthOfMessagesOfFolder(
      this.currentFolder,
      filters
    )

    await this.$store.dispatch('loadMessages', { push: false })
  },

  methods: {
    changeStatus(message) {
      message.read = !message.read
    },
    changeImportant(message) {
      message.important = !message.important
    },
    changeMark(message) {
      message.bookmark = !message.bookmark
    },
    closeCurrentMessage() {
      this.visibleMessage = null
    },
    throttle(callee, timeout) {
      let timer = null
      return (...args) => {
        if (timer) return
        timer = setTimeout(() => {
          callee(...args)
          clearTimeout(timer)
          timer = null
        }, timeout)
      }
    },
    async resize(e, isButtonClick = false) {
      if (this.maxPages <= this.$store.getters.page || !this.db.length) return

      const main = document.querySelector('.main')
      if (main.scrollTop >= main.scrollHeight - 1500 || isButtonClick) {
        console.log('load')
        this.$store.commit('changePage', this.$store.getters.page + 1)
        await this.$store.dispatch('loadMessages', { push: true })
      }
    },
    getFlagIcon(flag) {
      return new URL(`../assets/${flag}.svg`, import.meta.url).href
    },
    async goToMessage(message) {
      const main = document.querySelector('.main')
      main.removeEventListener('scroll', this.throttledResize)
      window.removeEventListener('resize', this.throttledResize)
      await this.$store.commit('setCurrentMessage', message)

      this.$router.push('/message')
    },
    timeMessage(date) {
      const mounth = [
        this.$t('January'),
        this.$t('February'),
        this.$t('March'),
        this.$t('April'),
        this.$t('May'),
        this.$t('June'),
        this.$t('July'),
        this.$t('August'),
        this.$t('September'),
        this.$t('October'),
        this.$t('November'),
        this.$t('December'),
      ]
      const now = new Date()
      const dateMessage = new Date(date)
      const diffYear = dateMessage.getFullYear() !== now.getFullYear()
      if (diffYear) {
        const day = String(dateMessage.getDate()).padStart(2, 0)
        const mounth = String(dateMessage.getMonth() + 1).padStart(2, 0)
        const year = String(dateMessage.getFullYear()).slice(2)

        return `${day}.${mounth}.${year}`
      }
      const start = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const diff = start - dateMessage
      if (diff <= 0) return this.$t('today')
      if (diff <= 1000 * 60 * 60 * 24) this.$t('yesterday')

      return dateMessage.getDate() + ' ' + mounth[dateMessage.getMonth()]
    },
    async showAttach(message) {
      this.currentAttaches = message
      if (message.isDocLoad) return
      message.isDocLoad = true
      for (let i = 0; i < message.imagesCount; i++) {
        const img = await api.getImgById(message.id, i)
        message.doc.img.push(img)
      }
    },
    closePopup() {
      this.currentAttaches = null
    },
  },
}
</script>

<style>
.messages {
  background: var(--color-accent-bg);
  border-radius: 12px;
}
.message:hover {
  background: var(--color-hover);
  border-radius: var(--border-radius-main);
}
.message:hover .message__status {
  visibility: visible;
}
.message:hover .message__mark {
  visibility: visible;
}
.messages__item {
  padding: 0 var(--unit);
  display: flex;
  align-items: center;
  height: 48px;
  position: relative;
}
.messages__item:not(:last-child) {
  border-bottom: 1px solid var(--color-border-bottom-message);
}
.message__status-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  margin-right: var(--unit);
}
.message__status-wrapper:hover {
  cursor: pointer;
}

.message__status_not-read {
  visibility: visible;
  background: var(--color-primary);
}
.message__user {
  display: flex;
  align-items: center;
  width: 216px;
}
.message__user-img {
  margin-right: var(--unit);
  width: 32px;
  height: 32px;
  min-width: 32px;
  min-height: 32px;
  border-radius: 50%;
}
.message__user-img_word {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  background: #d3b3ff;
  color: #874dd6;
}
.message__user-name {
  font-weight: 400;
  font-size: var(--text-middle);
  line-height: 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 450px;
}
.message__user-name_bold {
  font-weight: 700;
}
.message__important {
  text-align: center;
}
.message__important,
.message__mark {
  width: 32px;
  margin: 0 var(--unit);
  cursor: pointer;
}
.message__mark {
  visibility: hidden;
}
.message__mark_active {
  visibility: visible;
}
.messages__flag {
  margin-left: 6px;
}
.messages__has-attach {
  cursor: pointer;
}
.message__text-wrapper {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
}
.message__title_bold {
  font-weight: 700;
}
.message__title ~ .message__text {
  margin-left: var(--unit);
}
.message__text {
  color: var(--color-gray);
}
.time {
  color: var(--color-gray);
  white-space: nowrap;
  font-weight: 400;
  min-width: 51px;
  margin-left: 6px;
  font-size: var(--text-small);
  line-height: 20px;
  text-align: right;
}
.messages__load-more {
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
}
.message-not-found {
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
@media (max-width: 768px) {
  .message__user-name,
  .message__title,
  .message__text-wrapper {
    font-size: var(--text-small);
  }
  .message__text-wrapper {
    flex-direction: column;
    white-space: normal;
    height: 44px;
  }
  .message__user {
    order: -2;
    display: inline;
    width: auto;
  }
  .time {
    position: absolute;
    top: var(--unit);
    right: var(--unit);
    font-size: var(--text-extra-small);
    min-width: 38px;
    order: -1;
    display: inline;
    width: auto;
  }
  .message__mark,
  .messages__flag,
  .messages__has-attach,
  .message__status,
  .message__user-img {
    display: none;
  }
  .messages__item {
    padding: 6px;
    flex-direction: column;
    height: auto;
    align-items: flex-start;
    position: relative;
  }
  .message__user-name {
    white-space: normal;
  }
}
</style>
