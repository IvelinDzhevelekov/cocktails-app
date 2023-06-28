export async function fetchCocktails(category) {
    //TODO: add try-catch block for error handling
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`
    const response = await fetch(url) 
    const data = await response.json()
    const cocktails = data.drinks.map(drink => {
        return {
            id: drink.idDrink,
            name: drink.strDrink,
            image: drink.strDrinkThumb,
        }
    })
    return cocktails
}