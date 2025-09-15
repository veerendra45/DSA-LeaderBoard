import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, LinkedinIcon, Mail, Heart, Code, Users, Target } from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  const teamMembers = [
    {
      name: "Development Team",
      role: "Full Stack Developers",
      description: "Built with passion by computer science students",
    }
  ];

  const technologies = [
    "React.js", "TypeScript", "Tailwind CSS", "Vite", "React Router"
  ];

  const features = [
    {
      icon: Code,
      title: "Multi-Platform Tracking",
      description: "Integrates with LeetCode, GeeksforGeeks, and CodeChef to provide comprehensive problem-solving statistics."
    },
    {
      icon: Users,
      title: "College Community",
      description: "Designed specifically for college students to foster healthy competition and peer learning."
    },
    {
      icon: Target,
      title: "Progress Visualization",
      description: "Clear visual representation of coding journey with detailed analytics and rankings."
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
            About DSA Leaderboard
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A student-centric platform designed to track, compare, and celebrate 
            Data Structures & Algorithms achievements within college communities.
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="mb-12 bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Heart className="h-6 w-6 text-red-500" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed">
              We believe that learning Data Structures and Algorithms is more effective when done in a 
              community. Our platform aims to create a transparent, engaging environment where students 
              can track their progress, learn from peers, and stay motivated through friendly competition. 
              By consolidating achievements from multiple coding platforms, we provide a comprehensive 
              view of each student's coding journey.
            </p>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why This Platform?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-elevated transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-6 w-6" />
              Built With Modern Technology
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              This platform is built using cutting-edge web technologies to ensure 
              fast performance, responsive design, and excellent user experience.
            </p>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, index) => (
                <Badge key={index} variant="secondary" className="text-sm py-1 px-3">
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-6 w-6" />
              Meet the Team
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="h-10 w-10 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Development Team</h3>
              <p className="text-muted-foreground mb-4">Computer Science Students</p>
              <p className="max-w-2xl mx-auto text-sm text-muted-foreground">
                This platform was developed by passionate computer science students who understand 
                the challenges of mastering DSA. We created this tool to help our fellow students 
                track progress and stay motivated in their coding journey.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Target Audience */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Who Is This For?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-primary">Students</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Track your progress across multiple platforms</li>
                  <li>• Compare your performance with peers</li>
                  <li>• Stay motivated through friendly competition</li>
                  <li>• Showcase your coding achievements</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-primary">Faculty & Institutions</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Monitor student engagement in DSA practice</li>
                  <li>• Identify top performers and strugglers</li>
                  <li>• Foster a culture of continuous learning</li>
                  <li>• Data-driven insights for curriculum improvement</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center bg-gradient-hero rounded-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg opacity-90 mb-6">
            Join your college community and start tracking your DSA journey today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" asChild>
              <Link to="/submit">Submit Your Profile</Link>
            </Button>
            <Button size="lg" variant="ghost" className="text-white hover:bg-white/10" asChild>
              <Link to="/leaderboard">View Leaderboard</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}