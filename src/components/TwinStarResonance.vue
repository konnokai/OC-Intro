<script setup>
import { ref } from 'vue'
import { faLink, faStar } from '@fortawesome/free-solid-svg-icons'

const active = ref(false)
</script>

<template>
  <section id="resonance" class="resonance-section" :class="{ active }">
    <div class="resonance-visual" aria-hidden="true">
      <span class="energy energy-moon"></span>
      <span class="energy energy-night"></span>
      <span class="resonance-star"><FontAwesomeIcon :icon="faStar" /></span>
    </div>

    <div class="resonance-copy reveal" data-reveal>
      <p class="resonance-index">TWIN STAR PHENOMENON / 02</p>
      <hgroup class="resonance-heading">
        <p class="resonance-lead">靠近彼此時</p>
        <h2>
          <span>靈力不再</span>
          <span>只是相加</span>
        </h2>
      </hgroup>
      <p>
        月之息與夜之息形成長老院無法解釋的共鳴。皎朧的結界更加穩固，夜綾則能聽見更遠處的世界脈動。
      </p>
      <button type="button" :aria-pressed="active" @click="active = !active">
        <FontAwesomeIcon :icon="faLink" />
        {{ active ? '解除共鳴' : '啟動雙星共鳴' }}
      </button>
    </div>
  </section>
</template>
