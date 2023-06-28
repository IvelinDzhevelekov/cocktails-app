<script>
    import { ref, onMounted } from 'vue'
    import { defineProps } from 'vue';
    onMounted(async() => {
        const props = defineProps(['id']);
        console.log(props)
        const routeArgs = window.location.href.split('/')
        const cocktailId = routeArgs[routeArgs.length - 1]
        const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + cocktailId
        const response = await fetch(url)
        console.log(response)
    })
</script>



<template>

</template>