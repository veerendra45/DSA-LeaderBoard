import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { LogIn, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import axios from "axios";
import api from "@/pages/api";
import { useAuth } from "./AuthContext";

export default function Login() {
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[message, setMessage] = useState<{type: "success" | "error"; text: string } | null>(null);

  const{loggedIn, login, logout} = useAuth();

  const handleLogin = async () => {
    console.log("Login button clicked", email, password);
    try {
      const response = await api.post("/students/login", {
        email,
        password,
      });
      console.log("API response:", response.data);
      const { message, token } = response.data;
      if (token) {
        localStorage.setItem("jwtToken", token);
        login(token, email);
      }
      setMessage({ type: "success", text: message });
    } catch (error: unknown) {
          console.error("Login error:", error);
          if (axios.isAxiosError(error)) {
            setMessage({
            type: "error",
            text: error.response?.data?.message || "Login failed",
          });
          } else {
            setMessage({ type: "error", text: "Unexpected error occurred" });
          }
    }
  };
  const handleLogout = () => {
      localStorage.removeItem("jwtToken");
      logout();
      setMessage({ type: "success", text: "Logged out successfully" });
  };

  return (
    <div className="min-h-screen py-12 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {loggedIn ? "Dashboard" : "Back to Home"}
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {loggedIn ? "Welcome Back!" : "Login"}
          </h1>
          <p className="text-muted-foreground mt-2">
            Access your dashboard or admin panel
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                {loggedIn ? (
                  <>
                    <ArrowLeft className="h-5 w-5" />
                    Logged In
                  </>
                ) : (
                  <>
                    <LogIn className="h-5 w-5" />
                    Sign In
                  </>
                )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!loggedIn && (
              <>
                <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              </>
            )}
            {loggedIn ? (
                <Button className="w-full" onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <Button className="w-full" onClick={handleLogin}>
                  Sign In
                </Button>
            )}
            
            {message && (
              <Alert
                variant={message.type === "success" ? "default" : "destructive"}
                className="mt-4"
              >
                <AlertTitle>
                  {message.type === "success" ? "Success" : "Error"}
                </AlertTitle>
                <AlertDescription>{message.text}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}