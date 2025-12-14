import { NavLink } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const navItems = [
  { label: 'Dashboard', path: '/' },
  { label: 'New Job', path: '/new-job' },
  { label: 'Listings', path: '/listings' },
  { label: 'Applicants', path: '/applicants' },
  { label: 'Payments', path: '/payments' },
];

export function Header() {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <h1 className="text-xl font-bold text-primary">TalentHire</h1>
        
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? 'text-primary border-b-2 border-primary pb-1' : 'text-muted-foreground'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Avatar className="h-9 w-9 bg-primary">
          <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
            JD
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
