import axios from 'axios';

const API_BASE = 'https://www.themealdb.com/api/json/v1/1';

/**
 * Search meals by name.
 * @param {string} query
 * @returns {Promise<Array|null>}
 */
export const searchMeals = async (query) => {
  try {
    const { data } = await axios.get(`${API_BASE}/search.php?s=${query}`);
    return data.meals;
  } catch (error) {
    console.error('Error searching meals:', error);
    return null;
  }
};

/**
 * Search meals by ingredient.
 * @param {string} ingredient
 * @returns {Promise<Array|null>}
 */
export const searchMealsByIngredient = async (ingredient) => {
  try {
    const { data } = await axios.get(`${API_BASE}/filter.php?i=${ingredient}`);
    return data.meals;
  } catch (error) {
    console.error('Error searching meals by ingredient:', error);
    return null;
  }
};

/**
 * Get detailed info for a specific meal by ID.
 * @param {string} id
 * @returns {Promise<Object|null>}
 */
export const getMealDetails = async (id) => {
  try {
    const { data } = await axios.get(`${API_BASE}/lookup.php?i=${id}`);
    return data.meals?.[0] || null;
  } catch (error) {
    console.error('Error fetching meal details:', error);
    return null;
  }
};

/**
 * Get meals by category.
 * @param {string} category
 * @returns {Promise<Array|null>}
 */
export const getMealsByCategory = async (category) => {
  try {
    const { data } = await axios.get(`${API_BASE}/filter.php?c=${category}`);
    return data.meals;
  } catch (error) {
    console.error('Error fetching meals by category:', error);
    return null;
  }
};

/**
 * Get meals by area (country/region).
 * @param {string} area
 * @returns {Promise<Array|null>}
 */
export const getMealsByArea = async (area) => {
  try {
    const { data } = await axios.get(`${API_BASE}/filter.php?a=${area}`);
    return data.meals;
  } catch (error) {
    console.error('Error fetching meals by area:', error);
    return null;
  }
};

/**
 * Get a random meal.
 * @returns {Promise<Object|null>}
 */
export const getRandomMeal = async () => {
  try {
    const { data } = await axios.get(`${API_BASE}/random.php`);
    return data.meals?.[0] || null;
  } catch (error) {
    console.error('Error fetching random meal:', error);
    return null;
  }
};

/**
 * Get all meal categories.
 * @returns {Promise<Array|null>}
 */
export const getCategories = async () => {
  try {
    const { data } = await axios.get(`${API_BASE}/categories.php`);
    return data.categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return null;
  }
};
