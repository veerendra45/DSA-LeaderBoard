import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { Upload, ArrowLeft, User, ExternalLink } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import api from "@/pages/api";

export default function Submit() {
  const departments = [
    "Computer Science Engineering",
    "CSE-AIML",
    "CSE-DS",
    "CSE-CS",
    "Information Technology", 
    "Electronics & Communication",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electrical Engineering"
  ];

  const years = ["1", "2", "3", "4"];

  const [fullName, setFullName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [year, setYear] = useState("");
  const [department, setDepartment] = useState("");
  const [leetcode, setLeetcode] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async () => {
      try {
        const requestData = {
          fullName,
          rollNumber,
          email,
          password,
          department,
          year: year ? parseInt(year) : null,
          profilePic: "",
          platforms: [
            { name: "LeetCode", profileUrl: leetcode },
          ],
        };

        const response = await api.post("/students/submit", requestData);


        setMessage({ type: "success", text: "Profile submitted successfully!" });
        console.log("Response:", response.data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          setMessage({
            type: "error",
            text: error.response?.data?.message || "Profile submission failed",
          });
        } else {
          setMessage({ type: "error", text: "Unexpected error occurred" });
        }
      }
    };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Submit Your Profile
          </h1>
          <p className="text-muted-foreground mt-2">
            Add your coding profiles to join the leaderboard
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Student Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input 
                  id="fullName" 
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rollNumber">Roll Number *</Label>
                <Input 
                  id="rollNumber" 
                  placeholder="e.g., 21CS001"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Email *</Label>
                <Input 
                  id="email" 
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rollNumber">Enter Password *</Label>
                <Input 
                  id="password" 
                  placeholder="Set a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year">Year *</Label>
                <Select value={year} onValueChange={setYear} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year} Year
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Select value={department} onValueChange={setDepartment} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Profile Picture */}
            <div className="space-y-2">
              <Label htmlFor="profilePic">Profile Picture (Optional)</Label>
              <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                <User className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Upload your profile picture</p>
                <Button variant="outline" size="sm" className="mt-2" disabled>
                  Choose File
                </Button>
              </div>
            </div>

            {/* Platform Links */}
            <div className="space-y-4">
              <Label className="text-base font-semibold">Coding Platform Profiles</Label>
              <p className="text-sm text-muted-foreground">
                Provide your profile URLs for accurate tracking of your problem-solving progress
              </p>
              
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="leetcode" className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-platform-leetcode rounded"></div>
                    LeetCode Profile
                  </Label>
                  <div className="flex">
                    <Input 
                      id="leetcode" 
                      placeholder="https://leetcode.com/username"
                      value={leetcode}
                      onChange={(e) => setLeetcode(e.target.value)}
                      required
                    />
                    <Button variant="outline" size="sm" className="ml-2">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gfg" className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-platform-gfg rounded"></div>
                    GeeksforGeeks Profile
                  </Label>
                  <div className="flex">
                    <Input 
                      id="gfg" 
                      placeholder="https://practice.geeksforgeeks.org/user/username"
                      disabled
                    />
                    <Button variant="outline" size="sm" className="ml-2" disabled>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="codechef" className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-platform-codechef rounded"></div>
                    CodeChef Profile
                  </Label>
                  <div className="flex">
                    <Input 
                      id="codechef" 
                      placeholder="https://codechef.com/users/username"
                      disabled
                    />
                    <Button variant="outline" size="sm" className="ml-2" disabled>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Button className="w-full" size="lg" onClick={handleSubmit}>
                Submit Profile
              </Button>
              
              {message && (
                <Alert
                  variant={message.type === "success" ? "default" : "destructive"}
                  className="mt-4"
                >
                  <AlertTitle>
                    {message.type === "success" ? "success" : "Error"}
                  </AlertTitle>
                  <AlertDescription>{message.text}</AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}