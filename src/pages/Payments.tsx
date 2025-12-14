import { useState } from "react";
import { Header } from "@/components/Header";
import { 
  CreditCard, Download, Check, Plus, Trash2, Building, User, 
  Wallet, TrendingUp, Users, Clock, DollarSign, ArrowUpRight, ArrowDownLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { toast } from "sonner";

const creditPackages = [
  { id: 1, credits: 100, price: 99, popular: false, bonus: 0 },
  { id: 2, credits: 250, price: 225, popular: true, bonus: 25 },
  { id: 3, credits: 500, price: 400, popular: false, bonus: 75 },
  { id: 4, credits: 1000, price: 750, popular: false, bonus: 200 },
];

const usageHistory = [
  { id: 1, type: "hire", expert: "Sarah Chen", role: "Senior React Developer", credits: 50, date: "Dec 10, 2024", status: "completed" },
  { id: 2, type: "hire", expert: "Mike Johnson", role: "UI/UX Designer", credits: 35, date: "Dec 8, 2024", status: "active" },
  { id: 3, type: "deposit", amount: 250, credits: 275, date: "Dec 5, 2024", status: "completed" },
  { id: 4, type: "hire", expert: "Emily Davis", role: "Backend Engineer", credits: 45, date: "Dec 1, 2024", status: "completed" },
  { id: 5, type: "deposit", amount: 100, credits: 100, date: "Nov 25, 2024", status: "completed" },
  { id: 6, type: "hire", expert: "Alex Turner", role: "DevOps Specialist", credits: 40, date: "Nov 20, 2024", status: "completed" },
];

const paymentMethods = [
  { id: 1, type: "Visa", last4: "4242", expiry: "12/26", primary: true },
  { id: 2, type: "Mastercard", last4: "8888", expiry: "06/25", primary: false },
];

const invoices = [
  { id: "INV-001", date: "Dec 5, 2024", amount: "$225.00", credits: 275, status: "Paid" },
  { id: "INV-002", date: "Nov 25, 2024", amount: "$99.00", credits: 100, status: "Paid" },
  { id: "INV-003", date: "Nov 1, 2024", amount: "$400.00", credits: 575, status: "Paid" },
  { id: "INV-004", date: "Oct 15, 2024", amount: "$225.00", credits: 275, status: "Paid" },
];

export default function Payments() {
  const [methods, setMethods] = useState(paymentMethods);
  const [showAddCard, setShowAddCard] = useState(false);
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [billingType, setBillingType] = useState<"personal" | "company">("company");
  const [setAsDefault, setSetAsDefault] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<number | null>(2);
  const [customAmount, setCustomAmount] = useState("");
  const [balance, setBalance] = useState(345);

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

  const handleAddFunds = () => {
    const pkg = creditPackages.find(p => p.id === selectedPackage);
    if (pkg) {
      const totalCredits = pkg.credits + pkg.bonus;
      setBalance(prev => prev + totalCredits);
      toast.success(`Added ${totalCredits} credits to your account`);
      setShowAddFunds(false);
    } else if (customAmount) {
      const credits = parseInt(customAmount);
      setBalance(prev => prev + credits);
      toast.success(`Added ${credits} credits to your account`);
      setShowAddFunds(false);
      setCustomAmount("");
    }
  };

  const activeHires = usageHistory.filter(u => u.type === "hire" && u.status === "active").length;
  const totalSpent = usageHistory.filter(u => u.type === "hire").reduce((sum, u) => sum + (u.credits || 0), 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground">Payments & Credits</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Manage your credits, hire experts, and track your spending
          </p>
        </div>

        {/* Balance & Stats Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-lg border border-border p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Available Credits</span>
              <Wallet className="h-5 w-5 text-primary" />
            </div>
            <p className="text-3xl font-bold text-foreground">{balance}</p>
            <div className="flex items-center gap-2 mt-2">
              <Progress value={(balance / 500) * 100} className="h-1.5 flex-1" />
              <span className="text-xs text-muted-foreground">of 500</span>
            </div>
          </div>

          <div className="bg-card rounded-lg border border-border p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Active Hires</span>
              <Users className="h-5 w-5 text-success" />
            </div>
            <p className="text-3xl font-bold text-foreground">{activeHires}</p>
            <p className="text-xs text-muted-foreground mt-2">Currently working with you</p>
          </div>

          <div className="bg-card rounded-lg border border-border p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Credits Used</span>
              <TrendingUp className="h-5 w-5 text-warning" />
            </div>
            <p className="text-3xl font-bold text-foreground">{totalSpent}</p>
            <p className="text-xs text-muted-foreground mt-2">This month</p>
          </div>

          <div className="bg-card rounded-lg border border-border p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Avg. Cost/Hire</span>
              <DollarSign className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-3xl font-bold text-foreground">42</p>
            <p className="text-xs text-muted-foreground mt-2">Credits per expert</p>
          </div>
        </div>

        {/* Add Funds CTA */}
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-lg border border-primary/20 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-foreground text-lg">Need more credits?</h3>
              <p className="text-muted-foreground text-sm mt-1">
                Add funds to hire more experts. Get up to 20% bonus credits on larger packages.
              </p>
            </div>
            <Dialog open={showAddFunds} onOpenChange={setShowAddFunds}>
              <DialogTrigger asChild>
                <Button size="lg" className="shrink-0">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Credits
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Add Credits</DialogTitle>
                  <DialogDescription>
                    Choose a package or enter a custom amount
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="grid grid-cols-2 gap-3">
                    {creditPackages.map((pkg) => (
                      <button
                        key={pkg.id}
                        onClick={() => {
                          setSelectedPackage(pkg.id);
                          setCustomAmount("");
                        }}
                        className={`relative p-4 rounded-lg border text-left transition-all ${
                          selectedPackage === pkg.id
                            ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        {pkg.popular && (
                          <Badge className="absolute -top-2 right-2 text-xs">Popular</Badge>
                        )}
                        <p className="font-bold text-foreground text-xl">{pkg.credits}</p>
                        <p className="text-xs text-muted-foreground">credits</p>
                        <div className="mt-2 pt-2 border-t border-border">
                          <p className="font-semibold text-foreground">${pkg.price}</p>
                          {pkg.bonus > 0 && (
                            <p className="text-xs text-success">+{pkg.bonus} bonus</p>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="bg-background px-2 text-muted-foreground">or custom amount</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Input
                      type="number"
                      placeholder="Enter credits amount"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setSelectedPackage(null);
                      }}
                    />
                    <div className="flex items-center text-sm text-muted-foreground whitespace-nowrap">
                      = ${customAmount ? (parseInt(customAmount) * 0.99).toFixed(2) : "0.00"}
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Payment Method</span>
                      <span className="font-medium text-foreground">
                        {methods.find(m => m.primary)?.type} •••• {methods.find(m => m.primary)?.last4}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <Button variant="outline" onClick={() => setShowAddFunds(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddFunds} disabled={!selectedPackage && !customAmount}>
                      <CreditCard className="h-4 w-4 mr-2" />
                      Add Credits
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="usage" className="mb-8">
          <TabsList>
            <TabsTrigger value="usage">Usage History</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="methods">Payment Methods</TabsTrigger>
            <TabsTrigger value="billing">Billing Info</TabsTrigger>
          </TabsList>

          {/* Usage History Tab */}
          <TabsContent value="usage" className="mt-6">
            <div className="bg-card rounded-lg border border-border">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Transaction History</h3>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="hire">Hires Only</SelectItem>
                    <SelectItem value="deposit">Deposits Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="divide-y divide-border">
                {usageHistory.map((item) => (
                  <div key={item.id} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${
                        item.type === "deposit" 
                          ? "bg-success/10 text-success" 
                          : "bg-primary/10 text-primary"
                      }`}>
                        {item.type === "deposit" ? (
                          <ArrowDownLeft className="h-5 w-5" />
                        ) : (
                          <ArrowUpRight className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        {item.type === "hire" ? (
                          <>
                            <p className="font-medium text-foreground">{item.expert}</p>
                            <p className="text-sm text-muted-foreground">{item.role}</p>
                          </>
                        ) : (
                          <>
                            <p className="font-medium text-foreground">Credits Added</p>
                            <p className="text-sm text-muted-foreground">Paid ${item.amount}</p>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        item.type === "deposit" ? "text-success" : "text-foreground"
                      }`}>
                        {item.type === "deposit" ? "+" : "-"}{item.credits} credits
                      </p>
                      <div className="flex items-center gap-2 justify-end">
                        <span className="text-xs text-muted-foreground">{item.date}</span>
                        {item.status === "active" && (
                          <Badge variant="secondary" className="text-xs bg-warning/10 text-warning border-0">
                            Active
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Invoices Tab */}
          <TabsContent value="invoices" className="mt-6">
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
                      <th className="text-left py-3 text-xs font-medium text-muted-foreground uppercase">Invoice</th>
                      <th className="text-left py-3 text-xs font-medium text-muted-foreground uppercase">Date</th>
                      <th className="text-left py-3 text-xs font-medium text-muted-foreground uppercase">Credits</th>
                      <th className="text-left py-3 text-xs font-medium text-muted-foreground uppercase">Amount</th>
                      <th className="text-left py-3 text-xs font-medium text-muted-foreground uppercase">Status</th>
                      <th className="text-right py-3 text-xs font-medium text-muted-foreground uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice) => (
                      <tr key={invoice.id} className="border-b border-border last:border-0">
                        <td className="py-3 font-medium text-foreground text-sm">{invoice.id}</td>
                        <td className="py-3 text-sm text-muted-foreground">{invoice.date}</td>
                        <td className="py-3 text-sm text-foreground">{invoice.credits} credits</td>
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
          </TabsContent>

          {/* Payment Methods Tab */}
          <TabsContent value="methods" className="mt-6">
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
                            <Badge variant="secondary" className="ml-2 text-xs">Default</Badge>
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground">Expires {method.expiry}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!method.primary && (
                        <Button variant="ghost" size="sm" onClick={() => setPrimary(method.id)}>
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
          </TabsContent>

          {/* Billing Info Tab */}
          <TabsContent value="billing" className="mt-6">
            <div className="grid lg:grid-cols-2 gap-6">
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

              <div className="space-y-6">
                <div className="bg-card rounded-lg border border-border p-6">
                  <h3 className="font-semibold text-foreground mb-4">Credit Rates</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-border">
                      <span className="text-sm text-muted-foreground">Junior Expert</span>
                      <span className="font-medium text-foreground">25-35 credits</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-border">
                      <span className="text-sm text-muted-foreground">Mid-Level Expert</span>
                      <span className="font-medium text-foreground">35-50 credits</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-border">
                      <span className="text-sm text-muted-foreground">Senior Expert</span>
                      <span className="font-medium text-foreground">50-75 credits</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-muted-foreground">Lead / Specialist</span>
                      <span className="font-medium text-foreground">75-100 credits</span>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-lg border border-border p-6">
                  <h3 className="font-semibold text-foreground mb-2">Need Help?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Contact our support team for billing questions or credit issues.
                  </p>
                  <Button variant="outline" className="w-full">Contact Support</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
