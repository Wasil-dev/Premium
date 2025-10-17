// src/Pages/Dashboard.jsx
import { motion } from "framer-motion";
import { Users, ShoppingBag, BarChart3 } from "lucide-react";

export default function Dashboard() {
  const stats = [
    { id: 1, label: "Active Users", value: "1,204", icon: <Users size={28} />, color: "text-blue-400" },
    { id: 2, label: "Products", value: "324", icon: <ShoppingBag size={28} />, color: "text-purple-400" },
    { id: 3, label: "Revenue", value: "$12,340", icon: <BarChart3 size={28} />, color: "text-pink-400" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen px-10 py-14 text-white bg-gradient-to-b from-[#0a0013] via-[#120021] to-[#1a012d]"
    >
      {/* Page Header */}
      <div className="mb-14">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-fuchsia-500 via-purple-400 to-indigo-500 bg-clip-text text-transparent mb-3 flex items-center gap-3">
          <BarChart3 className="text-fuchsia-400 w-10 h-10" />
          Dashboard
        </h1>
        <p className="text-gray-400 text-sm">Your app analytics at a glance</p>
      </div>

      {/* Overview Section */}
      <div className="text-center mb-10">
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-fuchsia-500 bg-clip-text text-transparent mb-3">
          Dashboard Overview
        </h2>
        <p className="text-gray-400 text-sm max-w-md mx-auto">
          Track performance metrics, user engagement, and real-time stats to stay ahead.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="p-6 rounded-2xl bg-[#1a012a]/70 backdrop-blur-xl border border-white/10 shadow-lg hover:shadow-fuchsia-800/30 transition-all duration-500"
          >
            <div className="flex flex-col items-center text-center">
              <motion.div
                whileHover={{ rotate: 10 }}
                transition={{ type: "spring", stiffness: 200 }}
                className={`${stat.color} mb-3`}
              >
                {stat.icon}
              </motion.div>
              <h3 className="text-gray-300 text-sm font-medium">{stat.label}</h3>
              <p className="text-3xl font-bold mt-2 text-white">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
