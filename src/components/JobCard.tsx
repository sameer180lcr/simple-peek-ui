import { Eye, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Job } from "@/lib/data";

interface JobCardProps {
  job: Job;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
}

export function JobCard({ job, onView, onEdit }: JobCardProps) {
  const formatSalary = (min: number, max: number) => {
    return `$${(min / 1000).toFixed(0)}k - $${(max / 1000).toFixed(0)}k`;
  };

  const getStatusColor = (status: Job['status']) => {
    switch (status) {
      case 'Active':
        return 'text-success';
      case 'Paused':
        return 'text-yellow-500';
      case 'Closed':
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4 mb-4">
        <div className={`${job.color} h-11 w-11 rounded-lg flex items-center justify-center text-white font-semibold text-sm`}>
          {job.initials}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{job.title}</h3>
          <p className="text-sm text-muted-foreground">
            {job.department} • {job.location}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <Badge variant="secondary" className="bg-info/10 text-info border-0 text-xs font-medium">
          {job.type}
        </Badge>
        {job.remote && (
          <Badge variant="secondary" className="bg-success/10 text-success border-0 text-xs font-medium">
            Remote
          </Badge>
        )}
      </div>

      <div className="flex items-center justify-between mb-4">
        <div>
          <span className={`text-sm font-medium flex items-center gap-1.5 ${getStatusColor(job.status)}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${job.status === 'Active' ? 'bg-success' : job.status === 'Paused' ? 'bg-yellow-500' : 'bg-muted-foreground'}`} />
            {job.status}
          </span>
          <p className="text-xs text-muted-foreground mt-0.5">Posted: {job.postedDate}</p>
        </div>
        <div className="text-right">
          <p className="font-semibold text-foreground">{formatSalary(job.salaryMin, job.salaryMax)}</p>
          <p className="text-xs text-muted-foreground">Yearly Salary</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-info">{job.newThisWeek}+</span>
          <span className="text-xs font-medium text-success">{job.applicants - job.newThisWeek}</span>
        </div>
        <div className="text-right">
          <p className="font-semibold text-foreground">{job.applicants} <span className="font-normal text-muted-foreground text-sm">applicants</span></p>
          <p className="text-xs text-muted-foreground">{job.newThisWeek} new this week</p>
        </div>
      </div>

      <div className="flex gap-3 mt-4">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => onView(job.id)}
        >
          <Eye className="h-4 w-4 mr-2" />
          View
        </Button>
        <Button 
          className="flex-1"
          onClick={() => onEdit(job.id)}
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
      </div>
    </div>
  );
}
