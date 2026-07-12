<script setup>
import { faMoon, faShieldHalved, faStar } from '@fortawesome/free-solid-svg-icons'
</script>

<template>
  <section id="world" class="world-section section-pad">
    <div class="world-grid page-width">
      <div class="world-heading reveal" data-reveal>
        <span class="section-number">01</span>
        <h2>裂縫另一側<br />是尚未沉睡的夜</h2>
      </div>

      <div class="world-prose reveal" data-reveal>
        <p class="lead-copy">
          幻月界的邊境正在崩解。月之息與夜之息失去平衡，上古夜禍的低語穿過星降之谷，再次觸及現世。
        </p>
        <p>
          月族派出最銳利的守界者，夜狐族則循著萬物呼吸追索異變。兩條本不該交會的路，在一次墜落與一次援手之間重疊。
        </p>
      </div>

      <div class="world-signs reveal" data-reveal>
        <article>
          <FontAwesomeIcon :icon="faMoon" />
          <span>月之息</span>
          <p>凝聚、斬擊、結界</p>
        </article>
        <article>
          <FontAwesomeIcon :icon="faShieldHalved" />
          <span>守界者</span>
          <p>巡查世界邊境</p>
        </article>
        <article>
          <FontAwesomeIcon :icon="faStar" />
          <span>雙星現象</span>
          <p>無法解釋的共鳴</p>
        </article>
      </div>
    </div>
  </section>
</template>
