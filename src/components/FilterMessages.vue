<template>
  <div class="filter-messages">
    <div class="filter-messages__select filter-select-control">
      <div class="filter-select-control__icons">
        <icon-status
          v-if="$store.getters.filter.unread"
          class="filter-list__icon"
          :isRead="true"
        >
        </icon-status>
        <icon-bookmark
          v-if="$store.getters.filter.bookmark"
          class="filter-list__icon"
          :active="true"
        ></icon-bookmark>
        <icon-attach
          v-if="$store.getters.filter.withAttachments"
          class="filter-list__icon"
        >
        </icon-attach>
      </div>
      <button
        class="filter-select-control__text"
        @click="isShowFilter = !isShowFilter"
      >
        {{ $t('headerFilters') }}
      </button>
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
    <div v-if="isShowFilter" class="filter-messages__list filter-list">
      <ul class="filter-list__inner">
        <li
          class="filter-list__item"
          :class="{ 'filter-list__item_checked': allMessage }"
          @click="filteredMessages('all')"
        >
          <svg
            class="filter-list__item-arrow"
            width="10"
            height="7"
            viewBox="0 0 10 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9.39981 0.599805C8.99981 0.199805 8.3998 0.199805 7.9998 0.599805L3.9998 4.5998L1.9998 2.5998C1.5998 2.1998 0.999805 2.1998 0.599805 2.5998C0.199805 2.9998 0.199805 3.5998 0.599805 3.9998L3.2998 6.6998C3.4998 6.8998 3.6998 6.9998 3.9998 6.9998C4.2998 6.9998 4.4998 6.8998 4.6998 6.6998L9.39981 1.9998C9.79981 1.5998 9.79981 0.999805 9.39981 0.599805V0.599805V0.599805Z"
              fill="#2C2D2E"
            />
          </svg>
          {{ $t('allLetters') }}
        </li>
        <li
          class="filter-list__item"
          :class="{ 'filter-list__item_checked': $store.getters.filter.unread }"
          @click="filteredMessages('unread')"
        >
          <svg
            class="filter-list__item-arrow"
            width="10"
            height="7"
            viewBox="0 0 10 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9.39981 0.599805C8.99981 0.199805 8.3998 0.199805 7.9998 0.599805L3.9998 4.5998L1.9998 2.5998C1.5998 2.1998 0.999805 2.1998 0.599805 2.5998C0.199805 2.9998 0.199805 3.5998 0.599805 3.9998L3.2998 6.6998C3.4998 6.8998 3.6998 6.9998 3.9998 6.9998C4.2998 6.9998 4.4998 6.8998 4.6998 6.6998L9.39981 1.9998C9.79981 1.5998 9.79981 0.999805 9.39981 0.599805V0.599805V0.599805Z"
              fill="#2C2D2E"
            />
          </svg>
          <icon-status class="filter-list__icon" :isRead="true"> </icon-status>
          {{ $t('unread') }}
        </li>
        <li
          class="filter-list__item"
          :class="{
            'filter-list__item_checked': $store.getters.filter.bookmark,
          }"
          @click="filteredMessages('bookmark')"
        >
          <svg
            class="filter-list__item-arrow"
            width="10"
            height="7"
            viewBox="0 0 10 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9.39981 0.599805C8.99981 0.199805 8.3998 0.199805 7.9998 0.599805L3.9998 4.5998L1.9998 2.5998C1.5998 2.1998 0.999805 2.1998 0.599805 2.5998C0.199805 2.9998 0.199805 3.5998 0.599805 3.9998L3.2998 6.6998C3.4998 6.8998 3.6998 6.9998 3.9998 6.9998C4.2998 6.9998 4.4998 6.8998 4.6998 6.6998L9.39981 1.9998C9.79981 1.5998 9.79981 0.999805 9.39981 0.599805V0.599805V0.599805Z"
              fill="#2C2D2E"
            />
          </svg>
          <icon-bookmark
            class="filter-list__icon"
            :active="true"
          ></icon-bookmark>
          {{ $t('bookmark') }}
        </li>
        <li
          class="filter-list__item"
          :class="{
            'filter-list__item_checked': $store.getters.filter.withAttachments,
          }"
          @click="filteredMessages('withAttachments')"
        >
          <svg
            class="filter-list__item-arrow"
            width="10"
            height="7"
            viewBox="0 0 10 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9.39981 0.599805C8.99981 0.199805 8.3998 0.199805 7.9998 0.599805L3.9998 4.5998L1.9998 2.5998C1.5998 2.1998 0.999805 2.1998 0.599805 2.5998C0.199805 2.9998 0.199805 3.5998 0.599805 3.9998L3.2998 6.6998C3.4998 6.8998 3.6998 6.9998 3.9998 6.9998C4.2998 6.9998 4.4998 6.8998 4.6998 6.6998L9.39981 1.9998C9.79981 1.5998 9.79981 0.999805 9.39981 0.599805V0.599805V0.599805Z"
              fill="#2C2D2E"
            />
          </svg>
          <icon-attach class="filter-list__icon"> </icon-attach>
          {{ $t('withAttachments') }}
        </li>
      </ul>
      <div
        class="filter-list__sort filter-sort"
        @click="sortVisible = !sortVisible"
      >
        {{ $t('sort') }}
        <ul v-if="sortVisible" @click.stop class="filter-sort__list">
          <li
            class="filter-sort__item"
            :class="{
              'filter-sort__item_active':
                $store.getters.sortOfMessages === 'newToOld',
            }"
            @click="changeSort('newToOld')"
          >
            <svg
              class="filter-sort__item-arrow"
              width="10"
              height="7"
              viewBox="0 0 10 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.39981 0.599805C8.99981 0.199805 8.3998 0.199805 7.9998 0.599805L3.9998 4.5998L1.9998 2.5998C1.5998 2.1998 0.999805 2.1998 0.599805 2.5998C0.199805 2.9998 0.199805 3.5998 0.599805 3.9998L3.2998 6.6998C3.4998 6.8998 3.6998 6.9998 3.9998 6.9998C4.2998 6.9998 4.4998 6.8998 4.6998 6.6998L9.39981 1.9998C9.79981 1.5998 9.79981 0.999805 9.39981 0.599805V0.599805V0.599805Z"
                fill="#2C2D2E"
              />
            </svg>
            {{ $t('sortNewToOld') }}
          </li>
          <li
            class="filter-sort__item"
            :class="{
              'filter-sort__item_active':
                $store.getters.sortOfMessages === 'oldToNew',
            }"
            @click="changeSort('oldToNew')"
          >
            <svg
              class="filter-sort__item-arrow"
              width="10"
              height="7"
              viewBox="0 0 10 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.39981 0.599805C8.99981 0.199805 8.3998 0.199805 7.9998 0.599805L3.9998 4.5998L1.9998 2.5998C1.5998 2.1998 0.999805 2.1998 0.599805 2.5998C0.199805 2.9998 0.199805 3.5998 0.599805 3.9998L3.2998 6.6998C3.4998 6.8998 3.6998 6.9998 3.9998 6.9998C4.2998 6.9998 4.4998 6.8998 4.6998 6.6998L9.39981 1.9998C9.79981 1.5998 9.79981 0.999805 9.39981 0.599805V0.599805V0.599805Z"
                fill="#2C2D2E"
              />
            </svg>
            {{ $t('sortOldToNew') }}
          </li>

          <li
            class="filter-sort__item"
            :class="{
              'filter-sort__item_active':
                $store.getters.sortOfMessages === 'authorFirstToLast',
            }"
            @click="changeSort('authorFirstToLast')"
          >
            <svg
              class="filter-sort__item-arrow"
              width="10"
              height="7"
              viewBox="0 0 10 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.39981 0.599805C8.99981 0.199805 8.3998 0.199805 7.9998 0.599805L3.9998 4.5998L1.9998 2.5998C1.5998 2.1998 0.999805 2.1998 0.599805 2.5998C0.199805 2.9998 0.199805 3.5998 0.599805 3.9998L3.2998 6.6998C3.4998 6.8998 3.6998 6.9998 3.9998 6.9998C4.2998 6.9998 4.4998 6.8998 4.6998 6.6998L9.39981 1.9998C9.79981 1.5998 9.79981 0.999805 9.39981 0.599805V0.599805V0.599805Z"
                fill="#2C2D2E"
              />
            </svg>
            {{ $t('sortAuthorFirstToLast') }}
          </li>
          <li
            class="filter-sort__item"
            :class="{
              'filter-sort__item_active':
                $store.getters.sortOfMessages === 'authorLastToFirst',
            }"
            @click="changeSort('authorLastToFirst')"
          >
            <svg
              class="filter-sort__item-arrow"
              width="10"
              height="7"
              viewBox="0 0 10 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.39981 0.599805C8.99981 0.199805 8.3998 0.199805 7.9998 0.599805L3.9998 4.5998L1.9998 2.5998C1.5998 2.1998 0.999805 2.1998 0.599805 2.5998C0.199805 2.9998 0.199805 3.5998 0.599805 3.9998L3.2998 6.6998C3.4998 6.8998 3.6998 6.9998 3.9998 6.9998C4.2998 6.9998 4.4998 6.8998 4.6998 6.6998L9.39981 1.9998C9.79981 1.5998 9.79981 0.999805 9.39981 0.599805V0.599805V0.599805Z"
                fill="#2C2D2E"
              />
            </svg>
            {{ $t('sortAuthorLastToFirst') }}
          </li>
          <li
            class="filter-sort__item"
            :class="{
              'filter-sort__item_active':
                $store.getters.sortOfMessages === 'titleFirstToLast',
            }"
            @click="changeSort('titleFirstToLast')"
          >
            <svg
              class="filter-sort__item-arrow"
              width="10"
              height="7"
              viewBox="0 0 10 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.39981 0.599805C8.99981 0.199805 8.3998 0.199805 7.9998 0.599805L3.9998 4.5998L1.9998 2.5998C1.5998 2.1998 0.999805 2.1998 0.599805 2.5998C0.199805 2.9998 0.199805 3.5998 0.599805 3.9998L3.2998 6.6998C3.4998 6.8998 3.6998 6.9998 3.9998 6.9998C4.2998 6.9998 4.4998 6.8998 4.6998 6.6998L9.39981 1.9998C9.79981 1.5998 9.79981 0.999805 9.39981 0.599805V0.599805V0.599805Z"
                fill="#2C2D2E"
              />
            </svg>
            {{ $t('sortTitleFirstToLast') }}
          </li>
          <li
            class="filter-sort__item"
            :class="{
              'filter-sort__item_active':
                $store.getters.sortOfMessages === 'titleLastToFirst',
            }"
            @click="changeSort('titleLastToFirst')"
          >
            <svg
              class="filter-sort__item-arrow"
              width="10"
              height="7"
              viewBox="0 0 10 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.39981 0.599805C8.99981 0.199805 8.3998 0.199805 7.9998 0.599805L3.9998 4.5998L1.9998 2.5998C1.5998 2.1998 0.999805 2.1998 0.599805 2.5998C0.199805 2.9998 0.199805 3.5998 0.599805 3.9998L3.2998 6.6998C3.4998 6.8998 3.6998 6.9998 3.9998 6.9998C4.2998 6.9998 4.4998 6.8998 4.6998 6.6998L9.39981 1.9998C9.79981 1.5998 9.79981 0.999805 9.39981 0.599805V0.599805V0.599805Z"
                fill="#2C2D2E"
              />
            </svg>
            {{ $t('sortTitleLastToFirst') }}
          </li>
        </ul>
      </div>
      <button @click="filteredMessages('reset')">
        {{ $t('resetEverything') }}
      </button>
    </div>
  </div>
