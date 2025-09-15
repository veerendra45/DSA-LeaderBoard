import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, User, GraduationCap, Building } from "lucide-react";

interface Student {
  id: number;
  fullName: string;
  rollNumber: string;
  year: number;
  department: string;
  profilePicture?: string;
  totalProblems: number;
  easy: number;
  medium: number;
  hard: number;
  platforms: {
    leetcode?: string;
    gfg?: string;
    codechef?: string;
  };
}

interface StudentModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
}

export function StudentModal({ student, isOpen, onClose }: StudentModalProps) {
  if (!student) return null;

  const platformLinks = [
    {
      name: "LeetCode",
      url: student.platforms.leetcode,
      color: "bg-platform-leetcode text-white",
    },
    {
      name: "GeeksforGeeks",
      url: student.platforms.gfg,
      color: "bg-platform-gfg text-white",
    },
    {
      name: "CodeChef",
      url: student.platforms.codechef,
      color: "bg-platform-codechef text-white",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="relative">
              {student.profilePicture ? (
                <img
                  src={student.profilePicture}
                  alt={student.fullName}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                  <User className="h-6 w-6 text-primary-foreground" />
                </div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold">{student.fullName}</h3>
              <p className="text-sm text-muted-foreground">{student.rollNumber}</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Student Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                <span className="text-muted-foreground">Year:</span> {student.year}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                <span className="text-muted-foreground">Dept:</span> {student.department}
              </span>
            </div>
          </div>

          {/* Problem Stats */}
          <div className="bg-gradient-card p-4 rounded-lg">
            <h4 className="font-semibold mb-3">Problem Statistics</h4>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">{student.totalProblems}</div>
                <div className="text-xs text-muted-foreground">Total Problems</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-difficulty-easy border-difficulty-easy">
                    Easy
                  </Badge>
                  <span className="font-semibold">{student.easy}</span>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-difficulty-medium border-difficulty-medium">
                    Medium
                  </Badge>
                  <span className="font-semibold">{student.medium}</span>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-difficulty-hard border-difficulty-hard">
                    Hard
                  </Badge>
                  <span className="font-semibold">{student.hard}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-semibold mb-3">Coding Profiles</h4>
            <div className="grid gap-2">
              {platformLinks.map((platform) => (
                platform.url ? (
                  <Button
                    key={platform.name}
                    variant="outline"
                    size="sm"
                    className="justify-between"
                    asChild
                  >
                    <a href={platform.url} target="_blank" rel="noopener noreferrer">
                      <span>{platform.name}</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                ) : (
                  <div
                    key={platform.name}
                    className="flex items-center justify-between p-2 rounded border border-dashed border-muted-foreground/30"
                  >
                    <span className="text-muted-foreground">{platform.name}</span>
                    <span className="text-xs text-muted-foreground">Not provided</span>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}