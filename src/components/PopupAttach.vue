<template>
  <div class="popup-atcach" @click.stop @mouseenter="mouseOnPopup">
    <div
      v-for="(attach, i) in attaches.img"
      class="popup-attach__item"
      @mouseenter="showFullAttach(attach)"
    >
      <img class="popup-atcach__img" :src="url(attach)" alt="" />
      <span class="popup-atcach__name"
        >{{ `image_${i}.jpeg` }} {{ getSizeOfDoc(attach.size) }}</span
      >
    </div>
    <div
      v-if="currentAttach"
      class="popup-atcach__full-image full-image"
      @mouseleave="closeFullImage"
    >
      <!-- @mouseleave="$emit('closePopup')" -->
      <div class="full-image__inner">
        <img class="full-image__img" :src="currentAttach" />
        <span @click="downloadImage" class="full-image__text">
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.15081 6.87563C4.73148 6.51621 4.10018 6.56477 3.74076 6.9841C3.38134 7.40342 3.4299 8.03472 3.84923 8.39414L8.00002 11.952L12.1508 8.39414C12.5701 8.03472 12.6187 7.40342 12.2593 6.9841C11.8999 6.56477 11.2686 6.51621 10.8492 6.87563L9.00002 8.46067V2.63489C9.00002 2.0826 8.5523 1.63489 8.00002 1.63489C7.44773 1.63489 7.00002 2.0826 7.00002 2.63489V8.46067L5.15081 6.87563ZM2 13.6349C1.44772 13.6349 1 14.0826 1 14.6349C1 15.1872 1.44772 15.6349 2 15.6349H14C14.5523 15.6349 15 15.1872 15 14.6349C15 14.0826 14.5523 13.6349 14 13.6349H2Z"
              fill="#ffffff"
            />
          </svg>
          <span>{{ $t('download') }}</span>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: { attaches: Object },
  data() {
    return {
      currentAttach: null,
      timer: null,
      timer2: null,
    }
  },
  mounted() {},
  methods: {
    url(attach) {
      return window.URL.createObjectURL(attach)
    },
    getSizeOfDoc(imagesCount) {
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
    showFullAttach(attach) {
      clearTimeout(this.timer)
      this.timer2 = setTimeout(() => {
        this.currentAttach = null
      }, 3000)
      this.currentAttach = this.url(attach)
    },
    downloadImage() {
      const link = document.createElement('a')
      link.href = this.currentAttach
      link.download = `1.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    closeFullImage() {
      this.currentAttach = null
      this.timer = setTimeout(() => {
        this.$emit('closePopup')
      }, 2000)
    },
    mouseOnPopup() {
      clearTimeout(this.timer)
      clearTimeout(this.timer2)
    },
  },
}
</script>

<style>
.popup-atcach {
  position: absolute;
  right: 95px;
  z-index: 100;
  top: 0;
  background: var(--color-background);
  border-radius: 12px;
  padding: var(--unit) 0;
  box-shadow: 0 4px 32px rgb(0 16 61 / 0.24);
}
.popup-attach__item {
  padding: 0 var(--unit);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.popup-attach__item:hover {
  background: var(--color-hover);
}
.popup-attach__item:not(:last-child) {
  margin-bottom: 8px;
}
.popup-atcach__img {
  object-fit: cover;
  height: 32px;
  width: 32px;
  margin-right: 8px;
  border-radius: 4px;
}
.full-image {
  position: absolute;
  padding: 4px;
  right: 205px;
  top: 0px;
  background: var(--color-background);
  box-shadow: 0 4px 32px rgb(0 16 61 / 0.24);
  border-radius: 12px;
}
.full-image:hover .full-image__text {
  display: flex;
}
.full-image__inner {
  position: relative;
}
.full-image__img {
  height: 100%;
  display: block;
  width: 256px;
  object-fit: contain;
  border-radius: 12px;
}
.full-image__text {
  display: none;
  align-items: center;
  position: absolute;
  width: 100%;
  bottom: 10px;
  color: #fff;
  justify-content: center;
  cursor: pointer;
  padding: 10px 0;
  background: rgb(44 44 45 / 0.5);
}
.full-image__text svg {
  margin-right: 8px;
}
</style>
