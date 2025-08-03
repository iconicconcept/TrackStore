import cloudinary from "../lib/cloudinary.js";
import { redis } from "../lib/redis.js";
import Product from "../models/product.model.js";

//get all product (admin/owner only!)
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 }); //find all products and make the latest created top before others
    res.json({ products });
    console.log("Products fetched successfully!");
  } catch (error) {
    console.log("Error fetching products", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//featured products
export const getFeaturedProducts = async (req, res) => {
  try {
    let featuredProducts = await redis.get("featured_products");
    if (featuredProducts) {
      return res.json(JSON.parse(featuredProducts));
    }

    //if not in redis, fetch from mongodb
    featuredProducts = await Product.find({ isFeatured: true }).lean(); //.lean makes it return a plain javascript objects, which is more better for performance, instead of returning mongodb document

    if (!featuredProducts) {
      res.status(404).json({ message: "No featured product found" });
    }

    // store in redis for future quick access
    await redis.set("featured_products", JSON.stringify(featuredProducts));

    res.json(featuredProducts);
  } catch {
    console.log("Error fetching featured products", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//get recommeded products
export const getRecommendedProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $sample: { size: 4 }, //we are getting 4 different products to recommend
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          image: 1,
          price: 1,
        },
      },
    ]);

    res.status(200).json(products);
  } catch (error) {
    console.log("Error fetching recommended products", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//get products by category
export const getProductByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const products = await Product.find({ category });
    res.status(200).json({ products });
  } catch (error) {
    console.log("Error fetching the category products", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//add product by admin
export const addProduct = async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;

    let cloudinaryResponse = null;

    if (image) {
      // await cloudinary.uploader.upload({ folder: "products" });
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "products",
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      image: cloudinaryResponse?.secure_url
        ? cloudinaryResponse.secure_url
        : "",
      category,
    });

    res.status(201).json(product);
  } catch (error) {
    console.log("Error fetching featured products", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//delete product by admin
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    if (product.image) {
      const publicId = product.image.split("/").pop().split(".")[0]; //get Id of image to be deleted
      try {
        await cloudinary.uploader.destroy(`products/${publicId}`);
        console.log("deleted image from cloudinary");
      } catch (error) {
        console.error("Error deleting image from cloudinary");
      }
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Product deleted successfully" });
    console.log("Product deleted successfully");
  } catch (error) {
    console.log("Error deleting Product", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

//toggle product to be featured or not
export const toggleFeaturedProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.isFeatured = !product.isFeatured;
      const updatedProduct = await product.save();
      await updateFeaturedProductCache();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log("Error toggling product to be featured", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// the updateFeaturedProductCache function used in toggleFeaturedProduct controller
async function updateFeaturedProductCache() {
  try {
    const featuredProducts = await Product.find({ isFeatured: true }).lean(); //we used .lean here to return plain javascript instead of mongoose document so as to improve performance
    await redis.set("featured_products", JSON.stringify(featuredProducts));
  } catch (error) {
    console.log("Error in update cache function", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
