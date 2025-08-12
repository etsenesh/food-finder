import { useState } from "react";
import { Input } from "./ui/input";
import { Card } from "./ui/card";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto px-4 py-2">
      <Card className="w-full bg-card p-0 shadow-none">
        <Input
          type="search"
          placeholder="Search for meals..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-card text-foreground placeholder:text-muted-foreground border-none rounded-full px-5 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
        />
      </Card>
    </form>
  );
};

export default SearchBar;
