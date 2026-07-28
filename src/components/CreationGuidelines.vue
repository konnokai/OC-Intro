<script setup>
import { nextTick, onUnmounted, ref } from 'vue'
import {
  faBookOpen,
  faEnvelope,
  faHashtag,
  faShieldHalved,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'

const isGuidelinesOpen = ref(false)
const closeButton = ref(null)
let triggerElement
let appElement
let previousBodyOverflow = ''

const openGuidelines = async (event) => {
  triggerElement = event.currentTarget
  appElement = document.querySelector('#app')
  previousBodyOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  appElement?.setAttribute('inert', '')
  isGuidelinesOpen.value = true
  await nextTick()
  closeButton.value?.focus()
}

const closeGuidelines = async () => {
  isGuidelinesOpen.value = false
  document.body.style.overflow = previousBodyOverflow
  appElement?.removeAttribute('inert')
  await nextTick()
  triggerElement?.focus()
}

const handleDialogKeydown = (event) => {
  if (event.key === 'Escape') {
    closeGuidelines()
    return
  }

  if (event.key !== 'Tab') return

  const focusableElements = [...event.currentTarget.querySelectorAll('a[href], button:not([disabled])')]
  if (!focusableElements.length) return

  const firstElement = focusableElements[0]
  const lastElement = focusableElements.at(-1)

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault()
    lastElement.focus()
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault()
    firstElement.focus()
  }
}

onUnmounted(() => {
  document.body.style.overflow = previousBodyOverflow
  appElement?.removeAttribute('inert')
})
</script>

