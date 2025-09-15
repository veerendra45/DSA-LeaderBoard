import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Users, Target, TrendingUp, Code, Award } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Trophy,
      title: "Competitive Rankings",
      description: "Track your progress across LeetCode, GeeksforGeeks, and CodeChef platforms"
    },
    {
      icon: Users,
      title: "College Community",
      description: "Connect with fellow students and see how you rank among your peers"
    },
    {
      icon: Target,
      title: "Problem Tracking",
      description: "Monitor your easy, medium, and hard problem solving statistics"
    },
    {
      icon: TrendingUp,
      title: "Progress Analytics",
      description: "Visualize your coding journey with detailed progress insights"
    }
  ];

  const stats = [
    { label: "Active Students", value: "150+", icon: Users },
    { label: "Problems Solved", value: "5,000+", icon: Code },
    { label: "Departments", value: "8", icon: Award },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-6">
              DSA Leaderboard
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Track, compare, and excel in your Data Structures & Algorithms journey with your college peers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" variant="gradient" asChild className="animate-glow-pulse">
                <Link to="/leaderboard">
                  <Trophy className="mr-2 h-5 w-5" />
                  View Leaderboard
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/submit">
                  Submit Your Profile
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-elevated transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-lg mb-4">
                    <stat.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to track and improve your competitive programming skills
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="text-center hover:shadow-elevated hover:scale-105 transition-all duration-300 group"
              >
                <CardContent className="pt-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-card rounded-xl mb-4 group-hover:shadow-glow transition-all duration-300">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join the Competition?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Submit your coding profiles and see where you stand among your peers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" asChild>
              <Link to="/submit">
                Get Started
              </Link>
            </Button>
            <Button size="lg" variant="ghost" className="text-white hover:bg-white/10" asChild>
              <Link to="/about">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}