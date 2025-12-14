import { Briefcase, Users, Clock, TrendingUp } from "lucide-react";
import { Header } from "@/components/Header";
import { jobs } from "@/lib/data";

const stats = [
  {
    label: "Total Jobs",
    value: jobs.length,
    icon: Briefcase,
    change: "+2 this week",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    label: "Total Applicants",
    value: jobs.reduce((acc, job) => acc + job.applicants, 0),
    icon: Users,
    change: "+89 this week",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    label: "Active Listings",
    value: jobs.filter((j) => j.status === "Active").length,
    icon: Clock,
    change: "5 positions open",
    color: "text-info",
    bgColor: "bg-info/10",
  },
  {
    label: "Avg. Applicants",
    value: Math.round(jobs.reduce((acc, job) => acc + job.applicants, 0) / jobs.length),
    icon: TrendingUp,
    change: "per job posting",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Overview of your recruitment activity
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-card rounded-lg border border-border p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </span>
                <div className={`${stat.bgColor} p-2 rounded-lg`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </div>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="font-semibold text-foreground mb-4">Recent Applications</h3>
            <div className="space-y-4">
              {jobs.slice(0, 4).map((job) => (
                <div
                  key={job.id}
                  className="flex items-center justify-between py-3 border-b border-border last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className={`${job.color} h-9 w-9 rounded-lg flex items-center justify-center text-white text-xs font-semibold`}>
                      {job.initials}
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{job.title}</p>
                      <p className="text-xs text-muted-foreground">{job.department}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{job.newThisWeek}</p>
                    <p className="text-xs text-muted-foreground">new this week</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="font-semibold text-foreground mb-4">Top Performing Jobs</h3>
            <div className="space-y-4">
              {[...jobs]
                .sort((a, b) => b.applicants - a.applicants)
                .slice(0, 4)
                .map((job, i) => (
                  <div
                    key={job.id}
                    className="flex items-center justify-between py-3 border-b border-border last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-muted-foreground w-5">
                        #{i + 1}
                      </span>
                      <div>
                        <p className="font-medium text-foreground text-sm">{job.title}</p>
                        <p className="text-xs text-muted-foreground">{job.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">{job.applicants}</p>
                      <p className="text-xs text-muted-foreground">applicants</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
