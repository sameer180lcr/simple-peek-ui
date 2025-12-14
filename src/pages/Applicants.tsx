import { Header } from "@/components/Header";
import { jobs } from "@/lib/data";

const applicants = [
  { id: 1, name: "Sarah Chen", role: "Senior Frontend Developer", status: "Interview", avatar: "SC", date: "Dec 12, 2024" },
  { id: 2, name: "Michael Brown", role: "Product Designer", status: "Review", avatar: "MB", date: "Dec 11, 2024" },
  { id: 3, name: "Emily Davis", role: "Backend Engineer", status: "New", avatar: "ED", date: "Dec 10, 2024" },
  { id: 4, name: "James Wilson", role: "DevOps Engineer", status: "Interview", avatar: "JW", date: "Dec 9, 2024" },
  { id: 5, name: "Lisa Anderson", role: "Data Analyst", status: "Offer", avatar: "LA", date: "Dec 8, 2024" },
];

const getStatusStyle = (status: string) => {
  switch (status) {
    case "New":
      return "bg-info/10 text-info";
    case "Review":
      return "bg-primary/10 text-primary";
    case "Interview":
      return "bg-success/10 text-success";
    case "Offer":
      return "bg-success text-success-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export default function Applicants() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground">Applicants</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Review and manage candidate applications
          </p>
        </div>

        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Candidate
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Applied For
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Applied Date
                </th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((applicant) => (
                <tr
                  key={applicant.id}
                  className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary h-9 w-9 rounded-full flex items-center justify-center text-primary-foreground text-xs font-semibold">
                        {applicant.avatar}
                      </div>
                      <span className="font-medium text-foreground">{applicant.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {applicant.role}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusStyle(applicant.status)}`}>
                      {applicant.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {applicant.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
