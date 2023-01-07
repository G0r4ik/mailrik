<template>
  <div class="settings" v-if="isOpenSettings">
    <div class="settings__inner">
      <div class="settings__cross" @click="$emit('closeSettings')">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M6 6L18 18"
              stroke="var(--color-icon)"
              stroke-linecap="round"
            ></path>
            <path
              d="M18 6L6.00001 18"
              stroke="var(--color-icon)"
              stroke-linecap="round"
            ></path>
          </g>
        </svg>
      </div>
      <div class="settings__list">
        <div
          class="settings__item"
          :class="{ settings__item_active: currentSettings === 'theme' }"
          @click="currentSettings = 'theme'"
        >
          {{ $t('appearance') }}
        </div>
        <div
          class="settings__item"
          :class="{ settings__item_active: currentSettings === 'language' }"
          @click="currentSettings = 'language'"
        >
          {{ $t('language') }} : {{ $store.getters.language }}
        </div>
      </div>
      <div class="settings__main">
        <div v-if="currentSettings === 'theme'" class="settings__theme theme">
          <div class="theme__title">
            {{ $t('settingsThemeTitle') }}
          </div>
          <div class="theme__color-wrapper">
            <div
              v-for="color of darkColors"
              :style="{ background: color.themeBg }"
              class="theme__color"
              :class="{ theme__color_active: currentTheme.id === color.id }"
              @click="setTheme(color, 'dark')"
            ></div>
          </div>

          <div class="theme__color-wrapper">
            <div
              v-for="color of lightColors"
              :style="{ background: color.themeBg }"
              class="theme__color"
              :class="{ theme__color_active: currentTheme.id === color.id }"
              @click="setTheme(color, 'light')"
            ></div>
          </div>
          <div class="theme__another-wrapper">
            <div
              v-for="theme in anotherThemes"
              class="theme__another"
              :class="{ theme__another_active: currentTheme.id === theme.id }"
              @click="setTheme(theme)"
            >
              <img :src="getSrcOfTheme(theme.themeBgURL)" alt="" />
            </div>
          </div>
        </div>
        <div v-if="currentSettings === 'language'" class="settings__language">
          <span>{{ $t('changeLanguage') }}</span>
          <label for="" @click="setLanguage('ru')">
            <input type="radio" name="" id="" />
            <svg
              width="15"
              height="12"
              viewBox="0 0 15 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="15" height="4" fill="#F0F0F0" />
              <rect y="4" width="15" height="4" fill="#0D269A" />
              <rect y="8" width="15" height="4" fill="#EB1200" />
            </svg>
            Русский
          </label>
          <label for="" @click="setLanguage('en')">
            <input type="checkbox" name="" id="" />
            <svg
              width="16"
              height="12"
              viewBox="0 0 16 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="0.329102" width="15" height="12" fill="#D62D24" />
              <mask
                id="mask0_4904_13258"
                style="mask-type: alpha"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="16"
                height="12"
              >
                <rect x="0.329102" width="15" height="12" fill="#D62D24" />
              </mask>
              <g mask="url(#mask0_4904_13258)">
                <rect x="6" y="1" width="10" height="1" fill="white" />
                <rect x="6" y="3" width="10" height="1" fill="white" />
                <rect x="6" y="5" width="10" height="1" fill="white" />
                <rect x="-1" y="7" width="17" height="1" fill="white" />
                <rect y="9" width="16" height="1" fill="white" />
                <rect y="11" width="16" height="1" fill="white" />
                <rect width="8" height="6" fill="#1745B2" />
              </g>
            </svg>

            English
          </label>
          <button>{{ $t('chooseLanguage') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    isOpenSettings: Boolean,
  },
  data() {
    return {
      currentTheme: null,
      anotherThemes: [
        {
          id: 'default-dark',
          darkOrLight: 'dark',
          themeHeader: 'var(--color-accent-bg)',
          sidebarColor: 'light',
          themeBg: 'var(--color-background-dark)',
          themeBgURL: 'another-theme--1',
        },
        {
          id: 'default-light',
          darkOrLight: 'light',
          themeHeader: 'var(--color-background-light)',
          sidebarColor: 'dark',
          themeBg: 'var(--color-background-light)',
          themeBgURL: 'another-theme--2',
        },
        {
          id: 'theme-3',
          darkOrLight: 'light',
          themeHeader: '#6B1344',
          sidebarColor: 'light',
          themeBgURL: 'another-theme-mini--3',
          themeBgImg: 'another-theme--3',
        },
      ],
      currentSettings: 'language',
      darkColors: [
        {
          id: 'theme-color-1',
          darkOrLight: 'light',
          themeHeader: 'rgba(0, 0, 0, 0.5)',
          sidebarColor: 'light',
          themeBg: 'rgba(74, 53, 47, 1)',
        },
        {
          id: 'theme-color-2',
          darkOrLight: 'light',
          themeHeader: 'rgba(0, 0, 0, 0.4)',
          sidebarColor: 'light',
          themeBg: 'rgba(66, 66, 66, 1)',
        },
        {
          id: 'theme-color-3',
          darkOrLight: 'light',
          themeHeader: 'rgba(0, 0, 0, 0.4)',
          sidebarColor: 'light',
          themeBg: 'rgba(90, 53, 90, 1)',
        },
        {
          id: 'theme-color-4',
          darkOrLight: 'light',
          themeHeader: 'rgba(0, 0, 0, 0.4)',

          sidebarColor: 'light',
          themeBg: 'rgba(53, 56, 90, 1)',
        },
        {
          id: 'theme-color-5',
          darkOrLight: 'light',
          themeHeader: 'rgba(0, 0, 0, 0.4)',
          sidebarColor: 'light',
          themeBg: 'rgba(100, 110, 203, 1)',
        },
        {
          id: 'theme-color-6',
          darkOrLight: 'light',
          themeHeader: 'rgba(0, 0, 0, 0.4)',
          sidebarColor: 'light',
          themeBg: 'rgba(231, 54, 114, 1)',
        },
        {
          id: 'theme-color-7',
          darkOrLight: 'light',
          themeHeader: 'rgba(0, 0, 0, 0.4)',
          sidebarColor: 'light',
          themeBg: 'rgba(244, 67, 54, 1)',
        },
        {
          id: 'theme-color-8',
          darkOrLight: 'light',
          themeHeader: 'rgba(0, 0, 0, 0.4)',
          sidebarColor: 'light',
          themeBg: 'rgba(56, 142, 60, 1)',
        },
      ],
      lightColors: [
        {
          id: 'theme-color-9',
          darkOrLight: 'light',
          themeHeader: 'rgba(0, 0, 0, 0.4)',
          sidebarColor: 'dark',
          themeBg: 'rgba(129, 216, 208, 1)',
        },
        {
          id: 'theme-color-10',
          darkOrLight: 'light',
          themeHeader: 'rgba(0, 0, 0, 0.4)',
          sidebarColor: 'dark',
          themeBg: 'rgba(226, 220, 210, 1)',
        },
        {
          id: 'theme-color-11',
          darkOrLight: 'light',
          themeHeader: 'rgba(0, 0, 0, 0.4)',
          sidebarColor: 'dark',
          themeBg: 'rgba(255, 235, 205, 1)',
        },
        {
          id: 'theme-color-12',
          darkOrLight: 'light',
          themeHeader: 'rgba(0, 0, 0, 0.4)',
          sidebarColor: 'dark',
          themeBg: 'rgba(231, 238, 210, 1)',
        },
        {
          id: 'theme-color-13',
          darkOrLight: 'light',
          themeHeader: 'rgba(0, 0, 0, 0.4)',
          sidebarColor: 'dark',
          themeBg: 'rgba(208, 240, 247, 1)',
        },
        {
          id: 'theme-color-14',
          darkOrLight: 'light',
          themeHeader: 'rgba(0, 0, 0, 0.4)',
          sidebarColor: 'dark',
          themeBg: 'rgba(201, 208, 251, 1)',
        },
        {
          id: 'theme-color-15',
          darkOrLight: 'light',
          themeHeader: 'rgba(0, 0, 0, 0.4)',
          sidebarColor: 'dark',
          themeBg: 'rgba(221, 243, 255, 1)',
        },
        {
          id: 'theme-color-16',
          darkOrLight: 'light',
          themeHeader: 'rgba(0, 0, 0, 0.4)',
          sidebarColor: 'dark',
          themeBg: 'rgba(240, 240, 240, 1)',
        },
      ],
    }
  },
  computed: {
    colors() {
      return [...this.darkColors, ...this.lightColors]
    },
  },
  created() {
    const initUserTheme = this.getTheme() || this.getMediaPreference()
    this.setTheme(initUserTheme)
    this.currentTheme = initUserTheme
  },
  methods: {
    getSrcOfTheme(url) {
      const n = url.split('--')[1]
      return new URL(`../assets/another-theme-mini--${n}.jpg`, import.meta.url)
        .href
    },
    setTheme(theme) {
      console.log(theme)
      // if (!theme.themeBg) return
      if (theme.darkOrLight) {
        document.documentElement.className = theme.darkOrLight
      }
      if (theme.themeBgImg) {
        const img = new URL(
          `../assets/${theme.themeBgImg}.jpg`,
          import.meta.url
        ).href
        console.log(img)
        document.body.style.background = `url(${img}`
        document.body.style.backgroundSize = 'cover'
      }
      document.documentElement.style.setProperty(
        `--color-sidebar-text`,
        `var(--color-text-${theme.sidebarColor})`
      )
      document.documentElement.style.setProperty(
        `--color-sidebar-icon`,
        `var(--color-sidebar-icon-${theme.sidebarColor})`
      )
      document.documentElement.style.setProperty(
        `--color-header-bg`,
        theme.themeHeader
      )
      document.documentElement.style.setProperty(
        `--color-background`,
        theme.themeBg
      )
      document.body.style.background = theme.themeBg
      this.currentTheme = theme
      localStorage.setItem('user-theme', JSON.stringify(theme))

      // if (theme.themeBg.includes('#')) {
      //   // document.body.style.background = theme
      //   // const headerBg = `rgba(${this.hexToRgb()}, 0.3)`
      //   // console.log(headerBg)
      //   // document.querySelector('header').style.background = headerBg
      //   // document.documentElement.className = 'light-theme'
      // } else if (theme === 'light-theme' || theme === 'dark-theme') {
      //   document.documentElement.className = theme
      //   document.body.style.background = `var(--color-background)`
      // } else if (theme !== 'light-theme' && theme !== 'dark-theme') {
      //   document.documentElement.className = 'light-theme'
      //   document.documentElement.setAttribute(
      //     'style',
      //     `--color-sidebar-text: var(--color-text-light)`
      //   )
      //   // const img = new URL(`../assets/${theme}.jpg`, import.meta.url).href
      //   // document.body.style.background = `url(${img}`
      //   // document.body.style.backgroundSize = 'cover'
      // }
    },
    getTheme() {
      return JSON.parse(localStorage.getItem('user-theme'))
    },
    getMediaPreference() {
      const hasDarkPreference = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches

      if (hasDarkPreference) return 'dark-theme'
      return 'light-theme'
    },
    hexToRgb(hex) {
      const bigint = parseInt(hex, 16)
      const r = (bigint >> 16) & 255
      const g = (bigint >> 8) & 255
      const b = bigint & 255
      return r + ',' + g + ',' + b
    },
    setLanguage(language) {
      this.$store.commit('setLanguage', language)
    },
  },
}
</script>
<style>
.settings {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1;
  background: var(--color-accent-bg);
  width: 100%;
  box-shadow: 0px -3px 48px rgba(0, 16, 61, 0.28);
  height: 400px;
  color: var(--color-text);
  padding: 26px 20px;
}
.settings__inner {
  position: relative;
  display: flex;
}
.settings__cross {
  position: absolute;
  top: -20px;
  right: -20px;
  width: 30px;
  height: 30px;
  cursor: pointer;
}
.settings__list {
  border-right: 1px solid #dadce0;
  margin-right: 42px;
  min-width: 260px;
}
.settings__item {
  cursor: pointer;
  padding: 10px 16px;
}
.settings__item_active {
  border-radius: 8px;
  background: rgba(0, 16, 61, 0.08);
  font-weight: 700;
}
.settings__main {
  width: 100%;
}
.settings__theme {
}
.theme {
}
.theme__title {
  margin-bottom: 20px;
}
.theme__color-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 20px;
  margin-bottom: 20px;
}
.theme__color {
  position: relative;
  height: 40px;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;
  cursor: pointer;
}
.theme__color_active::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 24px;
  height: 17px;
  z-index: 1;
  background-image: url("data:image/svg+xml,<svg width='24' height='17' viewBox='0 0 24 17' fill='none' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' clip-rule='evenodd' d='M23 1C22 1.49012e-08 20.5 1.49012e-08 19.5 1L9.5 11L4.5 6C3.5 5 2 5 1 6C1.49012e-08 7 1.49012e-08 8.5 1 9.5L7.75 16.25C8.25 16.75 8.75 17 9.5 17C10.25 17 10.75 16.75 11.25 16.25L23 4.5C24 3.5 24 2 23 1V1V1Z' fill='white'/></svg>");
  background-repeat: no-repeat;
}
.theme__color_active::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
}
.theme__another-wrapper {
  display: flex;
  gap: 12px 20px;
}
.theme__another {
  position: relative;
}
.theme__another img {
  display: block;
}
.theme__another_active {
}
.theme__another_active:after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 95, 249, 0.48);
}
.theme__another_active::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 24px;
  height: 17px;
  z-index: 1;
  background-image: url("data:image/svg+xml,<svg width='24' height='17' viewBox='0 0 24 17' fill='none' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' clip-rule='evenodd' d='M23 1C22 1.49012e-08 20.5 1.49012e-08 19.5 1L9.5 11L4.5 6C3.5 5 2 5 1 6C1.49012e-08 7 1.49012e-08 8.5 1 9.5L7.75 16.25C8.25 16.75 8.75 17 9.5 17C10.25 17 10.75 16.75 11.25 16.25L23 4.5C24 3.5 24 2 23 1V1V1Z' fill='white'/></svg>");
  background-repeat: no-repeat;
}
.settings__language {
}
</style>
