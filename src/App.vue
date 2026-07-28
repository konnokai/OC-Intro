<script setup>
import { onMounted, onUnmounted } from 'vue'
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

onMounted(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const mainContent = document.querySelector('#main-content')

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
  observer?.disconnect()
  revealMutationObserver?.disconnect()
})
</script>

<template>
  <div class="site-shell">
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
