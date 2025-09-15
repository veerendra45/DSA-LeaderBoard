import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { StudentModal } from "@/components/StudentModal";
import { Trophy, Medal, Award, Search, Filter, User } from "lucide-react";
import api from "./api";


interface Student {
  id: number;
  fullName: string;
  rollNumber: string;
  year: number;
  department: string;
  platformStats : {
    totalScore?: number;
    easy?: number;
    medium?: number;
    hard?: number;
  };
  platforms: {
    leetcode?: string;
    gfg?: string;
    codechef?: string;
  };
}

export default function Leaderboard() {
  console.log("Leaderboard component rendered");
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<unknown>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await api.get("/students", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);

  const years = [
    { value: "all", label: "All Years" },
    { value: "1", label: "1st Year" },
    { value: "2", label: "2nd Year" },
    { value: "3", label: "3rd Year" },
    { value: "4", label: "4th Year" }
  ];

  console.log(students);
  const filteredStudents = students
    .filter(student => {
      const matchesYear = selectedYear === "all" || student.year.toString() === selectedYear;
      const matchesSearch = student.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.rollNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.department?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesYear && matchesSearch;
    })
    .sort((a, b) => (b.platformStats?.totalScore ?? 0) - (a.platformStats?.totalScore ?? 0));

  const handleRowClick = (student: unknown) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="h-5 w-5 text-yellow-500" />;
    if (index === 1) return <Medal className="h-5 w-5 text-gray-400" />;
    if (index === 2) return <Award className="h-5 w-5 text-amber-600" />;
    return <span className="text-sm font-bold text-muted-foreground">#{index + 1}</span>;
  };

  const getRankBadge = (index: number) => {
    if (index === 0) return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white";
    if (index === 1) return "bg-gradient-to-r from-gray-300 to-gray-500 text-white";
    if (index === 2) return "bg-gradient-to-r from-amber-400 to-amber-600 text-white";
    return "bg-muted text-muted-foreground";
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            DSA Leaderboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Track the top performers in Data Structures & Algorithms
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, roll number, or department..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="md:w-48">
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year.value} value={year.value}>
                        {year.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Rankings ({filteredStudents.length} students)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/30">
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold">Rank</th>
                    <th className="text-left p-4 font-semibold">Student</th>
                    <th className="text-left p-4 font-semibold">Year</th>
                    <th className="text-left p-4 font-semibold">Department</th>
                    {/* <th className="text-center p-4 font-semibold">Total</th> */}
                    <th className="text-center p-4 font-semibold">Easy</th>
                    <th className="text-center p-4 font-semibold">Medium</th>
                    <th className="text-center p-4 font-semibold">Hard</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student, index) => (
                    <tr
                      key={student.id}
                      className="border-b hover:bg-muted/30 cursor-pointer transition-colors"
                      onClick={() => handleRowClick(student)}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {getRankIcon(index)}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                            <User className="h-4 w-4 text-primary-foreground" />
                          </div>
                          <div>
                            <div className="font-semibold">{student.fullName}</div>
                            <div className="text-sm text-muted-foreground">{student.rollNumber}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline">{student.year} Year</Badge>
                      </td>
                      <td className="p-4">
                        <Badge variant="secondary">{student.department}</Badge>
                      </td>
                      {/* <td className="p-4 text-center">
                        <div className="font-bold text-lg text-primary">
                          {student.platformStats?.totalScore ?? 0}
                        </div>
                      </td> */}
                      <td className="p-4 text-center">
                        <Badge variant="outline" className="text-difficulty-easy border-difficulty-easy">
                          {student.platformStats?.easy ?? 0}
                        </Badge>
                      </td>
                      <td className="p-4 text-center">
                        <Badge variant="outline" className="text-difficulty-medium border-difficulty-medium">
                          {student.platformStats?.medium ?? 0}
                        </Badge>
                      </td>
                      <td className="p-4 text-center">
                        <Badge variant="outline" className="text-difficulty-hard border-difficulty-hard">
                          {student.platformStats?.hard ?? 0}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredStudents.length === 0 && (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-2">No students found</div>
                <div className="text-sm text-muted-foreground">
                  Try adjusting your search or filter criteria
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Student Modal */}
        <StudentModal
          students={selectedStudent ? [selectedStudent] : []}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
}