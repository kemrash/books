import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSearchStore = defineStore(
  'searchStore',
  () => {
    const search = ref<string>('')

    function setSerch(text: string): void {
      search.value = text
    }

    return {
      search,
      setSerch
    }
  },
  { persist: true }
)
