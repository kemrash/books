<template>
  <li>
    <article class="book">
      <img class="book__img" :src="book.cover_image" :alt="book.description">
      <div class="book__wrap">
        <h2 class="title title_small book__title">{{ book.title }}</h2>
        <div class="book__iner">
          <span class="book__author">{{ book.author }}</span>
          <time class="book__date"> {{ book.publication_year }}</time>
        </div>
        <span class="book__desc">{{ book.description }}</span>
        <div class="button-wrap">
          <button class="btn-reset btn book__btn" :disabled="isAuthorizedComputed ? false : true"
            @click="onClickFavorite">
            {{
              !isFavorite ?
                'Планирую прочесть'
                : 'Удалить из избранного'
            }}
          </button>
          <button class="btn-reset btn book__btn" :disabled="isAuthAndBookStatusFinishComputed ? false : true"
            @click="onClickChangeStatus">
            {{ bookStatusTextComputed }}
          </button>
        </div>
      </div>
    </article>
  </li>
</template>

<script setup lang="ts">
import { useBooksStatusStore } from '@/stores/books';
import { useUserStore } from '@/stores/user';
import type { IBook } from '@/types/book';
import { computed, ref } from 'vue';

const prop = defineProps<{ book: IBook }>()
const statusList = useBooksStatusStore()
const user = useUserStore()
const isFavorite = ref<boolean | undefined>(statusList.booksIndex[prop.book.id]?.favorite)
const isAuthorizedComputed = computed(() => user.isAuthorized)

const bookStatusTextComputed = computed(() => {
  if (!statusList.booksIndex[prop.book.id]?.status) {
    return "Читаю"
  }

  return 'Прочитал'
})

const isAuthAndBookStatusFinishComputed = computed(() => !(!isAuthorizedComputed.value || statusList.booksIndex[prop.book.id]?.status === 'finish'))


function onClickFavorite(): void {
  isFavorite.value = !isFavorite.value
  if (isFavorite.value) {
    statusList.addStatus({ id: prop.book.id, favorite: true })
  } else {
    statusList.removeFromFavorite(prop.book.id)
  }
}

function onClickChangeStatus(): void {
  if (!statusList.booksIndex[prop.book.id]?.status) {
    statusList.addStatus({ id: prop.book.id, status: 'read' })

    return
  }

  if (statusList.booksIndex[prop.book.id]?.status === 'read') {
    statusList.addStatus({ id: prop.book.id, status: 'finish' })

    return
  }
}
</script>

<style scoped>
.book {
  display: flex;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  box-shadow: 0 0 8px rgba(0, 0, 0, .25);
  background-color: var(--white-10);
  overflow: hidden;
}

.book__img {
  width: 200px;
  object-fit: contain;
}

.book__wrap {
  display: flex;
  flex-direction: column;
  padding: 15px;
}

.book__title {
  margin-bottom: 10px;
}

.book__iner {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 20px;
  margin-bottom: 5px;
}

.book__desc {
  margin-bottom: auto;
  padding-bottom: 10px;
}

.book__btn {
  align-self: start;
}

.button-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

@media (max-width: 580px) {
  .book {
    flex-direction: column;
  }

  .book__img {
    width: 100%;
    max-height: 300px;
    object-fit: cover;
  }
}
</style>
