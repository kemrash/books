import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useBooksStatusStore } from './books'

export const useCountersStore = defineStore(
  'counters',
  () => {
    const statusList = useBooksStatusStore()

    const countersComputed = computed(() => {
      let favorites = 0
      let read = 0
      let finish = 0

      for (const key in statusList.booksIndex) {
        if (statusList.booksIndex[key].favorite) {
          favorites++
        }

        if (statusList.booksIndex[key].status === 'read') {
          read++
        }

        if (statusList.booksIndex[key].status === 'finish') {
          finish++
        }
      }

      return { favorites, read, finish }
    })

    return {
      countersComputed
    }
  },
  { persist: true }
)
