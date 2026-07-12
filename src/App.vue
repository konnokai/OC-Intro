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

onMounted(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const elements = document.querySelectorAll('[data-reveal]')

  if (reduceMotion || !('IntersectionObserver' in window)) {
    elements.forEach((element) => element.classList.add('is-visible'))
    return
  }

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

  elements.forEach((element) => observer.observe(element))
})

onUnmounted(() => observer?.disconnect())
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
