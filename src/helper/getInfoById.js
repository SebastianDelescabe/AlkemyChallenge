import axios from 'axios';
const API_KEY = process.env.REACT_APP_API_KEY;

export const getInfoById = async (id) => {
    const dataById = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&includeNutrition=false`);
    const usableDataById = dataById.data;
    return usableDataById
}