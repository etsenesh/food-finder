import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMealDetails } from "../services/mealApi";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";

const MealDetail = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    getMealDetails(id).then(setMeal);
  }, [id]);

  if (!meal)
    return (
      <p className="text-center text-muted-foreground py-10 italic">Loading...</p>
    );

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <Card className="max-w-4xl mx-auto bg-card p-6 rounded-2xl shadow-card space-y-6">
        {/* Meal Image */}
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-auto object-cover rounded-xl shadow-md"
        />

        {/* Title & Meta */}
        <div>
          <h1 className="text-3xl font-heading text-foreground font-semibold mb-1">
            {meal.strMeal}
          </h1>
          <p className="text-accent font-medium">
            {meal.strArea} &middot; {meal.strCategory}
          </p>
        </div>

        {/* Instructions */}
        <div>
          <h2 className="text-xl font-heading text-foreground font-semibold mb-2">
            Instructions
          </h2>
          <p className="text-foreground whitespace-pre-line leading-relaxed opacity-90">
            {meal.strInstructions}
          </p>
        </div>

        {/* YouTube Button */}
        {meal.strYoutube && (
          <Button
            asChild
            className="inline-flex gap-2 bg-primary text-white px-6 py-3 rounded-full font-medium shadow-lg hover:bg-primary-dark transition transform hover:scale-105"
          >
            <a
              href={meal.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
            >
              ▶️ Watch Recipe on YouTube
            </a>
          </Button>
        )}
      </Card>
    </div>
  );
};

export default MealDetail;
