<script setup>
import { storyBeats } from '../data/characters'
</script>

<template>
  <section id="story" class="story-section section-pad">
    <div class="page-width">
      <header class="story-heading reveal" data-reveal>
        <span class="section-number">03</span>
        <h2>星降之谷</h2>
        <p>不是命運安排她們相遇，而是兩人都沒有對異變視而不見。</p>
      </header>

      <ol class="story-path">
        <li v-for="beat in storyBeats" :key="beat.index" class="reveal" data-reveal>
          <span>{{ beat.index }}</span>
          <div>
            <h3>{{ beat.title }}</h3>
            <p>{{ beat.text }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>
