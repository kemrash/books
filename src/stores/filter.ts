import type { ICounter } from '@/types/counter'
import { defineStore } from 'pinia'

export const useFilterStore = defineStore('filterStore', {
  state: () => ({
    favoriteStatus: false,
    readStatus: false,
    finishStatus: false
  }),

  actions: {
    setStatus(name: ICounter, status: boolean): void {
      switch (name) {
        case 'favorites':
          this.favoriteStatus = status
          break

        case 'read':
          this.readStatus = status
          break

        case 'finish':
          this.finishStatus = status
          break
      }
    },
    resetFilter(): void {
      this.favoriteStatus = false
      this.readStatus = false
      this.finishStatus = false
    }
  },
  persist: true
})
