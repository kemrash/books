<template>
  <section class="favorite-books">
    <div class="container">
      <h1 class="title background-white favorite-books__title">Выбранные книги</h1>
      <BookList v-if="books.length > 0" :data="books" />
      <span class="background-white" v-else>Список пуст</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { IBook } from '@/types/book';
import BookList from '@/components/BookList.vue'
import { getBooks } from '@/api/books';
import { useBooksStatusStore } from '@/stores/books';

const statusList = useBooksStatusStore()
const books = ref<IBook[]>([])

loadBooks()

async function loadBooks(): Promise<void> {
  const responce = await getBooks()

  books.value = responce.filter((book: IBook) => statusList.booksIndex[book.id]?.favorite)
}

watch(statusList.booksIndex, () => {
  books.value = computed(() => books.value.filter((book: IBook) => statusList.booksIndex[book.id]?.favorite)).value
})
</script>

<style scoped>
.favorite-books {
  padding: 15px 0;
}

.favorite-books__title {
  margin-bottom: 15px;
}
</style>
