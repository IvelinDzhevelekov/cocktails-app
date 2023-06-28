import { createRouter, createWebHistory } from 'vue-router';
import CocktailsList from '../components/CocktailsList.vue';
import CocktailDetails from '../components/CocktailDetails.vue';

const routes = [
  {
    path: '/',
    name: 'CoctailsList',
    component: CocktailsList,
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: CocktailDetails,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;