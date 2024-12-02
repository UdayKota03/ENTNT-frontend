import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, Users, Clock, ArrowRight, Menu } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
              Schedule Calendar
            </h1>
            <div className="hidden sm:flex space-x-4">
              <Link to="/signin">
                <Button variant="ghost" className="hover:text-blue-600 hover:bg-blue-50">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-90 transition-opacity">
                  Get Started
                </Button>
              </Link>
            </div>
            <Button variant="ghost" className="sm:hidden p-2">
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-teal-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight animate-fade-up">
              Streamline Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">Communication</span> Schedule
            </h1>
            <p className="text-xl text-gray-600 animate-fade-up delay-150 max-w-2xl mx-auto">
              Keep track of your company communications effortlessly with our intuitive calendar system.
            </p>
            <div className="animate-fade-up delay-300">
              <Link to="/signup">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-90 transition-opacity">
                  Start Your Journey <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl p-8 border shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="bg-blue-100 rounded-xl p-4 w-16 h-16 mx-auto mb-6">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">
                Schedule Communications
              </h3>
              <p className="text-gray-600 text-center">
                Easily plan and organize your company communications using our intuitive calendar interface.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="bg-teal-100 rounded-xl p-4 w-16 h-16 mx-auto mb-6">
                <Users className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">
                Manage Companies
              </h3>
              <p className="text-gray-600 text-center">
                Keep track of all your company contacts and communication history in one place.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="bg-blue-100 rounded-xl p-4 w-16 h-16 mx-auto mb-6">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">
                Never Miss a Follow-up
              </h3>
              <p className="text-gray-600 text-center">
                Get timely reminders for upcoming communications and stay on top of your schedule.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-600">
            <p>© 2024 Schedule Calendar. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;