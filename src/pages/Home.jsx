import { useEffect, useState } from "react";
import {
  searchMeals,
  searchMealsByIngredient,
  getCategories,
  getMealsByCategory,
  getRandomMeal,
} from "../services/mealApi";
import MealCard from "../components/MealCard";
import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";

const Home = () => {
  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  // Helper for query string
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();

  // Fetch categories once on mount (optional, can be used elsewhere)
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data ? data.map((cat) => cat.strCategory) : []);
    };
    fetchCategories();
  }, []);

  // Fetch meals based on searchType, query, or category
  useEffect(() => {
    const searchType = query.get("searchType");
    const searchQuery = query.get("query");
    const categoryFromURL = query.get("category") || "";

    setSelectedCategory(categoryFromURL);

    const fetchMeals = async () => {
      let data = [];

      if (searchType && searchQuery) {
        if (searchType === "name") {
          data = await searchMeals(searchQuery);
        } else if (searchType === "ingredient") {
          data = await searchMealsByIngredient(searchQuery);
        } else if (searchType === "category") {
          data = await getMealsByCategory(searchQuery);
        }
      } else if (categoryFromURL) {
        data = await getMealsByCategory(categoryFromURL);
      } else {
        data = await searchMeals("chicken");
      }
      setMeals(Array.isArray(data) ? data : []);
    };

    fetchMeals();
  }, [query]);

  // Surprise Me! Button Handler
  const handleSurpriseMe = async () => {
    const meal = await getRandomMeal();
    if (meal && meal.idMeal) {
      navigate(`/meal/${meal.idMeal}`);
    } else {
      alert("Could not fetch a random meal. Please try again!");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="w-full max-w-5xl mx-auto pt-10 pb-6 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-2 text-center">
          <span className="text-primary">88</span>{" "}
          <span className="text-white">All-Time Best Dinner</span>
          <br />
          <span className="text-white">
            Recipes to <span className="text-primary">Savor</span>
          </span>
        </h1>
        <p className="mt-3 mb-7 text-lg text-text-secondary max-w-2xl text-center">
          Exceptional dishes hand-picked by chefs. Browse inspiration or search
          for your next dinner favorite.
        </p>
        <Button
          asChild
          className="bg-primary text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-primary-dark transition transform hover:scale-105 text-lg"
        >
          <a href="#meals">See Recipes</a>
        </Button>
      </section>

      {/* Featured Image */}
      <div className="w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-lg mb-10">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80"
          alt="Featured dinner"
          className="w-full h-[320px] object-cover"
        />
      </div>

      {/* Main Content */}
      <div id="meals" className="max-w-6xl mx-auto space-y-8">
        {/* Info Cards Section */}
        <div className="flex flex-col md:flex-row gap-6 justify-center mb-4">
          {/* Recipes Card */}
          <Card className="flex-1 bg-gradient-to-br from-yellow-100 to-yellow-50 border border-yellow-300 rounded-xl p-6 flex flex-col items-center shadow-md min-w-[220px]">
            <span className="text-3xl mb-2 text-[#e09b00]">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="#e09b00"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M12 8v4l3 2"
                  stroke="#e09b00"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <div className="font-heading font-bold text-lg text-[#b86a00] mb-1">
              1000+ Recipes
            </div>
            <div className="text-sm text-[#b86a00] opacity-80">
              From around the world
            </div>
          </Card>
          {/* Countries Card */}
          <Card className="flex-1 bg-gradient-to-br from-orange-100 to-orange-50 border border-orange-200 rounded-xl p-6 flex flex-col items-center shadow-md min-w-[220px]">
            <span className="text-3xl mb-2 text-[#e07b00]">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="#e07b00"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M12 7a5 5 0 0 1 0 10a5 5 0 0 1 0-10z"
                  stroke="#e07b00"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <div className="font-heading font-bold text-lg text-[#b85c00] mb-1">
              25+ Countries
            </div>
            <div className="text-sm text-[#b85c00] opacity-80">
              International cuisine
            </div>
          </Card>
          {/* Step-by-step Card */}
          <Card className="flex-1 bg-gradient-to-br from-red-100 to-red-50 border border-red-200 rounded-xl p-6 flex flex-col items-center shadow-md min-w-[220px]">
            <span className="text-3xl mb-2 text-[#e03c00]">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="#e03c00"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M12 8v4l2 2"
                  stroke="#e03c00"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="6"
                  stroke="#e03c00"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </span>
            <div className="font-heading font-bold text-lg text-[#b82a00] mb-1">
              Step-by-step
            </div>
            <div className="text-sm text-[#b82a00] opacity-80">
              Detailed instructions
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center mb-6">
          <Button
            type="button"
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-2 rounded-md shadow hover:bg-primary-dark transition"
            onClick={handleSurpriseMe}
          >
            <span role="img" aria-label="Surprise">
              🍽️
            </span>{" "}
            Surprise Me!
          </Button>
          <Button
            asChild
            variant="outline"
            className="inline-flex items-center gap-2 border border-primary text-primary font-semibold px-6 py-2 rounded-md bg-transparent hover:bg-primary hover:text-white transition"
          >
            <a href="/favorites">
              <span role="img" aria-label="Favorites">
                ⭐
              </span>{" "}
              My Favorites
            </a>
          </Button>
        </div>

        {/* Meal Cards Grid */}
        <Card className="p-6 bg-card/80">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-4">
            {meals.length > 0 ? (
              meals.map((meal) => <MealCard key={meal.idMeal} meal={meal} />)
            ) : (
              <p className="col-span-full text-center text-muted-foreground italic">
                No meals found.
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Home;
