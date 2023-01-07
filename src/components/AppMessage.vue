<template>
  <div class="full-message">
    <h2 class="full-message__title">{{ message.title }}</h2>
    <div class="full-message__flag" v-if="message.flag">
      <img
        :src="getFlagIcon(message.flag)"
        class="full-message__flag-img"
        alt=""
      />
      <span v-if="message.flag" class="full-message__flag-text">
        {{ message.flag }}
      </span>
    </div>
    <div class="full-message__info">
      <div class="full-message__status"></div>
      <img
        v-if="message.author.avatar"
        class="author__img"
        :src="message.author.avatar"
        alt=""
      />
      <div v-else class="message__user-img message__user-img_word">
        {{ message.author.surname[0] }}
      </div>
      <div>
        <div class="full-message__author author">
          <span class="author__name">
            {{ message.author.name }} {{ message.author.surname }}
          </span>
          <div class="full-message__time">{{ formatedDate(message.date) }}</div>
          <div
            v-if="message.important"
            @click.stop="changeImportant(message)"
            class="message__important"
          >
            <icon-important> </icon-important>
          </div>
          <div
            v-if="!message.important"
            @click.stop="changeMark(message)"
            class="message__mark"
            :class="{ message__mark_active: message.bookmark }"
          >
            <icon-bookmark :active="message.bookmark"> </icon-bookmark>
          </div>
        </div>
        <div class="full-message__address">
          {{ $t('whoIs') }}: {{ $t('you') }}, {{ recipients }}
          <button
            v-if="isVisibleAllRecipients"
            class="full-message__get-all-recipients"
            @click="changeMaxRecipients()"
          >
            {{ notVisibleRecipients }}
          </button>
        </div>
      </div>
    </div>
    <div class="full-message__attaches attaches" v-if="message.doc?.img">
      <div class="attaches__items">
        <img
          v-for="attach of message.doc.img"
          :key="attach"
          class="attaches__img"
          :src="attach"
          alt=""
          loading="lazy"
        />
      </div>
      <div class="attaches__count">
        {{ $t('files') }}: {{ message.imagesCount }}
        <button class="attaches__download" @click="loadImgs">
          {{ $t('download') }}
        </button>
        <span class="attaches__size"> ({{ getSizeOfDoc() }}) </span>
      </div>
    </div>
    <div class="full-message__text">
      {{ message.text }}
    </div>
  </div>
</template>

