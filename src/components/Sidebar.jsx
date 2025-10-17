import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutGrid,
  ShoppingBag,
  Users,
  BarChart3,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

const navItems = [
  { path: "/", label: "Dashboard", icon: <LayoutGrid size={20} /> },
  { path: "/products", label: "Products", icon: <ShoppingBag size={20} /> },
  { path: "/users", label: "Users", icon: <Users size={20} /> },
  { path: "/reports", label: "Reports", icon: <BarChart3 size={20} /> },
];

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.aside
      initial={{ width: 80 }}
      animate={{ width: expanded ? 240 : 80 }}
      transition={{ type: "spring", stiffness: 120, damping: 16 }}
      className="fixed left-0 top-0 h-full bg-[#0a0015]/80 border-r border-white/10 backdrop-blur-lg shadow-xl z-30 flex flex-col justify-between"
    >
      <div className="flex items-center justify-center w-full mb-10 mt-6 relative">
        <motion.div
          className="text-transparent bg-gradient-to-r from-purple-400 to-fuchsia-500 bg-clip-text text-2xl font-extrabold"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          N
        </motion.div>
        <AnimatePresence>
          {expanded && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className="text-white font-bold text-xl ml-2"
            >
              NovaDash
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <nav className="flex flex-col space-y-2 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-lg shadow-fuchsia-900/30"
                  : "text-gray-400 hover:bg-white/10 hover:text-fuchsia-400"
              }`
            }
          >
            <span className="text-fuchsia-400">{item.icon}</span>
            <span
              className={`font-medium transition-all duration-300 ${
                !expanded && "opacity-0 translate-x-10 pointer-events-none"
              }`}
            >
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-2 rounded-full bg-white/10 hover:bg-fuchsia-600 hover:text-white text-gray-400 transition-all duration-300 shadow-md shadow-black/20"
        >
          {expanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
    </motion.aside>
  );
}
