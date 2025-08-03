import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axiosInstance from "../lib/axios";
import Loading from "./Loading";

const TrendingProducts = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await axiosInstance.get("/products/recommendations");
        setRecommendations(res.data);
      } catch (error) {
        console.log(
          error.response.data.message ||
            "An error occurred while fetching product recommendations"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold text-emerald-400">
        Trending Products
      </h3>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg: grid-col-3">
        {recommendations.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};
export default TrendingProducts;
