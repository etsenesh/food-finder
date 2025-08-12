import { Link } from "react-router-dom";
import { FaArrowRight, FaHeart, FaRegHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { addFavorite, removeFavorite, isFavorite } from "../services/favorites";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

const MealCard = ({ meal }) => {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(isFavorite(meal.idMeal));
  }, [meal]);

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) {
      removeFavorite(meal.idMeal);
    } else {
      addFavorite(meal);
    }
    setFavorite(!favorite);
  };

  return (
    <Card
      className="relative block rounded-2xl shadow-xl overflow-hidden transition-transform duration-300 hover:scale-105 group bg-card cursor-pointer"
      style={{ minHeight: 260 }}
    >
      {/* Favorite Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-3 right-3 z-10 text-red-500 bg-white rounded-full shadow hover:bg-red-100 transition"
        onClick={handleFavorite}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? <FaHeart /> : <FaRegHeart />}
      </Button>

      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full h-56 object-cover"
      />

      {/* Overlay */}
      <div className="absolute bottom-0 left-0 w-full flex items-center justify-between px-5 py-4 backdrop-blur-sm bg-white/10 rounded-t-2xl rounded-b-2xl">
        <span className="text-white font-heading text-base font-semibold max-w-[80%] truncate">
          {meal.strMeal}
        </span>
        <span className="ml-2 flex-shrink-0">
          <Link
            to={`/meal/${meal.idMeal}`}
            aria-label="Go to meal details"
            tabIndex={0}
            className="focus:outline-none"
          >
            <span className="w-8 h-8 rounded-full bg-primary hover:bg-primary-dark flex items-center justify-center transition-colors">
              <FaArrowRight className="text-white text-lg" />
            </span>
          </Link>
        </span>
      </div>
    </Card>
  );
};

export default MealCard;
