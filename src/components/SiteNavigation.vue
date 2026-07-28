<script setup>
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'

const isOpen = ref(false)
const isMobile = ref(false)
const menuToggle = ref(null)
let mobileQuery

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

const closeAndRestoreFocus = async () => {
  close()
  await nextTick()
  menuToggle.value?.focus()
}

const handleKeydown = (event) => {
  if (event.key === 'Escape' && isOpen.value) closeAndRestoreFocus()
}

const syncMobileState = () => {
  isMobile.value = mobileQuery.matches
  if (!isMobile.value) close()
}

onMounted(() => {
  mobileQuery = window.matchMedia('(max-width: 900px)')
  syncMobileState()
  mobileQuery.addEventListener('change', syncMobileState)
})

onUnmounted(() => mobileQuery?.removeEventListener('change', syncMobileState))
</script>

<template>
  <header class="site-nav" :class="{ 'menu-open': isOpen }" @keydown="handleKeydown">
    <a class="brand-mark" href="#top" @click="close">
      <span class="brand-seal">双</span>
      <span class="brand-copy">
        <strong>双星幻夜</strong>
        <small>TWINSTAR FANTASIA</small>
      </span>
    </a>

    <button
      ref="menuToggle"
      class="menu-toggle"
      type="button"
      :aria-expanded="isOpen"
      aria-controls="primary-navigation"
      :aria-label="isOpen ? '關閉導覽' : '開啟導覽'"
      @click="isOpen = !isOpen"
    >
      <FontAwesomeIcon :icon="isOpen ? faXmark : faBars" />
    </button>

    <nav
      id="primary-navigation"
      class="nav-links"
      aria-label="主要導覽"
      :aria-hidden="isMobile && !isOpen ? 'true' : undefined"
      :inert="isMobile && !isOpen"
    >
      <a v-for="link in links" :key="link.href" :href="link.href" @click="close">
        {{ link.label }}
      </a>
    </nav>
  </header>
</template>
