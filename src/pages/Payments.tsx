import { useState } from "react";
import { Header } from "@/components/Header";
import { CreditCard, Download, Check, Plus, Trash2, Building, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const invoices = [
  { id: "INV-001", date: "Dec 1, 2024", amount: "$299.00", status: "Paid", plan: "Professional" },
  { id: "INV-002", date: "Nov 1, 2024", amount: "$299.00", status: "Paid", plan: "Professional" },
  { id: "INV-003", date: "Oct 1, 2024", amount: "$299.00", status: "Paid", plan: "Professional" },
  { id: "INV-004", date: "Sep 1, 2024", amount: "$199.00", status: "Paid", plan: "Starter" },
  { id: "INV-005", date: "Aug 1, 2024", amount: "$199.00", status: "Paid", plan: "Starter" },
];

const plans = [
  {
    name: "Starter",
    price: 199,
    features: ["Up to 10 active listings", "Basic analytics", "Email support", "Standard templates"],
    current: false,
  },
  {
    name: "Professional",
    price: 299,
    features: ["Up to 25 active listings", "Advanced analytics", "Priority support", "Custom branding", "API access"],
    current: true,
  },
  {
    name: "Enterprise",
    price: 499,
    features: ["Unlimited listings", "Custom analytics", "Dedicated support", "White-label solution", "SSO integration", "Custom integrations"],
    current: false,
  },
];

const paymentMethods = [
  { id: 1, type: "Visa", last4: "4242", expiry: "12/26", primary: true },
  { id: 2, type: "Mastercard", last4: "8888", expiry: "06/25", primary: false },
];

export default function Payments() {
  const [methods, setMethods] = useState(paymentMethods);
  const [showAddCard, setShowAddCard] = useState(false);
  const [billingType, setBillingType] = useState<"personal" | "company">("company");
  const [setAsDefault, setSetAsDefault] = useState(false);

  const setPrimary = (id: number) => {
    setMethods(methods.map(m => ({ ...m, primary: m.id === id })));
    toast.success("Default payment method updated");
  };

  const removeMethod = (id: number) => {
    const method = methods.find(m => m.id === id);
    if (method?.primary) {
      toast.error("Cannot remove primary payment method");
      return;
    }
    setMethods(methods.filter(m => m.id !== id));
    toast.success("Payment method removed");
  };

  const handleAddCard = () => {
    const newMethod = {
      id: Date.now(),
      type: "Visa",
      last4: String(Math.floor(1000 + Math.random() * 9000)),
      expiry: "12/28",
      primary: setAsDefault || methods.length === 0,
    };
    if (setAsDefault) {
      setMethods([...methods.map(m => ({ ...m, primary: false })), newMethod]);
    } else {
      setMethods([...methods, newMethod]);
    }
    setShowAddCard(false);
    setSetAsDefault(false);
    toast.success("Payment method added successfully");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground">Payments & Billing</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Manage your subscription, payment methods, and billing information
          </p>
        </div>

        {/* Plans Section */}
        <section className="mb-8">
          <h3 className="font-semibold text-foreground mb-4">Subscription Plans</h3>
          <div className="grid md:grid-cols-3 gap-5">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`bg-card rounded-lg border p-6 relative ${
                  plan.current ? "border-primary ring-2 ring-primary/20" : "border-border"
                }`}
              >
                {plan.current && (
                  <Badge className="absolute -top-2.5 left-4 bg-primary">Current Plan</Badge>
                )}
                <h4 className="font-semibold text-foreground text-lg">{plan.name}</h4>
                <div className="mt-2 mb-4">
                  <span className="text-3xl font-bold text-foreground">${plan.price}</span>
                  <span className="text-muted-foreground text-sm">/month</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-success flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.current ? "secondary" : "outline"}
                  className="w-full"
                  disabled={plan.current}
                >
                  {plan.current ? "Current Plan" : "Upgrade"}
                </Button>
              </div>
            ))}
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Payment Methods */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Payment Methods</h3>
                <Dialog open={showAddCard} onOpenChange={setShowAddCard}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Card
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Payment Method</DialogTitle>
                      <DialogDescription>
                        Add a new credit or debit card to your account.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label>Card Number</Label>
                        <Input placeholder="1234 5678 9012 3456" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Expiry Date</Label>
                          <Input placeholder="MM/YY" />
                        </div>
                        <div className="space-y-2">
                          <Label>CVC</Label>
                          <Input placeholder="123" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Cardholder Name</Label>
                        <Input placeholder="John Doe" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="setDefault"
                          checked={setAsDefault}
                          onCheckedChange={(v) => setSetAsDefault(v as boolean)}
                        />
                        <Label htmlFor="setDefault" className="text-sm font-normal">
                          Set as default payment method
                        </Label>
                      </div>
                      <div className="flex justify-end gap-3 pt-4">
                        <Button variant="outline" onClick={() => setShowAddCard(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddCard}>Add Card</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-3">
                {methods.map((method) => (
                  <div
                    key={method.id}
                    className={`flex items-center justify-between p-4 rounded-lg border ${
                      method.primary ? "border-primary bg-primary/5" : "border-border"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-foreground/10 p-2 rounded">
                        <CreditCard className="h-5 w-5 text-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">
                          {method.type} •••• {method.last4}
                          {method.primary && (
                            <Badge variant="secondary" className="ml-2 text-xs">
                              Default
                            </Badge>
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground">Expires {method.expiry}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!method.primary && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setPrimary(method.id)}
                        >
                          Set Default
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => removeMethod(method.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Billing History */}
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Billing History</h3>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 text-xs font-medium text-muted-foreground uppercase">
                        Invoice
                      </th>
                      <th className="text-left py-3 text-xs font-medium text-muted-foreground uppercase">
                        Date
                      </th>
                      <th className="text-left py-3 text-xs font-medium text-muted-foreground uppercase">
                        Plan
                      </th>
                      <th className="text-left py-3 text-xs font-medium text-muted-foreground uppercase">
                        Amount
                      </th>
                      <th className="text-left py-3 text-xs font-medium text-muted-foreground uppercase">
                        Status
                      </th>
                      <th className="text-right py-3 text-xs font-medium text-muted-foreground uppercase">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice) => (
                      <tr key={invoice.id} className="border-b border-border last:border-0">
                        <td className="py-3 font-medium text-foreground text-sm">{invoice.id}</td>
                        <td className="py-3 text-sm text-muted-foreground">{invoice.date}</td>
                        <td className="py-3 text-sm text-muted-foreground">{invoice.plan}</td>
                        <td className="py-3 font-semibold text-foreground">{invoice.amount}</td>
                        <td className="py-3">
                          <Badge variant="secondary" className="bg-success/10 text-success border-0">
                            {invoice.status}
                          </Badge>
                        </td>
                        <td className="py-3 text-right">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Download className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Billing Information */}
          <div className="space-y-6">
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="font-semibold text-foreground mb-4">Billing Information</h3>
              
              <div className="flex gap-2 mb-4">
                <Button
                  variant={billingType === "personal" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setBillingType("personal")}
                  className="flex-1"
                >
                  <User className="h-4 w-4 mr-2" />
                  Personal
                </Button>
                <Button
                  variant={billingType === "company" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setBillingType("company")}
                  className="flex-1"
                >
                  <Building className="h-4 w-4 mr-2" />
                  Company
                </Button>
              </div>

              <div className="space-y-4">
                {billingType === "company" && (
                  <div className="space-y-2">
                    <Label>Company Name</Label>
                    <Input defaultValue="TalentHire Inc." />
                  </div>
                )}
                <div className="space-y-2">
                  <Label>{billingType === "company" ? "Contact Name" : "Full Name"}</Label>
                  <Input defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" defaultValue="john@talenthire.com" />
                </div>
                <div className="space-y-2">
                  <Label>Address</Label>
                  <Input defaultValue="123 Business Ave" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label>City</Label>
                    <Input defaultValue="San Francisco" />
                  </div>
                  <div className="space-y-2">
                    <Label>ZIP</Label>
                    <Input defaultValue="94102" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Country</Label>
                  <Select defaultValue="us">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="de">Germany</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {billingType === "company" && (
                  <div className="space-y-2">
                    <Label>Tax ID / VAT Number</Label>
                    <Input placeholder="Optional" />
                  </div>
                )}
                <Button className="w-full mt-2">Save Changes</Button>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="font-semibold text-foreground mb-2">Need Help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Contact our billing support team for any questions.
              </p>
              <Button variant="outline" className="w-full">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
