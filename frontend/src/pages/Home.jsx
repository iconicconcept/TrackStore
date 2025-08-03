import React, { useEffect } from "react";
import CategoryItems from "../components/CategoryItems";
import {useProductStore} from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";

const Home = () => {
  const { fetchFeaturedProducts, products, isLoading } = useProductStore();

	useEffect(() => {
		fetchFeaturedProducts();
	}, [fetchFeaturedProducts]);

  const categories = [
    { href: "/T-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
    { href: "/Jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
    { href: "/Shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
    { href: "/Jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
    { href: "/Glasses", name: "Glasses", imageUrl: "/glasses.png" },
    { href: "/Bags", name: "Bags", imageUrl: "/bags.jpg" },
    { href: "/Suits", name: "Suits", imageUrl: "/suits.jpg" },
  ];

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h1 className="text-center text-3xl sm:text-3xl font-bold text-emerald-400 mb-4">
          Explore Our Categories
        </h1>
        <p className="text-center text-sm text-gray-300 mb-12">
          Rock your outings with the latest fashions
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <CategoryItems category={category} key={category.name} />
          ))}
        </div>

        {!isLoading && products.length > 0 && (
          <FeaturedProducts featuredProducts={products} />
        )}
      </div>
    </div>
  );
};

export default Home;
