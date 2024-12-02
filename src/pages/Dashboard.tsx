import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { Plus, LogOut } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <Button variant="ghost" size="sm" className="flex items-center">
            <LogOut className="w-5 h-5 mr-2" /> Sign Out
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-[2fr_1fr] gap-10">
          {/* Communications Section */}
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-700">Upcoming Communications</h2>
              <Button variant="default" className="flex items-center">
                <Plus className="w-5 h-5 mr-2" /> Add Communication
              </Button>
            </div>
            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-500 text-center">No communications scheduled</p>
            </div>
          </section>

          {/* Calendar Section */}
          <aside className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Calendar</h2>
            <Calendar />
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 mt-10 py-4">
        <div className="container mx-auto text-center text-sm text-gray-500">
          &copy; 2024 Calender. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