<template>
  <section id="guidelines" class="guidelines-section section-pad">
    <div class="page-width">
      <header class="guidelines-title reveal" data-reveal>
        <span class="section-number">04</span>
        <div class="guidelines-heading-copy">
          <h2>讓創作延伸<br />也讓界線被尊重</h2>
        </div>
        <button
          type="button"
          class="notion-link"
          aria-haspopup="dialog"
          @click="openGuidelines"
        >
          查看完整二創規範
          <FontAwesomeIcon :icon="faBookOpen" />
        </button>
      </header>

      <div class="guidelines-content reveal" data-reveal>
        <article class="rule-panel">
          <header>
            <FontAwesomeIcon :icon="faShieldHalved" />
            <div>
              <span>BOUNDARY 01</span>
              <h3>重要界線</h3>
            </div>
          </header>
          <ul>
            <li>一般非商用二創可直接發布；R18 可創作，但禁止 R18-G。</li>
            <li>商用、周邊販售或未列明用途，請先聯絡孤之界確認。</li>
            <li>禁止任何 AI 創作、模型訓練或將作品用於 AI 應用。</li>
            <li>禁止皎朧龍角損毀、破壞角色形象與誤導為官方立場。</li>
          </ul>
        </article>

        <article class="tag-panel">
          <header>
            <FontAwesomeIcon :icon="faHashtag" />
            <div>
              <span>CREATION TAGS 02</span>
              <h3>創作標籤</h3>
            </div>
          </header>
          <dl>
            <div>
              <dt>召喚 / Live Tag</dt>
              <dd>綾朧來跨麥</dd>
            </div>
            <div>
              <dt>二創 Tag</dt>
              <dd>綾朧有致</dd>
            </div>
          </dl>
        </article>

        <address class="contact-panel">
          <header>
            <FontAwesomeIcon :icon="faEnvelope" />
            <div>
              <span>CONTACT 03</span>
              <h3>聯絡孤之界</h3>
            </div>
          </header>
          <div class="contact-routes">
            <a href="mailto:contact@konnokai.me">contact@konnokai.me</a>
            <p>Discord / konnokai</p>
            <a href="https://x.com/Kon_no_kai" rel="noreferrer" target="_blank">X / @Kon_no_kai</a>
          </div>
        </address>
      </div>
    </div>

    <footer class="site-footer page-width">
      <p class="footer-brand">双星幻夜 / TwinStar Fantasia</p>
      <div class="footer-credits">
        <p>Character design & illustration: 九櫻 @9saki_000</p>
        <p>Hero background: 凡椛落盡 @fanhua37</p>
        <p>Copyright: 孤之界 @Kon_no_kai</p>
      </div>
    </footer>

    <Teleport to="body">
      <Transition name="guidelines-modal">
        <div
          v-if="isGuidelinesOpen"
          class="guidelines-modal-backdrop"
          @click.self="closeGuidelines"
        >
          <section
            class="guidelines-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="guidelines-modal-title"
            aria-describedby="guidelines-modal-intro"
            @keydown="handleDialogKeydown"
          >
            <header class="guidelines-modal-header">
              <div>
                <span>CREATION GUIDELINES</span>
                <h2 id="guidelines-modal-title">双星幻夜 二次創作規範</h2>
              </div>
              <button
                ref="closeButton"
                type="button"
                class="guidelines-modal-close"
                aria-label="關閉二次創作規範"
                @click="closeGuidelines"
              >
                <FontAwesomeIcon :icon="faXmark" />
              </button>
            </header>

            <div class="guidelines-modal-content">
              <p id="guidelines-modal-intro" class="guidelines-modal-intro">
                先依用途確認是否需要聯絡，再閱讀完整條款。R18 可創作，但禁止 R18-G。
              </p>

              <section class="guidelines-decision" aria-labelledby="guidelines-decision-title">
                <header>
                  <div>
                    <span>QUICK CHECK</span>
                    <h3 id="guidelines-decision-title">先確認這次創作屬於哪一類</h3>
                  </div>
                  <time datetime="2026-07-08">規範版本 2026.07.08</time>
                </header>

                <div class="guidelines-decision-grid">
                  <article class="guidelines-decision-item guidelines-decision-item--allowed">
                    <h4>可直接創作</h4>
                    <p>一般非商用二創與自己手工製作、僅供個人收藏的作品可直接進行；R18 可創作，但禁止 R18-G。</p>
                  </article>

                  <article class="guidelines-decision-item guidelines-decision-item--contact">
                    <h4>需先詢問</h4>
                    <p>商業使用、販售、委託廠商製作實體周邊，以及規範未列明或用途不確定的情況。</p>
                  </article>

                  <article class="guidelines-decision-item guidelines-decision-item--blocked">
                    <h4>禁止內容</h4>
                    <p>AI 相關使用、皎朧龍角損毀、懷孕、禿頭、R18-G，以及仇恨、歧視、極端宣傳、違法或破壞角色形象的內容。</p>
                  </article>
                </div>

                <div class="guidelines-decision-contact">
                  <p>用途不明時，先聯絡孤之界確認。</p>
                </div>
                <p class="guidelines-decision-note">以上摘要協助快速判斷，完整條款仍以下方內容為準。</p>
              </section>

              <section class="guidelines-modal-section guidelines-modal-section--warning" aria-labelledby="full-prohibitions-title">
                <h3 id="full-prohibitions-title">完整禁止內容</h3>
                <div class="guidelines-prohibition-grid">
                  <article>
                    <h4>角色與成人內容</h4>
                    <ul>
                      <li>「皎朧」龍角損毀相關創作，包括但不限於折角、磨角、拆角等。</li>
                      <li>懷孕相關創作。</li>
                      <li>禿頭相關創作。</li>
                      <li>R18-G 相關創作。</li>
                    </ul>
                  </article>
                  <article>
                    <h4>AI 與官方身分</h4>
                    <ul>
                      <li>使用 AI 進行任何創作或模型訓練，包括但不限於圖片、聲音等；可以使用 Adobe Illustrator。</li>
                      <li>將我方作品用於 AI 應用。</li>
                      <li>聲稱為官方作品，或將創作誤導為我方立場。</li>
                    </ul>
                  </article>
                  <article>
                    <h4>危害與其他情況</h4>
                    <ul>
                      <li>仇恨言論、歧視、極端政治或宗教宣傳。</li>
                      <li>違反法律或破壞角色形象之內容。</li>
                      <li>尚未提及之處以我方認定為準。</li>
                    </ul>
                  </article>
                </div>
              </section>

              <div class="guidelines-modal-grid">
                <article class="guidelines-modal-section">
                  <h3>作品使用與推廣</h3>
                  <ul>
                    <li>二創作品可能基於推廣用途使用於直播或社群平台上，使用時會標註作者。</li>
                    <li>若有製作周邊的需求，會另行與作者聯繫。</li>
                  </ul>
                </article>

                <article class="guidelines-modal-section">
                  <h3>商用或周邊販售</h3>
                  <ul>
                    <li>需先向孤之界告知並取得確認。</li>
                    <li>委託廠商製作實體周邊時，需先取得確認並與廠商簽約。</li>
                    <li>自己手工製作且僅供個人收藏，不需事前告知。</li>
                    <li>有任何疑慮請向本人詢問。</li>
                  </ul>
                </article>
              </div>

              <article class="guidelines-modal-section">
                <h3>創作相關標籤</h3>
                <dl class="guidelines-modal-tags">
                  <div><dt>召喚 / Live Tag</dt><dd>綾朧來跨麥</dd></div>
                  <div><dt>二創 Tag</dt><dd>綾朧有致</dd></div>
                  <div><dt>R18 Tag</dt><dd>舔濕慾綾朧</dd></div>
                </dl>
                <p>也可以直接於 X 標記本人帳號 @Kon_no_kai，或將作品發佈於 Discord 群內。</p>
              </article>

              <article class="guidelines-modal-section guidelines-modal-contact">
                <div>
                  <h3>聯絡孤之界</h3>
                  <p>推薦聯絡方式依序為 Discord、Email、X。</p>
                </div>
                <address>
                  <span>Discord / konnokai</span>
                  <a href="mailto:contact@konnokai.me">Email / contact@konnokai.me</a>
                  <a href="https://x.com/Kon_no_kai" rel="noreferrer" target="_blank">X / @Kon_no_kai</a>
                </address>
              </article>

              <p class="guidelines-modal-note">
                孤之界保留隨時修改本規範之權利，若有未盡事宜則以本人解釋為準。
              </p>
            </div>
          </section>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>
