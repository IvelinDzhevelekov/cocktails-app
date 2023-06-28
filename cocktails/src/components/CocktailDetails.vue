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

    }
});
</script>

<template>
    <div v-if="cocktail">
        <h1>{{ cocktail.name }}</h1>
        <ul>
            <li v-for="ingredient in cocktail.ingredients">
                    {{ingredient}}
            </li>
        </ul>
    </div>
</template>