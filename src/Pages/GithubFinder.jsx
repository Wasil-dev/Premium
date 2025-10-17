import { useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { motion } from "framer-motion";
import { Github, Users, FolderGit2, UserPlus, Link as LinkIcon } from "lucide-react";

export default function GithubFinder() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    if (!username.trim()) return;

    try {
      setLoading(true);
      const [userRes, repoRes] = await Promise.all([
        axios.get(`https://api.github.com/users/${username}`),
        axios.get(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`),
      ]);
      setUserData(userRes.data);
      setRepos(repoRes.data);
    } catch (err) {
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative min-h-screen bg-gradient-to-b from-[#0a0118] via-[#120624] to-[#1a0835] px-8 py-12 text-white overflow-hidden"
    >
      <motion.div
        animate={{
          x: [-150, 150, -150],
          y: [-100, 100, -100],
          opacity: [0.15, 0.35, 0.15],
        }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-cyan-400 blur-[140px] opacity-20"
      />

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold flex justify-center items-center gap-3 bg-gradient-to-r from-fuchsia-400 to-purple-500 bg-clip-text text-transparent">
          <Github className="w-10 h-10 text-fuchsia-500" /> GitHub Finder
        </h1>
        <p className="text-gray-400 mt-2 text-sm md:text-base">
          Explore any GitHub profile with detailed analytics
        </p>
      </div>

      {/* Input Field */}
      <div className="flex flex-col md:flex-row gap-4 mb-10 w-full max-w-2xl mx-auto justify-center">
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-3 rounded-xl bg-[#1b1b24]/70 border border-white/10 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-fuchsia-500 w-full transition-all"
        />
        <motion.button
          onClick={fetchUser}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-fuchsia-600 hover:to-purple-600 rounded-xl font-semibold shadow-lg shadow-fuchsia-900/30 transition-all"
        >
          Search
        </motion.button>
      </div>

      {loading && <Loader />}

      {userData && !loading && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto p-8 rounded-2xl bg-[#1b1b24]/60 border border-fuchsia-500/20 shadow-xl shadow-fuchsia-900/30 backdrop-blur-lg relative overflow-hidden"
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 12, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/20 via-purple-500/20 to-transparent blur-2xl -z-10"
          />
          <img
            src={userData.avatar_url}
            alt={userData.login}
            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-fuchsia-500"
          />
          <h2 className="text-2xl font-bold text-fuchsia-400 mb-1 text-center">
            {userData.name || "No Name"}
          </h2>
          <p className="text-gray-400 text-center mb-4">@{userData.login}</p>

          <div className="flex justify-around text-sm mb-6 text-gray-300">
            <span className="flex items-center gap-1">
              <Users size={16} /> Followers: {userData.followers}
            </span>
            <span className="flex items-center gap-1">
              <UserPlus size={16} /> Following: {userData.following}
            </span>
            <span className="flex items-center gap-1">
              <FolderGit2 size={16} /> Repos: {userData.public_repos}
            </span>
          </div>

          {userData.bio && (
            <p className="text-gray-300 text-sm text-center mb-6 italic">
              “{userData.bio}”
            </p>
          )}

          <h3 className="text-lg font-semibold text-fuchsia-400 mb-3">
            Top Repositories
          </h3>
          <ul className="space-y-1 text-sm text-left">
            {repos.map((repo) => (
              <li key={repo.id} className="flex items-center gap-2">
                <LinkIcon size={14} className="text-fuchsia-400" />
                <a
                  href={repo.html_url}
                  target="_blank"
                  className="text-gray-300 hover:text-fuchsia-400 transition-all"
                >
                  {repo.name}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Not Found */}
      {userData === null && !loading && (
        <div className="text-center text-red-400 mt-10">
          User not found 
        </div>
      )}
    </motion.div>
  );
}
