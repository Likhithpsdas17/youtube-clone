import "./Filters.css";

function Filters({ selectedCategory, setSelectedCategory }) {
  const categories = [
    "All",
    "React",
    "Travel",
    "Movies",
    "Trading",
    "Bikes"
  ];

  return (
    <div className="filters">
      {categories.map((category) => (
        <button
          key={category}
          className={
            selectedCategory === category
              ? "active"
              : ""
          }
          onClick={() =>
            setSelectedCategory(category)
          }
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default Filters;