import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex h-screen bg-[#0a0013]">
      <Sidebar />
      <main className="flex-1 ml-[78px] overflow-y-auto bg-gradient-to-b from-[#0a0013] via-[#120021] to-[#1a012d] text-white">
        <Outlet />
      </main>
    </div>
  );
}
