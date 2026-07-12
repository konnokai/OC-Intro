<script setup>
import { ref } from 'vue'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'

const isOpen = ref(false)

const links = [
  { href: '#world', label: '世界' },
  { href: '#koro', label: '皎朧' },
  { href: '#yoraya', label: '夜綾' },
  { href: '#resonance', label: '雙星' },
  { href: '#guidelines', label: '創作規範' },
]

const close = () => {
  isOpen.value = false
}
</script>

<template>
  <header class="site-nav" :class="{ 'menu-open': isOpen }">
    <a class="brand-mark" href="#top" @click="close">
      <span class="brand-seal">双</span>
      <span class="brand-copy">
        <strong>双星幻夜</strong>
        <small>TWINSTAR FANTASIA</small>
      </span>
    </a>

    <button
      class="menu-toggle"
      type="button"
      :aria-expanded="isOpen"
      aria-controls="primary-navigation"
      :aria-label="isOpen ? '關閉導覽' : '開啟導覽'"
      @click="isOpen = !isOpen"
    >
      <FontAwesomeIcon :icon="isOpen ? faXmark : faBars" />
    </button>

    <nav id="primary-navigation" class="nav-links" aria-label="主要導覽">
      <a v-for="link in links" :key="link.href" :href="link.href" @click="close">
        {{ link.label }}
      </a>
    </nav>
  </header>
</template>
