import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MealCard from "../components/MealCard";
import axios from "axios";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [meals, setMeals] = useState([]);
  const navigate = useNavigate();
  const query = useQuery();
  const area = query.get("area");

  // Fetch countries once
  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
      .then((res) => {
        setCountries(res.data.meals || []);
      });
  }, []);

  // Fetch meals whenever area (country) changes in URL
  useEffect(() => {
    if (area) {
      axios
        .get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?a=${encodeURIComponent(area)}`
        )
        .then((res) => {
          setMeals(res.data.meals || []);
        });
    } else {
      setMeals([]);
    }
  }, [area]);

  const handleCountryClick = (area) => {
    navigate(`/countries?area=${encodeURIComponent(area)}`);
  };

  return (
    <div className="min-h-screen bg-[#181818]">
      <div className="max-w-6xl mx-auto py-10 px-4">
        <h2 className="text-3xl font-bold mb-8 text-primary font-heading">
          Browse Meals by Country
        </h2>

        {/* Countries List */}
        <Card className="mb-10 bg-card/80 p-6 flex flex-wrap gap-4 shadow-lg">
          {countries.map((country) => (
            <Button
              key={country.strArea}
              onClick={() => handleCountryClick(country.strArea)}
              variant={area === country.strArea ? "default" : "ghost"}
              className={`rounded-full px-6 py-2 text-base font-semibold
                transition-colors
                ${
                  area === country.strArea
                    ? "bg-primary text-white shadow"
                    : "bg-card text-white hover:bg-primary hover:text-background"
                }
              `}
            >
              {country.strArea}
            </Button>
          ))}
        </Card>

        {/* Meals */}
        {area && (
          <>
            <h3 className="text-2xl font-semibold mb-4 mt-8 text-white font-heading">
              {area} Meals
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {meals.length > 0 ? (
                meals.map((meal) => <MealCard key={meal.idMeal} meal={meal} />)
              ) : (
                <p className="col-span-full text-center text-muted-foreground italic">
                  No meals found for this country.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Countries;
