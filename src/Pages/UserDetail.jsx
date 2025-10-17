// src/Pages/UserDetail.jsx
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react";

export default function UserDetail() {
  const { state } = useLocation();
  const user = state?.user;

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-400">
        User data not found 
      </div>
    );
  }

  return (
    <motion.div
      className="p-8 min-h-screen bg-gradient-to-br from-[#0a0013] via-[#150022] to-[#23003b] text-gray-200"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl mx-auto">
        <Link
          to="/users"
          className="inline-flex items-center text-fuchsia-400 hover:text-purple-300 transition mb-6"
        >
          <ArrowLeft size={20} className="mr-2" /> Back to Users
        </Link>

        <motion.div
          className="bg-[#1b012f]/60 rounded-2xl shadow-xl border border-fuchsia-700/30 p-8 flex flex-col md:flex-row gap-8 backdrop-blur-md"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <img
            src={user.picture.large}
            alt={user.name.first}
            className="w-48 h-48 rounded-full object-cover shadow-lg shadow-fuchsia-800/30"
          />

          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-fuchsia-400 mb-2">
                {user.name.first} {user.name.last}
              </h1>
              <p className="text-purple-300 font-medium mb-3">
                {user.location.country}
              </p>
              <div className="space-y-3">
                <Info icon={<Mail />} label={user.email} />
                <Info icon={<Phone />} label={user.phone} />
                <Info icon={<MapPin />} label={user.location.city} />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              className="self-start mt-6 bg-gradient-to-r from-fuchsia-600 to-purple-700 px-6 py-2 rounded-lg font-semibold shadow-lg hover:shadow-fuchsia-700/40 transition-all"
            >
              Message User
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function Info({ icon, label }) {
  return (
    <div className="flex items-center gap-3 text-gray-300 bg-purple-900/20 px-3 py-2 rounded-lg border border-purple-700/30">
      {icon}
      <span>{label}</span>
    </div>
  );
}