</template>
<script>
import IconBookmark from './svg-icons/IconBookmark.vue'
import IconAttach from './svg-icons/IconAttach.vue'
import IconStatus from './svg-icons/IconStatus.vue'

export default {
  components: { IconBookmark, IconAttach, IconStatus },
  data() {
    return {
      isShowFilter: false,
      filters: {
        unread: false,
        bookmark: false,
        withAttachments: false,
      },
      sortVisible: true,
    }
  },
  computed: {
    allMessage() {
      return Object.values(this.$store.getters.filter).every(k => k === false)
    },
  },

  methods: {
    async changeSort(sort) {
      console.log(sort, this.$store.getters.sortOfMessages)
      if (this.$store.getters.sortOfMessages === sort) return
      this.$store.commit('changeSort', sort)
      await this.$store.commit('clearCurrentMessages')
      this.$store.commit('changePage', 1)
      await this.$store.dispatch('loadMessages', { push: false })
    },

    async filteredMessages(filter) {
      if (filter === 'all') {
        this.$store.commit('clearFilter')
      } else if (filter === 'reset') {
        this.$store.commit('clearFilter')
        this.$store.commit('changeSort', 'newToOld')
      } else {
        this.$store.commit('setFilter', filter)
      }
      await this.$store.commit('clearCurrentMessages')
      this.$store.commit('changePage', 1)
      await this.$store.dispatch('loadMessages', { push: false })
    },
  },
}
</script>

