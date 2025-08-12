import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CategoryTabs = ({ categories, selectedCategory, onSelect }) => {
  return (
    <div className="py-4 px-2">
      <Tabs value={selectedCategory} onValueChange={onSelect}>
        <TabsList className="flex flex-wrap gap-2 bg-primary/10 rounded-full p-1">
          {categories.map((cat) => (
            <TabsTrigger
              key={cat}
              value={cat}
              className="px-5 py-2 rounded-full font-medium data-[state=active]:bg-primary data-[state=active]:text-white transition-colors"
            >
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default CategoryTabs;
