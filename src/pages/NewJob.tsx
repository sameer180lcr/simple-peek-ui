import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Upload, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Header } from "@/components/Header";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const suggestedSkills = ["JavaScript", "React", "Node.js", "TypeScript", "Python", "SQL", "AWS", "Docker", "GraphQL"];
const departments = ["Engineering", "Design", "Marketing", "Sales", "Human Resources", "Finance", "Operations", "Customer Support"];
const defaultBenefits = ["Health Insurance", "401(k)", "Remote Work", "Flexible Hours", "Paid Time Off", "Stock Options"];

export default function NewJob() {
  const navigate = useNavigate();
  const [skills, setSkills] = useState<string[]>(["JavaScript", "React", "Node.js"]);
  const [benefits, setBenefits] = useState<string[]>(["Health Insurance", "Remote Work", "Paid Time Off"]);
  const [newSkill, setNewSkill] = useState("");
  const [newBenefit, setNewBenefit] = useState("");
  const [showSalary, setShowSalary] = useState(true);
  const [isRemote, setIsRemote] = useState(false);
  const [deadline, setDeadline] = useState<Date>();
  const [attachments, setAttachments] = useState<string[]>([]);

  const addSkill = (skill: string) => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
    setNewSkill("");
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const addBenefit = (benefit: string) => {
    if (benefit && !benefits.includes(benefit)) {
      setBenefits([...benefits, benefit]);
    }
    setNewBenefit("");
  };

  const removeBenefit = (benefit: string) => {
    setBenefits(benefits.filter((b) => b !== benefit));
  };

  const handleFileUpload = () => {
    // Simulating file upload
    const fileName = `document_${Date.now()}.pdf`;
    setAttachments([...attachments, fileName]);
    toast.success("File uploaded successfully");
  };

  const removeAttachment = (fileName: string) => {
    setAttachments(attachments.filter((a) => a !== fileName));
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
                      <SelectItem value="internship">Internship</SelectItem>
                      <SelectItem value="freelance">Freelance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept.toLowerCase().replace(" ", "-")}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Application Deadline</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !deadline && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {deadline ? format(deadline, "PPP") : "Select deadline"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={deadline}
                        onSelect={setDeadline}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    placeholder="e.g. New York, NY" 
                    disabled={isRemote}
                    className={isRemote ? "opacity-50" : ""}
                  />
                  <div className="flex items-center gap-2 mt-2">
                    <Checkbox
                      id="remote"
                      checked={isRemote}
                      onCheckedChange={(v) => setIsRemote(v as boolean)}
                    />
                    <Label htmlFor="remote" className="text-sm font-normal text-muted-foreground">
                      This is a remote position
                    </Label>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Salary Range</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">$</span>
                    <Input placeholder="Min" className="w-24" type="number" />
                    <span className="text-muted-foreground">to</span>
                    <span className="text-muted-foreground">$</span>
                    <Input placeholder="Max" className="w-24" type="number" />
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

              <div className="space-y-2">
                <Label htmlFor="openings">Number of Openings</Label>
                <Input id="openings" type="number" placeholder="1" className="w-32" min="1" />
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
              placeholder="Enter a detailed job description including responsibilities, day-to-day tasks, and what success looks like in this role..."
              className="min-h-[180px] resize-y"
            />
          </section>

          {/* Skills & Requirements */}
          <section className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold text-primary mb-1">Skills & Requirements</h3>
            <p className="text-sm text-muted-foreground mb-6">
              List the required skills and qualifications
            </p>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Required Skills</Label>
                <Input
                  placeholder="Type a skill and press Enter"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSkill(newSkill);
                    }
                  }}
                />
                <div className="flex flex-wrap gap-2 mt-3">
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
                <div className="flex flex-wrap gap-2 mt-3">
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
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Experience Level</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                      <SelectItem value="mid">Mid Level (2-5 years)</SelectItem>
                      <SelectItem value="senior">Senior Level (5-8 years)</SelectItem>
                      <SelectItem value="lead">Lead / Manager (8+ years)</SelectItem>
                      <SelectItem value="executive">Executive</SelectItem>
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
                      <SelectItem value="none">No requirement</SelectItem>
                      <SelectItem value="high-school">High School</SelectItem>
                      <SelectItem value="associate">Associate's Degree</SelectItem>
                      <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                      <SelectItem value="masters">Master's Degree</SelectItem>
                      <SelectItem value="phd">PhD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Additional Requirements</Label>
                <Textarea
                  placeholder="List any additional requirements, certifications, or nice-to-haves..."
                  className="min-h-[100px] resize-y"
                />
              </div>
            </div>
          </section>

          {/* Benefits & Perks */}
          <section className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold text-primary mb-1">Benefits & Perks</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Highlight what makes this opportunity attractive
            </p>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Select Benefits</Label>
                <div className="flex flex-wrap gap-2">
                  {benefits.map((benefit) => (
                    <Badge key={benefit} className="gap-1 pr-1 bg-success/10 text-success border-0">
                      {benefit}
                      <button
                        onClick={() => removeBenefit(benefit)}
                        className="ml-1 hover:bg-success/20 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {defaultBenefits
                  .filter((b) => !benefits.includes(b))
                  .map((benefit) => (
                    <button
                      key={benefit}
                      onClick={() => addBenefit(benefit)}
                      className="text-xs text-muted-foreground hover:text-foreground border border-dashed border-border rounded-full px-3 py-1 hover:border-success transition-colors"
                    >
                      + {benefit}
                    </button>
                  ))}
              </div>

              <div className="flex gap-2 mt-2">
                <Input
                  placeholder="Add custom benefit..."
                  value={newBenefit}
                  onChange={(e) => setNewBenefit(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addBenefit(newBenefit);
                    }
                  }}
                  className="flex-1"
                />
                <Button variant="outline" onClick={() => addBenefit(newBenefit)}>
                  Add
                </Button>
              </div>
            </div>
          </section>

          {/* Attachments */}
          <section className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold text-primary mb-1">Attachments</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Upload any relevant documents (job description PDF, company info, etc.)
            </p>

            <div
              onClick={handleFileUpload}
              className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors"
            >
              <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground">
                <span className="text-primary font-medium">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                PDF, DOC, DOCX up to 10MB
              </p>
            </div>

            {attachments.length > 0 && (
              <div className="mt-4 space-y-2">
                {attachments.map((file) => (
                  <div
                    key={file}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <span className="text-sm text-foreground">{file}</span>
                    <button
                      onClick={() => removeAttachment(file)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Actions */}
          <div className="flex justify-end gap-3 pb-8">
            <Button variant="outline" onClick={() => navigate("/listings")}>
              Cancel
            </Button>
            <Button variant="secondary" onClick={() => handleSubmit(true)}>
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
