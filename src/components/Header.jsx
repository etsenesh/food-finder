import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  FaHeart,
  FaGlobeAmericas,
  FaRandom,
  FaSearch,
  FaChevronDown,
} from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { getCategories, getRandomMeal } from "../services/mealApi";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [categories, setCategories] = useState([]);
  const inputRef = useRef(null);
  const searchFormRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [categoriesOpen, setCategoriesOpen] = useState(false);

  useEffect(() => {
    getCategories().then((data) => {
      if (data) setCategories(data.map((cat) => cat.strCategory));
    });
  }, []);

  const isCategoryPage =
    location.pathname === "/" &&
    new URLSearchParams(location.search).has("category");
  const isCountriesPage = location.pathname === "/countries";

  // Close search on click outside
  useEffect(() => {
    if (!showSearch) return;
    function handleClickOutside(event) {
      if (
        searchFormRef.current &&
        !searchFormRef.current.contains(event.target)
      ) {
        setShowSearch(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [showSearch]);

  const handleSearchIconClick = () => {
    setShowSearch((prev) => !prev);
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 100);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    navigate(
      `/?searchType=${searchType}&query=${encodeURIComponent(
        searchInput.trim()
      )}`
    );
    setShowSearch(false);
    setSearchInput("");
  };

  const handleRandomClick = async () => {
    const meal = await getRandomMeal();
    if (meal && meal.idMeal) {
      navigate(`/meal/${meal.idMeal}`);
    } else {
      alert("Could not fetch a random meal. Please try again!");
    }
  };

  const handleCategorySelect = (cat) => {
    setCategoriesOpen(false);
    navigate(`/?category=${encodeURIComponent(cat)}`);
  };

  return (
    <header className="sticky top-0 z-50 bg-bg shadow-lg backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-heading font-bold text-primary"
        >
          <span className="rounded-full bg-[#232323] px-2 py-1 flex items-center">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" fill="#FF7000" />
              <path
                d="M8 12l2 2 4-4"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="ml-1">Foodie Finder</span>
        </Link>
        {/* Nav */}
        <nav className="flex items-center gap-6 text-base font-medium">
          {/* Favorites NavLink */}
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive
                ? "text-primary font-bold border-b-2 border-primary pb-0.5 transition-colors"
                : "hover:text-primary hover:border-b-2 hover:border-primary pb-0.5 transition-colors"
            }
          >
            Favorites
          </NavLink>
          {/* Categories Dropdown with Popover */}
          <Popover open={categoriesOpen} onOpenChange={setCategoriesOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className={`flex items-center gap-1 px-2 py-2 bg-transparent shadow-none hover:bg-[#232323] hover:text-primary transition-colors ${
                  isCategoryPage
                    ? "text-primary font-bold border-b-2 border-primary pb-0.5"
                    : ""
                }`}
                type="button"
              >
                Categories <FaChevronDown className="text-xs mt-0.5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 max-h-72 overflow-y-auto p-0">
              <ul>
                {categories.map((cat) => (
                  <li key={cat}>
                    <Button
                      variant="ghost"
                      className="w-full text-left rounded-none px-4 py-2 font-normal hover:bg-[#232323] hover:text-primary transition-colors"
                      type="button"
                      onClick={() => handleCategorySelect(cat)}
                    >
                      {cat}
                    </Button>
                  </li>
                ))}
              </ul>
            </PopoverContent>
          </Popover>
          {/* Countries NavLink */}
          <NavLink
            to="/countries"
            className={({ isActive }) =>
              isActive
                ? "text-primary font-bold border-b-2 border-primary pb-0.5 transition-colors"
                : "hover:text-primary hover:border-b-2 hover:border-primary pb-0.5 transition-colors"
            }
          >
            Countries
          </NavLink>
          {/* RANDOM BUTTON */}
          <Button
            variant="ghost"
            className="flex items-center gap-1 bg-transparent px-0 hover:bg-[#232323] hover:text-primary transition-colors font-medium shadow-none"
            type="button"
            onClick={handleRandomClick}
            aria-label="Random Meal"
          >
            <FaRandom className="text-base" />
            Random
          </Button>
          {/* Search Icon/Button */}
          <div className="relative flex items-center">
            <Button
              type="button"
              variant="ghost"
              className="p-2 rounded-full hover:bg-[#232323] transition-colors"
              onClick={handleSearchIconClick}
              aria-label="Search"
            >
              <FaSearch className="text-white" />
            </Button>
            {showSearch && (
              <Card
                ref={searchFormRef}
                className="absolute right-0 top-10 bg-card rounded-full shadow-lg flex items-center px-2 py-1 w-[460px] gap-2 z-[100]"
              >
                <FaSearch className="text-text-secondary mr-1" />
                <Input
                  ref={inputRef}
                  type="search"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder={`Search by ${searchType}...`}
                  className="bg-transparent text-text placeholder:text-text-secondary border-none outline-none flex-1"
                  autoFocus
                />
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="rounded-lg bg-[#232323] text-text-secondary px-2 py-1 border-none outline-none text-sm w-36"
                >
                  <option value="name">Name</option>
                  <option value="ingredient">Ingredient</option>
                  <option value="category">Category</option>
                </select>

                <Button
                  type="submit"
                  className="ml-1 bg-primary text-white px-4 py-1 rounded-full font-semibold shadow hover:bg-primary-dark transition"
                  onClick={handleSearchSubmit}
                >
                  Search
                </Button>
              </Card>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
