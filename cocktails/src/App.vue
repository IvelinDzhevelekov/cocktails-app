<script setup>
import { ref, onMounted } from 'vue'
const cocktails = ref(null)
onMounted(async() => {
  const apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink'
  const response = await fetch(apiUrl) 
  cocktails.value = await response.json()
  console.log(cocktails.value.drinks)
  cocktails.value = cocktails.value.drinks.map(drink => {
    return {
      name:drink.strDrink,
      image:drink.strDrinkThumb
    }
  } );
})
</script>

<template>
  <h1 class = "centre" >Cocktails</h1>
  <div class = "row" v-if="cocktails">
      <div v-for="cocktail in cocktails" class="card col-md-4 m-2" style="width: 18rem;">
          <a href=""><img class="card-img-top" :src=cocktail.image alt="Card image cap"></a>
          <div class="card-body">
          <h5 class="card-title">{{cocktail.name}}</h5>
          </div>
        </div>
  </div>
</template>

<style>

</style>