<style>
.filter-messages {
}
.filter-messages__select {
  display: flex;
  align-items: center;
}
.filter-select-control {
}
.filter-select-control__icons {
  display: flex;
  align-items: center;
}
.filter-select-control__text {
  margin-right: var(--unit);
}
.filter-select-control__control {
}
.filter-messages__list {
}
.filter-list {
  position: fixed;
  right: var(--unit);
  padding: 18px 24px;
  background: var(--color-accent-bg);
  box-shadow: 0px 4px 32px rgba(0, 16, 61, 0.16);
  border-radius: 12px;
  width: 240px;
}
.filter-list_visible {
  display: inline;
}
.filter-list__item-arrow {
  display: none;
  position: absolute;
  left: -15px;
}
.filter-list__item_checked .filter-list__item-arrow {
  display: block;
}
.filter-list__inner {
  list-style: none;
  border-bottom: 1px solid red;
  /* margin-bottom: 18px; */
}
.filter-list__sort {
  border-bottom: 1px solid red;
}
.filter-sort {
  position: relative;
}
.filter-sort__list {
  position: absolute;
  left: -160px;
  top: -50px;
  list-style: none;
  background: var(--color-accent-bg);
  box-shadow: 0px 4px 32px rgba(0, 16, 61, 0.16);
  border-radius: 12px;
}
.filter-sort__list_visible {
  display: block;
}
.filter-sort__item {
  padding: 18px 14px;
  padding-left: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
}
.filter-sort__item:not(:last-child) {
}
.filter-sort__item:hover {
  background: var(--color-hover);
}
.filter-sort__item-arrow {
  position: absolute;
  left: 15px;
  display: none;
}
.filter-sort__item_active .filter-sort__item-arrow {
  display: block;
}
.filter-list__icon {
  width: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
}
.filter-list__item {
  position: relative;
  display: flex;
  align-items: center;
  padding: 8px 0;
  cursor: pointer;
}
.filter-list__item:first-child {
  padding-top: 0;
}
</style>
