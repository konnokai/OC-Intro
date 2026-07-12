<script setup>
import {
  faCakeCandles,
  faDragon,
  faMoon,
  faRulerVertical,
} from '@fortawesome/free-solid-svg-icons'
import { characters } from '../data/characters'
import koroImage from '../assets/characters/koro.png'
import koroWebp from '../assets/characters/koro.webp'

const character = characters.koro
</script>

<template>
  <section id="koro" class="character-section koro-section">
    <div class="character-stage page-width">
      <div class="character-art reveal" data-reveal>
        <div class="bamboo-shadow" aria-hidden="true"></div>
        <div class="character-disc" aria-hidden="true"></div>
        <picture>
          <source :srcset="koroWebp" type="image/webp" />
          <img
            :src="koroImage"
            width="3318"
            height="4231"
            :alt="`${character.title}${character.name}立繪`"
            loading="lazy"
          />
        </picture>
        <span class="vertical-title">{{ character.title }}</span>
      </div>

      <div class="character-content reveal" data-reveal>
        <p class="character-kana">{{ character.romanized }} / {{ character.kana }}</p>
        <h2>{{ character.name }}</h2>
        <blockquote>{{ character.epithet }}</blockquote>
        <p class="character-intro">{{ character.description }}</p>

        <dl class="character-facts" aria-label="皎朧基本資料">
          <div>
            <dt><FontAwesomeIcon :icon="faDragon" /> 種族</dt>
            <dd>{{ character.race }}</dd>
          </div>
          <div>
            <dt><FontAwesomeIcon :icon="faRulerVertical" /> 身高</dt>
            <dd>{{ character.height }}</dd>
          </div>
          <div>
            <dt><FontAwesomeIcon :icon="faCakeCandles" /> 生日</dt>
            <dd>{{ character.birthday }}</dd>
          </div>
          <div>
            <dt><FontAwesomeIcon :icon="faMoon" /> 年歲</dt>
            <dd>{{ character.age }}</dd>
          </div>
        </dl>

        <div class="character-notes">
          <article>
            <h3>月色之形</h3>
            <p>{{ character.appearance }}</p>
          </article>
          <article>
            <h3>守界之刃</h3>
            <p>{{ character.combat }}</p>
          </article>
        </div>

        <ul class="keyword-row" aria-label="皎朧角色關鍵字">
          <li v-for="keyword in character.keywords" :key="keyword">{{ keyword }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>
