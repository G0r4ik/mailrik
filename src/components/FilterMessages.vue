<template>
  <div class="filter-messages">
    <div class="filter-messages__select filter-select-control">
      <div class="filter-select-control__icons"></div>
      <button class="filter-select-control__text">Фильтры</button>
      <svg
        class="filter-select-control__control"
        width="8"
        height="6"
        viewBox="0 0 8 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.70711 0.792894C8.09763 1.18342 8.09763 1.81658 7.70711 2.20711L4.70711 5.20711C4.31658 5.59763 3.68342 5.59763 3.29289 5.20711L0.292893 2.20711C-0.0976311 1.81658 -0.0976311 1.18342 0.292893 0.792893C0.683418 0.402369 1.31658 0.402369 1.70711 0.792893L4 3.08579L6.29289 0.792893C6.68342 0.402369 7.31658 0.402369 7.70711 0.792894Z"
          fill="#2C2D2E"
        />
      </svg>
    </div>
    <div class="filter-messages__list filter-list">
      <ul class="filter-list__inner">
        <li class="filter-list__item" @click="filteredMessages('all')">
          Все письма
        </li>
        <li class="filter-list__item" @click="filteredMessages('unread')">
          Непрочитанные
        </li>
        <li class="filter-list__item" @click="filteredMessages('bookmark')">
          <icon-bookmark :active="true"></icon-bookmark>
          С флажком
        </li>
        <li
          class="filter-list__item"
          @click="filteredMessages('withAttachments')"
        >
          С вложениями
        </li>
      </ul>
      <button @click="filteredMessages('all')">Сбросить всё</button>
    </div>
  </div>
</template>
<script>
import IconBookmark from './svg-icons/IconBookmark.vue'
export default {
  components: {
    IconBookmark,
  },
  emits: ['filteredMessages'],
  data() {
    return {
      filters: {
        unread: false,
        bookmark: false,
        withAttachments: false,
      },
    }
  },
  methods: {
    filteredMessages(filter) {
      this.filters[filter] = !this.filters[filter]
      this.$emit('filteredMessages', filter)
    },
  },
}
</script>

<style>
.filter-messages {
}
.filter-messages__select {
}
.filter-select-control {
}
.filter-select-control__icons {
}
.filter-select-control__text {
}
.filter-select-control__control {
}
.filter-messages__list {
}
.filter-list {
}
.filter-list__inner {
}
.filter-list__item {
}
</style>
