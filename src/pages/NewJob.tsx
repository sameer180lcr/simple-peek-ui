import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Header } from "@/components/Header";
import { toast } from "sonner";

const suggestedSkills = ["JavaScript", "React", "Node.js", "TypeScript", "Python", "SQL", "AWS"];

export default function NewJob() {
  const navigate = useNavigate();
  const [skills, setSkills] = useState<string[]>(["JavaScript", "React", "Node.js"]);
  const [newSkill, setNewSkill] = useState("");
  const [showSalary, setShowSalary] = useState(true);

  const addSkill = (skill: string) => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
    setNewSkill("");
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSubmit = (isDraft: boolean) => {
    toast.success(isDraft ? "Job saved as draft" : "Job published successfully!");
    navigate("/listings");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-3xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground">Create New Job Listing</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Fill in the details below to create a new job posting
          </p>
        </div>

        <div className="space-y-8">
          {/* Basic Information */}
          <section className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold text-primary mb-1">Basic Information</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Enter the basic details about the job position
            </p>

            <div className="grid gap-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title *</Label>
                  <Input id="title" placeholder="e.g. Senior Product Designer" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Job Type *</Label>
                  <Select defaultValue="full-time">
                    <SelectTrigger>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="flex gap-2">
                    <Input id="location" placeholder="e.g. New York, NY" className="flex-1" />
                    <Button variant="outline" size="sm" className="text-xs">
                      Remote
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Salary Range</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">$</span>
                    <Input placeholder="Min" className="w-24" />
                    <span className="text-muted-foreground">to</span>
                    <span className="text-muted-foreground">$</span>
                    <Input placeholder="Max" className="w-24" />
                    <Select defaultValue="year">
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="year">per year</SelectItem>
                        <SelectItem value="month">per month</SelectItem>
                        <SelectItem value="hour">per hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Checkbox
                      id="showSalary"
                      checked={showSalary}
                      onCheckedChange={(v) => setShowSalary(v as boolean)}
                    />
                    <Label htmlFor="showSalary" className="text-sm font-normal text-muted-foreground">
                      Show salary range on job post
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Job Description */}
          <section className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold text-primary mb-1">Job Description</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Describe the role and responsibilities in detail
            </p>
            <Textarea
              placeholder="Enter job description..."
              className="min-h-[150px] resize-y"
            />
          </section>

          {/* Skills & Requirements */}
          <section className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold text-primary mb-1">Skills & Requirements</h3>
            <p className="text-sm text-muted-foreground mb-6">
              List the required skills and qualifications
            </p>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Add a skill and press Enter</Label>
                <Input
                  placeholder="Type a skill..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSkill(newSkill);
                    }
                  }}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="gap-1 pr-1">
                    {skill}
                    <button
                      onClick={() => removeSkill(skill)}
                      className="ml-1 hover:bg-muted rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {suggestedSkills
                  .filter((s) => !skills.includes(s))
                  .map((skill) => (
                    <button
                      key={skill}
                      onClick={() => addSkill(skill)}
                      className="text-xs text-muted-foreground hover:text-foreground border border-dashed border-border rounded-full px-3 py-1 hover:border-primary transition-colors"
                    >
                      + {skill}
                    </button>
                  ))}
              </div>

              <div className="grid md:grid-cols-2 gap-4 pt-4">
                <div className="space-y-2">
                  <Label>Experience Level</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entry">Entry Level</SelectItem>
                      <SelectItem value="mid">Mid Level</SelectItem>
                      <SelectItem value="senior">Senior Level</SelectItem>
                      <SelectItem value="lead">Lead / Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Education</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high-school">High School</SelectItem>
                      <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                      <SelectItem value="masters">Master's Degree</SelectItem>
                      <SelectItem value="phd">PhD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </section>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => handleSubmit(true)}>
              Save as Draft
            </Button>
            <Button onClick={() => handleSubmit(false)}>
              Publish Job
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
