import { Header } from "@/components/Header";
import { CreditCard, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const invoices = [
  { id: "INV-001", date: "Dec 1, 2024", amount: "$299.00", status: "Paid" },
  { id: "INV-002", date: "Nov 1, 2024", amount: "$299.00", status: "Paid" },
  { id: "INV-003", date: "Oct 1, 2024", amount: "$299.00", status: "Paid" },
  { id: "INV-004", date: "Sep 1, 2024", amount: "$199.00", status: "Paid" },
];

export default function Payments() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground">Payments</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Manage your billing and payment methods
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-card rounded-lg border border-border p-6 mb-6">
              <h3 className="font-semibold text-foreground mb-4">Current Plan</h3>
              <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div>
                  <p className="font-semibold text-foreground">Professional Plan</p>
                  <p className="text-sm text-muted-foreground">Up to 25 active job listings</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-foreground">$299</p>
                  <p className="text-xs text-muted-foreground">per month</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="font-semibold text-foreground mb-4">Billing History</h3>
              <div className="space-y-3">
                {invoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="flex items-center justify-between py-3 border-b border-border last:border-0"
                  >
                    <div>
                      <p className="font-medium text-foreground">{invoice.id}</p>
                      <p className="text-xs text-muted-foreground">{invoice.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-semibold text-foreground">{invoice.amount}</span>
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-success/10 text-success">
                        {invoice.status}
                      </span>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="font-semibold text-foreground mb-4">Payment Method</h3>
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="bg-foreground/10 p-2 rounded">
                  <CreditCard className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">•••• •••• •••• 4242</p>
                  <p className="text-xs text-muted-foreground">Expires 12/26</p>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                Update Payment Method
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
