// src/Pages/User.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Loader2 } from "lucide-react";

export default function User() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=12")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.results);
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
        <Users className="text-fuchsia-500" /> Users
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {users.map((user, i) => (
          <motion.div
            key={user.login.uuid}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-[#1b012f]/60 p-5 rounded-2xl border border-purple-700/30 shadow-md hover:shadow-fuchsia-700/30 transition-all hover:-translate-y-1 backdrop-blur-md"
          >
            <img
              src={user.picture.large}
              alt={user.name.first}
              className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-2 border-fuchsia-400 shadow-md"
            />
            <h2 className="font-semibold text-lg text-center text-fuchsia-300">
              {user.name.first} {user.name.last}
            </h2>
            <p className="text-center text-gray-400 text-sm mb-3">
              {user.location.country}
            </p>
            <div className="text-center">
              <Link
                to={`/users/${user.login.uuid}`}
                state={{ user }}
                className="px-3 py-1 text-sm bg-fuchsia-600/30 border border-fuchsia-500 rounded-lg hover:bg-fuchsia-700/40 transition-all"
              >
                View Profile
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
