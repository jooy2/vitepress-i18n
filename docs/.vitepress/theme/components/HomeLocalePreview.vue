<script setup lang="ts">
import { computed, ref } from 'vue';
import { withI18n } from '../../../../dist/index.js';

const props = withDefaults(
  defineProps<{
    // Language code shown first, usually the language of the page
    initial?: string;
    switcherLabel: string;
    caption: string;
  }>(),
  { initial: 'en' }
);

// Every language code the plugin supports, in the order of the supported languages page
const LANGUAGE_CODES = [
  'en',
  'ko',
  'zhHans',
  'zhHant',
  'ja',
  'es',
  'pt',
  'ru',
  'id',
  'de',
  'fr',
  'vi',
  'it'
];

/*
 * The preview is built from the real output of `withI18n`, so it always shows
 * the strings the package ships. `editLink.pattern` is set because the plugin
 * leaves out the edit link text when no pattern is configured.
 */
const resolved = withI18n(
  { themeConfig: { editLink: { pattern: '#' } } },
  { locales: LANGUAGE_CODES, rootLocale: 'en', searchProvider: 'local' }
) as Record<string, any>;

const previews = LANGUAGE_CODES.map((code) => {
  const localeKey = code === 'en' ? 'root' : code;
  const { label, lang, themeConfig } = resolved.locales[localeKey];
  const { translations } = resolved.themeConfig.search.options.locales[localeKey];

  return {
    code,
    label,
    lang,
    search: translations.button.buttonText,
    menu: themeConfig.sidebarMenuLabel,
    outline: themeConfig.outline.label,
    editLink: themeConfig.editLink.text,
    lastUpdated: themeConfig.lastUpdated.text,
    prev: themeConfig.docFooter.prev,
    next: themeConfig.docFooter.next
  };
});

const current = ref(props.initial);
const active = computed(
  () => previews.find((preview) => preview.code === current.value) ?? previews[0]
);
</script>

<template>
  <figure class="HomeLocalePreview">
    <div class="switcher" role="group" :aria-label="switcherLabel">
      <button
        v-for="preview in previews"
        :key="preview.code"
        type="button"
        class="switcher-button"
        :lang="preview.lang"
        :aria-pressed="preview.code === current"
        @click="current = preview.code"
      >
        {{ preview.label }}
      </button>
    </div>

    <div class="window" :lang="active.lang">
      <div class="window-nav">
        <span class="window-title">My Docs</span>
        <span class="window-search">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <mark>{{ active.search }}</mark>
        </span>
      </div>

      <div class="window-localnav">
        <span class="window-menu">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h10" />
          </svg>
          <mark>{{ active.menu }}</mark>
        </span>
        <span class="window-outline">
          <mark>{{ active.outline }}</mark>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m9 6 6 6-6 6" />
          </svg>
        </span>
      </div>

      <div class="window-body">
        <div class="skeleton-group" aria-hidden="true">
          <span class="skeleton skeleton-heading" />
          <span class="skeleton" />
          <span class="skeleton" />
          <span class="skeleton skeleton-short" />
        </div>

        <div class="window-meta">
          <span class="window-edit">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 20h4L19 9l-4-4L4 16v4Z" />
            </svg>
            <mark>{{ active.editLink }}</mark>
          </span>
          <span class="window-updated">
            <mark>{{ active.lastUpdated }}</mark>
            <span class="skeleton skeleton-date" aria-hidden="true" />
          </span>
        </div>

        <div class="window-pager">
          <span class="window-pager-link">
            <mark>{{ active.prev }}</mark>
            <span class="skeleton skeleton-link" aria-hidden="true" />
          </span>
          <span class="window-pager-link next">
            <mark>{{ active.next }}</mark>
            <span class="skeleton skeleton-link" aria-hidden="true" />
          </span>
        </div>
      </div>
    </div>

    <figcaption>
      <span class="legend" aria-hidden="true" />
      {{ caption }}
    </figcaption>
  </figure>
</template>

<style scoped>
.HomeLocalePreview {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 0;
}

.switcher {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.switcher-button {
  min-height: 32px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 4px 12px;
  background-color: var(--vp-c-bg);
  font-size: 13px;
  font-weight: 500;
  line-height: 22px;
  color: var(--vp-c-text-2);
  transition:
    color 0.25s,
    border-color 0.25s,
    background-color 0.25s;
}

.switcher-button:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-text-1);
}

.switcher-button:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.switcher-button[aria-pressed='true'] {
  border-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.window {
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg);
  box-shadow: var(--vp-shadow-2);
  font-size: 13px;
  line-height: 20px;
  color: var(--vp-c-text-2);
}

.window svg {
  flex-shrink: 0;
  width: 14px;
  height: 14px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

mark {
  border-radius: 4px;
  padding: 0 4px;
  background-color: var(--vp-c-brand-soft);
  color: inherit;
}

.window-nav,
.window-localnav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid var(--vp-c-divider);
  padding: 10px 16px;
}

.window-title {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.window-search {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  padding: 4px 12px 4px 10px;
  background-color: var(--vp-c-bg-alt);
}

.window-localnav {
  padding: 8px 16px;
  font-size: 12px;
}

.window-menu,
.window-outline {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.window-body {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 16px 16px;
}

.skeleton-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.skeleton {
  display: block;
  border-radius: 5px;
  height: 10px;
  background-color: var(--vp-c-default-soft);
}

.skeleton-heading {
  margin-bottom: 4px;
  width: 55%;
  height: 18px;
}

.skeleton-short {
  width: 70%;
}

.window-meta {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 8px 16px;
  font-size: 12px;
}

.window-edit,
.window-updated {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.window-edit {
  color: var(--vp-c-brand-1);
}

.skeleton-date {
  width: 64px;
  height: 8px;
}

.window-pager {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.window-pager-link {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 12px;
  line-height: 18px;
}

.window-pager-link.next {
  align-items: flex-end;
  text-align: right;
}

.skeleton-link {
  width: 72%;
  background-color: var(--vp-c-brand-soft);
}

figcaption {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  line-height: 20px;
  color: var(--vp-c-text-2);
}

.legend {
  flex-shrink: 0;
  border-radius: 4px;
  width: 20px;
  height: 12px;
  background-color: var(--vp-c-brand-soft);
}
</style>
