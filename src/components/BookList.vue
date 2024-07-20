<template>
  <ul class="list-reset books" v-if="!isNotSearchResult">
    <BooksItem :class="'books__item'" v-for="book in books" :key="book.id" :book="book" />
  </ul>
  <span class="background-white" v-else>По вашему запросу ничего не найдено</span>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { IBook } from '@/types/book';
import BooksItem from '@/components/BooksItem.vue'
import { useSearchStore } from '@/stores/search';
import { useFilterStore } from '@/stores/filter';
import { useBooksStatusStore } from '@/stores/books';

const searchStore = useSearchStore()
const filterStore = useFilterStore()
const statusList = useBooksStatusStore()
const prop = defineProps<{ data: IBook[] }>()
const books = ref<IBook[]>([])
const isNotSearchResult = ref(false)

watch([
  () => searchStore.search,
  () => filterStore.favoriteStatus,
  () => filterStore.readStatus,
  () => filterStore.finishStatus,
  statusList.booksIndex
], () => {
  let searchAndFilters = prop.data.filter((el) => {
    return el.title.toLowerCase().includes(searchStore.search.toLowerCase())
  })

  if (filterStore.favoriteStatus || filterStore.readStatus || filterStore.finishStatus) {
    searchAndFilters = computed(() => searchAndFilters.filter(book => filterStore.favoriteStatus && statusList.booksIndex[book.id]?.favorite === true ||
      filterStore.readStatus && statusList.booksIndex[book.id]?.status === 'read' ||
      filterStore.finishStatus && statusList.booksIndex[book.id]?.status === 'finish')).value
  }

  isNotSearchResult.value = !searchAndFilters.length

  books.value = searchAndFilters
}, { immediate: true })
</script>

<style scoped>
.books {
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
}

.books__item {
  width: calc((100% - (2 * 25px)) / 3);
}

@media (max-width: 1400px) {
  .books__item {
    width: calc((100% - (1 * 25px)) / 2);
  }
}

@media (max-width: 1000px) {
  .books__item {
    width: 100%;
  }
}
</style>
