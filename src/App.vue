<template>
  <HeaderSection />
  <RouterView />
</template>

<script setup lang="ts">
import HeaderSection from '@/components/HeaderSection.vue'
import { RouterView } from 'vue-router';
</script>

<style scoped></style>
