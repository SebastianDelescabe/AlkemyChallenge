import axios from "axios";
const API_KEY = process.env.REACT_APP_API_KEY;

export const searchRecipes = async (string) => {
    const recipes = await axios.get(`https://api.spoonacular.com/recipes/complexSearch/?apiKey=${API_KEY}&query=${string}`)
    const recipesSlice = recipes.data.results.slice(0, 8)
    return recipesSlice
}