<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import logo from './assets/icon/logo.webp'
import SiteNavigation from './components/SiteNavigation.vue'
import HeroBoundary from './components/HeroBoundary.vue'
import WorldIntroduction from './components/WorldIntroduction.vue'
import CharacterKoro from './components/CharacterKoro.vue'
import CharacterYoraya from './components/CharacterYoraya.vue'
import TwinStarResonance from './components/TwinStarResonance.vue'
import EncounterStory from './components/EncounterStory.vue'
import CreationGuidelines from './components/CreationGuidelines.vue'

let observer
let revealMutationObserver
let minimumIntroTimer

const introProgress = ref(0)
const introPhase = ref('loading')

const waitForImage = (image, onSettled) =>
  new Promise((resolve) => {
    const done = () => {
      image.removeEventListener('load', done)
      image.removeEventListener('error', done)
      onSettled()
      resolve()
    }

    if (image.complete) {
      done()
      return
    }

    image.addEventListener('load', done, { once: true })
    image.addEventListener('error', done, { once: true })
  })

const loadPageImages = async () => {
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))

  const images = [...document.images]
  let settled = 0

  if (!images.length) {
    introProgress.value = 100
    return
  }

  images.forEach((image) => {
    image.loading = 'eager'
  })

  await Promise.all(
    images.map((image) =>
      waitForImage(image, () => {
        settled += 1
        introProgress.value = Math.round((settled / images.length) * 100)
      }),
    ),
  )
}

const finishIntro = () => {
  introPhase.value = 'ready'
  document.body.classList.remove('intro-active')
}

const startIntro = async (reduceMotion) => {
  document.body.classList.add('intro-active')

  const minimumDisplay = reduceMotion
    ? Promise.resolve()
    : new Promise((resolve) => {
        minimumIntroTimer = window.setTimeout(resolve, 800)
      })

  await Promise.all([loadPageImages(), minimumDisplay])
  introProgress.value = 100

  if (reduceMotion) {
    finishIntro()
    return
  }

  requestAnimationFrame(() => {
    introPhase.value = 'entering'
  })
}

onMounted(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const mainContent = document.querySelector('#main-content')

  startIntro(reduceMotion)

  const observeRevealElement = (element) => {
    if (element.classList.contains('is-visible')) return

    if (reduceMotion || !observer) {
      element.classList.add('is-visible')
      return
    }

    observer.observe(element)
  }

  const observeRevealElements = (root) => {
    if (!(root instanceof Element)) return

    if (root.matches('[data-reveal]')) observeRevealElement(root)
    root.querySelectorAll('[data-reveal]').forEach(observeRevealElement)
  }

  if (!reduceMotion && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.18 },
    )
  }

  observeRevealElements(mainContent)

  // Vue HMR can replace template classes without remounting App.
  revealMutationObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes') {
        const wasVisible = mutation.oldValue?.split(/\s+/).includes('is-visible')

        if (
          wasVisible &&
          mutation.target.matches('[data-reveal]') &&
          !mutation.target.classList.contains('is-visible')
        ) {
          mutation.target.classList.add('is-visible')
          return
        }

        observeRevealElements(mutation.target)
        return
      }

      mutation.addedNodes.forEach(observeRevealElements)
    })
  })

  revealMutationObserver.observe(mainContent, {
    attributes: true,
    attributeOldValue: true,
    attributeFilter: ['class'],
    childList: true,
    subtree: true,
  })
})

onUnmounted(() => {
  window.clearTimeout(minimumIntroTimer)
  document.body.classList.remove('intro-active')
  observer?.disconnect()
  revealMutationObserver?.disconnect()
})
</script>

<template>
  <div
    v-if="introPhase !== 'ready'"
    class="intro-screen"
    :class="{ 'is-entering': introPhase === 'entering' }"
    @animationend.self="finishIntro"
  >
    <div class="intro-torii-layer" aria-hidden="true">
      <svg
        class="intro-torii"
        viewBox="0 0 600 700"
        role="presentation"
      >
        <defs>
          <linearGradient id="intro-torii-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#e57586" />
            <stop offset="0.42" stop-color="#a83248" />
            <stop offset="1" stop-color="#3c385f" />
          </linearGradient>
        </defs>
        <circle class="intro-torii-moon" cx="300" cy="350" r="248" />
        <g class="intro-torii-frame">
          <path d="M45 104 Q300 58 555 104 L535 139 Q300 108 65 139 Z" />
          <path d="M92 158 H508 L490 196 H110 Z" />
          <path d="M142 190 H207 L188 654 H126 Z" />
          <path d="M393 190 H458 L474 654 H412 Z" />
          <path d="M188 226 H412 V254 H188 Z" />
        </g>
        <path class="intro-torii-seal" d="M272 156 H328 V211 H272 Z" />
      </svg>
    </div>

    <div class="intro-content">
      <img
        class="intro-logo"
        :src="logo"
        alt="双星幻夜"
        width="256"
        height="233"
        loading="eager"
      />
      <div
        class="intro-progress"
        role="progressbar"
        aria-label="網站資源載入進度"
        aria-valuemin="0"
        aria-valuemax="100"
        :aria-valuenow="introProgress"
        :style="{ '--intro-progress': introProgress / 100 }"
      >
        <span aria-hidden="true"></span>
      </div>
      <output class="intro-progress-value" aria-live="polite">
        {{ String(introProgress).padStart(2, '0') }}<small>%</small>
      </output>
    </div>
  </div>

  <div
    class="site-shell"
    :class="{ 'intro-pending': introPhase === 'loading' }"
    :inert="introPhase !== 'ready'"
    :aria-busy="introPhase !== 'ready'"
  >
    <a class="skip-link" href="#main-content">跳至主要內容</a>
    <SiteNavigation />
    <main id="main-content">
      <HeroBoundary />
      <WorldIntroduction />
      <CharacterKoro />
      <CharacterYoraya />
      <TwinStarResonance />
      <EncounterStory />
      <CreationGuidelines />
    </main>
  </div>
</template>
