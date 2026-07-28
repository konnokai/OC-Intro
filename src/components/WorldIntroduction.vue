<script setup>
import { faMoon, faStar, faWind } from '@fortawesome/free-solid-svg-icons'
</script>

<template>
  <section id="world" class="world-section section-pad">
    <div class="world-grid page-width">
      <div class="world-heading reveal" data-reveal>
        <span class="section-number">01</span>
        <h2>光影失衡之處<br />裂縫仍在擴大</h2>
      </div>

      <div class="world-prose reveal" data-reveal>
        <p class="lead-copy">
          幻月界位於凡人世界與靈界的夾縫，萬物由月之息與夜之息交織而成。兩股力量本無善惡，真正帶來災厄的，是光影失衡後出現的闇獸，以及封印於永夜神殿的上古夜禍。
        </p>
        <p>
          如今世界邊界逐漸薄弱，闇獸侵襲也愈加頻繁。皎朧奉命前往邊境加固守界結界，夜綾則循著異常的夜之息深入星降之谷，兩人的調查最終在谷底交會。
        </p>
      </div>

      <div class="world-signs reveal" data-reveal>
        <article>
          <FontAwesomeIcon :icon="faMoon" />
          <span>月之息</span>
          <p>秩序、淨化、守護</p>
        </article>
        <article>
          <FontAwesomeIcon :icon="faWind" />
          <span>夜之息</span>
          <p>流動、變化、再生</p>
        </article>
        <article>
          <FontAwesomeIcon :icon="faStar" />
          <span>雙星現象</span>
          <p>月與夜彼此呼應</p>
        </article>
      </div>
    </div>
  </section>
</template>
