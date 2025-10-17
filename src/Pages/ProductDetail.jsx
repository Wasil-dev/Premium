import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-purple-300 text-lg animate-pulse">
        Loading product details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-red-400 text-lg">
        Product not found 😢
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-[calc(100vh-80px)] flex flex-col items-center p-6 text-white"
    >
      <div className="w-full max-w-5xl mb-6">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Products</span>
        </Link>
      </div>

      <motion.div
        layout
        className="w-full max-w-5xl bg-[#1b0b29]/60 rounded-2xl shadow-xl border border-purple-800 p-6 grid md:grid-cols-2 gap-10 backdrop-blur-sm"
      >
        <motion.img
          src={product.image}
          alt={product.title}
          className="w-full h-80 object-contain rounded-lg bg-[#2a1040]/50 p-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-3 text-purple-300">
            {product.title}
          </h2>
          <p className="text-gray-300 mb-4 leading-relaxed">
            {product.description}
          </p>
          <p className="text-sm text-purple-400 mb-2">
            Category: {product.category}
          </p>
          <div className="flex items-center justify-between mt-6">
            <span className="text-2xl font-semibold text-purple-400">
              ${product.price}
            </span>
            <button className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-lg text-white font-medium shadow-lg transition-all duration-300">
              Add to Cart
            </button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
