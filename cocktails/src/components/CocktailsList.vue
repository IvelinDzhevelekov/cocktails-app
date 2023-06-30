<script setup>
    import { ref, onMounted } from 'vue'
    import { fetchCocktails } from '../http/cocktails' 

    const cocktails = ref(null)

    onMounted(async() => {
        const result = await fetchCocktails('Ordinary_Drink')
        cocktails.value = result
    });
</script>

<template>
    <h1 class="text-center">Cocktails</h1>
    <div class="row justify-content-center" v-if="cocktails">
        <div v-for="cocktail in cocktails" class="card col-md-2 m-4">
            <router-link :to="{ name: 'Detail', params: { id: cocktail.id } }">
                <img class="card-img-top" :src="cocktail.image" alt="Card image cap">
            </router-link>
            <div class="card-body">
                <h5 class="text-center card-title">{{cocktail.name}}</h5>
            </div>
        </div>
    </div>
</template>

<style>
div{
    overflow-x: hidden;
}
</style>