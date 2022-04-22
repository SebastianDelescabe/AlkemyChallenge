import axios from 'axios';
const API_KEY = process.env.REACT_APP_API_KEY;

export const getInfo = async () => {
    const vegetarianMenu = await axios.get(`https://api.spoonacular.com/recipes/complexSearch/?apiKey=${API_KEY}&diet=vegetarian&number=2&addRecipeInformation=true`);
    const meatMenu = await axios.get(`https://api.spoonacular.com/recipes/complexSearch/?apiKey=${API_KEY}&includeIngredients=meat&number=2&addRecipeInformation=true`);
    const allData = vegetarianMenu.data.results.concat(meatMenu.data.results);
    const usableData = allData.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        vegetarian: recipe.vegetarian,
        healthScore: recipe.healthScore,
        pricePerServing: recipe.pricePerServing,
        readyInMinutes: recipe.readyInMinutes,
      }
    })
    return usableData
  }