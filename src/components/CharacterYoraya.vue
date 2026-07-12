<script setup>
import {
  faCakeCandles,
  faFireFlameCurved,
  faRulerVertical,
  faWind,
} from '@fortawesome/free-solid-svg-icons'
import { characters } from '../data/characters'
import yorayaImage from '../assets/characters/yoraya.png'
import yorayaWebp from '../assets/characters/yoraya.webp'

const character = characters.yoraya
</script>

<template>
  <section id="yoraya" class="character-section yoraya-section">
    <div class="character-stage page-width">
      <div class="character-content reveal" data-reveal>
        <p class="character-kana">{{ character.romanized }} / {{ character.kana }}</p>
        <h2>{{ character.name }}</h2>
        <blockquote>{{ character.epithet }}</blockquote>
        <p class="character-intro">{{ character.description }}</p>

        <dl class="character-facts" aria-label="夜綾基本資料">
          <div>
            <dt><FontAwesomeIcon :icon="faFireFlameCurved" /> 種族</dt>
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
            <dt><FontAwesomeIcon :icon="faWind" /> 年歲</dt>
            <dd>{{ character.age }}</dd>
          </div>
        </dl>

        <div class="character-notes">
          <article>
            <h3>夜風之形</h3>
            <p>{{ character.appearance }}</p>
          </article>
          <article>
            <h3>巡界之火</h3>
            <p>{{ character.combat }}</p>
          </article>
        </div>

        <ul class="keyword-row" aria-label="夜綾角色關鍵字">
          <li v-for="keyword in character.keywords" :key="keyword">{{ keyword }}</li>
        </ul>
      </div>

      <div class="character-art reveal" data-reveal>
        <div class="night-ribbons" aria-hidden="true"></div>
        <div class="character-disc" aria-hidden="true"></div>
        <picture>
          <source :srcset="yorayaWebp" type="image/webp" />
          <img
            :src="yorayaImage"
            width="3318"
            height="4231"
            :alt="`${character.title}${character.name}立繪`"
            loading="lazy"
          />
        </picture>
        <span class="vertical-title">{{ character.title }}</span>
      </div>
    </div>
  </section>
</template>
