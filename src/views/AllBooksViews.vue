<template>
  <section class="all-books">
    <div class="container">
      <h1 class="title background-white all-books__title">Cписок всех книг</h1>
      <BookList v-if="books.length > 0" :data="books" />
      <span class="background-white" v-else>Загрузка данных...</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { IBook } from '@/types/book';
import BookList from '@/components/BookList.vue'
import { getBooks } from '@/api/books';
import { ref } from 'vue';


const books = ref<IBook[]>([])

async function loadBooks(): Promise<void> {
  books.value = await getBooks()
}

loadBooks()
</script>

<style scoped>
.all-books {
  padding: 15px 0;
}

.all-books__title {
  margin-bottom: 15px;
}
</style>
