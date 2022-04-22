
export const handleTotalPrice = (menuRecipes) => {
    const priceMenu = menuRecipes && menuRecipes.map((recipe) => recipe.pricePerServing).reduce((a, b) => a + b, 0);
    return Math.round(priceMenu)
}

export const handleRedyIn = (menuRecipes) => {
    const allMinutes = menuRecipes && menuRecipes.map((recipe) => recipe.readyInMinutes).reduce((a, b) => a + b, 0);
    return Math.round(allMinutes)
}

export const handleHealtScore = (menuRecipes) => {
    const healtScore = menuRecipes && menuRecipes.map((recipe) => recipe.healthScore).reduce((a, b) => a + b, 0);
    const mediaHealtScore = (healtScore / menuRecipes.length)
    if (isNaN(mediaHealtScore)) {
        return '0'
    } else {
        return Math.round(mediaHealtScore);
    }
}