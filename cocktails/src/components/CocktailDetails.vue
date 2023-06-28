<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps(['id']);

const cocktail = ref(null);

onMounted(async () => {
    console.log(props.id); // this should log the id passed as prop
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${props.id}`;
    const response = await fetch(url);
    const data = await response.json();
    const responseDrink = data.drinks[0]
    console.log(data)
    const ingredients = Object
        .entries(responseDrink)
        .filter(([key, value]) => key.startsWith('strIngredient')&& value !== null)
        .map(([key, value]) =>  {
            const number = key.replace('strIngredient', '');
            const measure = responseDrink[`strMeasure${number}`]
            if(measure === null){
                return value
            }
            return `${measure} ${value}`
        });
    cocktail.value = {
        ingredients,
        name: responseDrink.strDrink,
        glass: responseDrink.strGlass,
        description: responseDrink.strInstructions,
        category: responseDrink.strCategory,
        image: responseDrink.strDrinkThumb,

    }
});
</script>

<template>
    <div v-if="cocktail">
        <h1 class="text-center">{{ cocktail.name }}</h1>
        <img id="image" :src="cocktail.image" class="position-absolute">
        <h5 id="listHead" class="text-center">Ingredients</h5>
        <ul id="ingredients" class="list-group">
            <li class="list-group-item" v-for="ingredient in cocktail.ingredients">
                    {{ingredient}}
            </li>
        </ul>
        <h5 class="text-center">Instructions</h5>
        <p id="des" class="border rounded">{{ cocktail.description }}</p>
    </div>
    
</template>

<style>
#image{
    margin-top: 3pc;
    margin-left: 3pc;
    width: 20pc;
    height: 20pc;
    border-radius: 2pc;
}
#ingredients{
    margin-left: 39pc;
    margin-top: 1pc;
    margin-right: 20pc;
}
#listHead{
    margin-top: 4pc;
}
#des{
    margin-left: 39pc;
    width: 27pc;
}
</style>