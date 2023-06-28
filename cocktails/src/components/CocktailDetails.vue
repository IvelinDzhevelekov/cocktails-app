<script>
    import { ref, onMounted } from 'vue'
    const cocktailId = "13581"
    const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + cocktailId
    onMounted(async() => {
        const response = await fetch(url)
        console.log(response)
    })
</script>



<template>

</template>