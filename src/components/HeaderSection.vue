<template>
  <header class="header">
    <div class="container header__container">
      <NavList class="header__nav" />
      <FormFilter class="header__form" :isAuthorized="isAuthorizedComputed" />
      <button class="btn-reset btn header__btn" @click="onClick">{{ isAuthorizedComputed ? 'Выйти' : 'Войти' }}</button>
    </div>
  </header>
</template>

<script setup lang="ts">
import NavList from '@/components/NavList.vue'
import FormFilter from '@/components/FormFilter.vue'
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import { useFilterStore } from '@/stores/filter';

const user = useUserStore()
const filterStore = useFilterStore()
const router = useRouter()
const isAuthorizedComputed = computed(() => user.isAuthorized)

function onClick() {
  user.isAuthorized = !user.isAuthorized

  if (!user.isAuthorized) {
    filterStore.resetFilter()
    router.push({ name: 'all' })
  }
}
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  padding: 15px 0;
  border-radius: 0 0 5px 5px;
  width: 100%;
  background-color: var(--white-20);
  z-index: 1;
}

.header__container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  align-items: start;
  gap: 10px;
}

.header__nav,
.header__form,
.header__btn {
  grid-column: span 4;
}

.header__btn {
  justify-self: end;
}

@media (max-width: 1000px) {

  .header__nav {
    grid-column: span 9;
  }

  .header__form {
    grid-column: span 12;
    order: 1;
  }

  .header__btn {
    grid-column: span 3;
  }
}

@media (max-width: 425px) {
  .header {
    position: unset;
  }
}
</style>
