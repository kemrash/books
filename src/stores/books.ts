import { defineStore } from 'pinia'
import type { IStatus } from '@/types/book'
import { ref } from 'vue'

export const useBooksStatusStore = defineStore(
  'statusList',
  () => {
    const booksIndex = ref<Record<number, IStatus>>({})

    function addStatus(bookStatus: IStatus): void {
      if (booksIndex.value[bookStatus.id]) {
        bookStatus.status
          ? (booksIndex.value[bookStatus.id].status = bookStatus.status)
          : (booksIndex.value[bookStatus.id].favorite = bookStatus.favorite)
      } else {
        booksIndex.value[bookStatus.id] = bookStatus
      }
    }

    function removeFromFavorite(id: number): void {
      if (booksIndex.value[id]) {
        booksIndex.value[id].status
          ? (booksIndex.value[id].favorite = false)
          : delete booksIndex.value[id]
      }
    }

    return {
      booksIndex,
      addStatus,
      removeFromFavorite
    }
  },
  { persist: true }
)
