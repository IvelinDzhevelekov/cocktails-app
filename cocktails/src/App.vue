<script setup>
import { ref, computed } from 'vue'
import CocktailsList from './components/CocktailsList.vue';
import HelloWorld from './components/HelloWorld.vue';

const routes = {
  '/': CocktailsList
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || HelloWorld
})
</script>

<template>
  <component :is="currentView" />
</template>