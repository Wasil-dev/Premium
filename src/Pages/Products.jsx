// src/Pages/Products.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, Loader2 } from "lucide-react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#0a0013] via-[#150022] to-[#23003b]">
        <Loader2 className="w-10 h-10 text-fuchsia-400 animate-spin" />
      </div>
    );
  }

  return (
    <motion.div
      className="p-8 min-h-screen bg-gradient-to-br from-[#0a0013] via-[#150022] to-[#23003b] text-gray-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-4xl font-bold mb-8 text-fuchsia-400 flex items-center gap-2">
        <ShoppingBag className="text-fuchsia-500" /> Products
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-[#1b012f]/60 border border-purple-700/30 p-5 rounded-2xl shadow-md hover:shadow-fuchsia-700/30 transition-all hover:-translate-y-1 backdrop-blur-md"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-40 mx-auto object-contain mb-4"
            />
            <h2 className="font-semibold text-lg text-fuchsia-300 line-clamp-2">
              {item.title}
            </h2>
            <p className="text-gray-400 mt-2 text-sm line-clamp-2">
              {item.description}
            </p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-fuchsia-400 font-bold">${item.price}</span>
              <Link
                to={`/products/${item.id}`}
                className="px-3 py-1 text-sm bg-fuchsia-600/30 border border-fuchsia-500 rounded-lg hover:bg-fuchsia-700/40 transition-all"
              >
                View
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