<script>
import api from '../api'
import IconBookmark from './svg-icons/IconBookmark.vue'
import IconImportant from './svg-icons/IconImportant.vue'
export default {
  components: {
    IconBookmark,
    IconImportant,
  },
  data() {
    return {
      message: { ...this.$store.getters.currentMessage },
      allRecipients: [],
      defaultMaxRecipients: 4,
      imagesCount: null,
    }
  },
  computed: {
    isVisibleAllRecipients() {
      return this.message.to.length > this.defaultMaxRecipients
    },
    recipients() {
      return this.message.to
        .map(user => `${user.name} ${user.surname}`)
        .slice(0, this.defaultMaxRecipients)
        .join(', ')
    },
    notVisibleRecipients() {
      const recipients = this.message.to.length - this.defaultMaxRecipients
      if (this.$store.getters.language === 'en') {
        if (recipients === 1) {
          return `${recipients} recipient`
        } else {
          return `${recipients} recipients`
        }
      }
      if (recipients === 1) return `${recipients} получатель`
      if ([2, 3, 4].includes(recipients)) return `${recipients} получателя`
      return `${recipients} получателей`
    },
  },
  async mounted() {
    if (this.message.doc) {
      for (let i = 0; i < this.message.imagesCount; i++) {
        const imgSrc = await api.getImgById(this.message.id, i)
        this.message.doc.img.push(window.URL.createObjectURL(imgSrc))
        this.imagesCount += imgSrc.size
      }
    }
  },
  methods: {
    loadImgs() {
      for (let i = 0; i < this.message.doc.img.length; i++) {
        const link = document.createElement('a')
        link.href = this.message.doc.img[i]
        link.download = `${i}.jpg`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    },
    getSizeOfDoc() {
      const imagesCount = this.imagesCount
      if (!imagesCount) return '...'
      if (imagesCount <= 1000) {
        return imagesCount + ' bit'
      } else if (imagesCount > 1000 && imagesCount < 1_000_000) {
        return (imagesCount / 1000).toFixed(0) + 'Kb'
      } else if (imagesCount > 1_000_000 && imagesCount < 1_000_000_000) {
        return (imagesCount / 1_000_000).toFixed(2) + 'Mb'
      } else {
        return (imagesCount / 1_000_000_000).toFixed(2) + 'Gb'
      }
    },
    changeMaxRecipients() {
      this.defaultMaxRecipients = this.message.to.length
    },
    getFlagIcon(flag) {
      return new URL(`../assets/${flag}.svg`, import.meta.url).href
    },
    formatedDate(date) {
      const _date = new Date(date)
      const day = String(_date.getDate()).padStart(2, 0)
      const mounth = String(_date.getMonth() + 1).padStart(2, 0)
      const year = String(_date.getFullYear()).slice(2)
      return `${day}.${mounth}.${year}`
    },
    nameOfGetMessage(users) {
      this.allRecipients = users.map(user => `${user.name} ${user.surname}`)
      if (this.allRecipients.length >= this.defaultMaxRecipients) {
        return this.allRecipients.slice(0, this.defaultMaxRecipients).join(', ')
      } else {
        return this.allRecipients.join(', ')
      }
    },
  },
}
</script>
<style>
.full-message {
  background: var(--color-accent-bg);
  border-radius: var(--border-radius-main);
  padding: 32px;
  position: relative;
}
.full-message__title {
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  margin-bottom: var(--unit);
  max-width: 80%;
}
.full-message__flag {
  position: absolute;
  right: var(--unit);
  top: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.full-message__flag-img {
  width: 24px;
  height: 24px;
  margin-right: 6px;
}
.full-message__flag-text {
  font-weight: 400;
  font-size: var(--text-small);
  line-height: 20px;
}
.full-message__info {
  display: flex;
  align-items: center;
  margin-bottom: 18px;
}
.full-message__status {
  width: 5px;
  height: 5px;
  background: var(--color-primary);
  position: relative;
  left: -12px;
  border-radius: 50%;
  cursor: pointer;
}
.author {
  display: flex;
  align-items: center;
}
.author__img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: var(--unit);
}
.message__user-img_word {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  background: #d3b3ff;
  color: #874dd6;
}
.author__name {
  font-weight: 400;
  font-size: var(--text-middle);
  line-height: 20px;
  margin-right: var(--unit);
}
.full-message__time {
  font-weight: 400;
  font-size: var(--text-small);
  line-height: 18px;
  color: var(--color-gray);
}
.full-message__address {
  font-weight: 400;
  font-size: var(--text-small);
  line-height: 18px;
  color: var(--color-gray);
}
.full-message__get-all-recipients {
  border-bottom: 1px solid var(--color-gray);
}
.attaches__items {
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  min-height: 196px;
}
.attaches__img {
  height: 196px;
  border-radius: var(--border-radius-main);
  object-fit: contain;
  margin-right: var(--unit);
}
.attaches__count {
  margin-top: 8px;
}
.attaches__download {
  margin-left: 6px;
  color: var(--color-primary);
}
.attaches__size {
  color: var(--color-gray);
  font-size: 13px;
}
.full-message__text {
  margin-top: 18px;
}
.skeleton {
  position: relative;
  overflow: hidden;
  background-color: var(--color-gray);
  height: 196px;
  width: 300px;
  border-radius: var(--border-radius-main);
}
.skeleton::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: translateX(-100%);
  background-image: linear-gradient(
    90deg,
    rgb(255 255 255 / 0),
    rgb(255 255 255 / 0.3),
    rgb(37 22 22 / 0)
  );
  animation: shimmer 1.5s infinite;
  content: '';
}
@media (max-width: 1366px) {
  .full-message__flag-text {
    display: none;
  }
}
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>
