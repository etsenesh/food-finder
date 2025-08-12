import { useEffect, useState } from "react";
import { getFavorites } from "../services/favorites";
import MealCard from "../components/MealCard";
import { Card } from "../components/ui/card";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  return (
    <div className="min-h-screen bg-[#181818]">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-primary font-heading">
          My Favorite Meals
        </h1>

        {favorites.length === 0 ? (
          <Card className="p-10 text-center text-muted-foreground bg-card/80 max-w-lg mx-auto">
            <p className="text-lg font-medium">No favorites yet.</p>
            <p className="mt-2 text-base">Browse and add meals to see them here!</p>
          </Card>
        ) : (
          <Card className="p-6 bg-card/80">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {favorites.map((meal) => (
                <MealCard key={meal.idMeal} meal={meal} />
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

export default Favorites;
