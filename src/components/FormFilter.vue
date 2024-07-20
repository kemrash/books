<template>
  <form class="form">
    <label class="form__label" novalidate>
      <input class="form__input" type="search" name="search" placeholder="Поиск по названию" :value="searchStore.search"
        @input="searchInput">
    </label>
    <div class="form__inner" v-if="isAuthorized">
      <label class="form__label-checkbox">
        <input class="form__checkbox" type="checkbox" name="favorites" :checked="filterStore.favoriteStatus"
          @change="checkboxChange">
        <span class="text form__desc">
          Планирую прочесть: {{ counters.countersComputed.favorites }}
        </span>
      </label>
      <label class="form__label-checkbox">
        <input class="form__checkbox" type="checkbox" name="read" :checked="filterStore.readStatus"
          @change="checkboxChange">
        <span class="text form__desc">
          Читаю: {{ counters.countersComputed.read }}
        </span>
      </label>
      <label class="form__label-checkbox">
        <input class="form__checkbox" type="checkbox" name="finish" :checked="filterStore.finishStatus"
          @change="checkboxChange">
        <span class="text form__desc">
          Прочитал: {{ counters.countersComputed.finish }}
        </span>
      </label>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useCountersStore } from '@/stores/counters'
import { useFilterStore } from '@/stores/filter';
import { useSearchStore } from '@/stores/search';

const counters = useCountersStore()
const searchStore = useSearchStore()
const filterStore = useFilterStore()

defineProps<{ isAuthorized: boolean }>()

function searchInput(e: any): void {
  searchStore.setSerch(e.target.value.trim())
}

function checkboxChange(e: any): void {
  filterStore.setStatus(e.target.name, e.target.checked)
}
</script>

<style scoped>
.form__input {
  padding: 0 10px;
  border: 1px solid var(--silver);
  border-radius: 5px;
  outline: none;
  width: 100%;
  height: 30px;
  transition: border-color .3s ease-in-out;
}

.form__input:focus {
  border-color: var(--blue);
}

.form__inner {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px 0;
}

.form__label-checkbox {
  user-select: none;
  cursor: pointer;
}

.form__checkbox {
  outline: 1px solid transparent;
  outline-offset: 1px;
  transition: outline-color .3s ease-in-out;
}

.form__checkbox:focus-visible {
  outline-color: var(--blue);
}

.form__checkbox:focus-visible+.form__desc {
  color: var(--blue);
}

.form__checkbox:active:not(:focus-visible)+.form__desc {
  color: var(--red-beech);
}

.form__desc {
  transition: color .3s ease-in-out;
}

@media (any-hover: hover) {
  .form__checkbox:hover:not(:focus-visible):not(:active)+.form__desc {
    color: var(--blue);
  }
}
</style>
