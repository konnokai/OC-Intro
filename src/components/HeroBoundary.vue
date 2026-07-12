<script setup>
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
</script>

<template>
  <section id="top" class="hero-section" aria-labelledby="hero-title">
    <div class="hero-visual">
      <img
        class="hero-art"
        src="../assets/background/Fanhua.webp"
        alt="皎朧與夜綾並坐在滿月、燈籠與櫻花映照的和風夜景中"
        width="2000"
        height="1125"
        fetchpriority="high"
        decoding="async"
      />
    </div>

    <div class="hero-copy">
      <div class="hero-heading">
        <p class="eyebrow">月龍守界者 × 夜狐巡界者</p>
        <h1 id="hero-title">
          <span>月與夜</span>
          <em>跨越界線</em>
        </h1>
      </div>

      <div class="hero-details">
        <p class="hero-lead">當世界裂縫低語，兩顆異色的星選擇並肩而行。</p>
        <a class="hero-cta" href="#world">
          進入幻月界
          <FontAwesomeIcon :icon="faArrowDown" />
        </a>
      </div>
    </div>

    <p class="hero-signature" aria-hidden="true">
      <span>皎朧</span>
      <b><i>双</i></b>
      <span>夜綾</span>
    </p>
  </section>
</template>
