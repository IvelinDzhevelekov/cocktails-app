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
        <ul id="ingredients" class="list-group position-absolute">
            <li class="list-group-item" v-for="ingredient in cocktail.ingredients">
                    {{ingredient}}
            </li>
        </ul>
        <h5 id="ins" class="text-center position-absolute">Instructions</h5>
        <p id="des" class="border rounded position-absolute">{{ cocktail.description }}</p>
        <div id="cat" class="card position-absolute" style="width: 18rem;">
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Category: {{ cocktail.category }}</li>
                <li class="list-group-item">Glass: {{ cocktail.glass }}</li>
            </ul>
        </div>
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
    margin-top: 0pc;
    margin-right: 20pc;
}
#listHead{
    margin-top: 4pc;
}
#des{
    margin-left: 39pc;
    width: 27pc;
    margin-top: 25pc;
}
#cat{
    margin-left: 3pc;
    margin-top: 19pc;
}
#ins{
    margin-top: 23pc;
    margin-left: 39pc;
}
</style>