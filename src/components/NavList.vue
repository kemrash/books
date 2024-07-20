<template>
  <nav class="nav">
    <ul class="list-reset nav__list">
      <li class="nav__item">
        <RouterLink class="nav__link" :to="{ name: 'all' }">
          Cписок всех книг
        </RouterLink>
      </li>
      <li class="nav__item" v-if="isAuthorizedComputed">
        <RouterLink class="nav__link" :to="{ name: 'selected' }">
          Выбранные книги
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { computed } from 'vue';

const user = useUserStore()
const isAuthorizedComputed = computed(() => user.isAuthorized)
</script>

<style scoped>
.nav__list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.nav__link {
  outline: none;
  color: var(--tenn);
  transition: color .3s ease-in-out;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.nav__link:focus-visible {
  color: var(--blue);
}

.nav__link:active:not(:focus-visible) {
  color: var(--red-beech);
}

@media (any-hover: hover) {
  .nav__link:hover:not(:focus-visible):not(:active) {
    color: var(--blue);
  }
}
</style>
