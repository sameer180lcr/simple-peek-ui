export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  remote: boolean;
  status: 'Active' | 'Paused' | 'Closed';
  salaryMin: number;
  salaryMax: number;
  postedDate: string;
  applicants: number;
  newThisWeek: number;
  initials: string;
  color: string;
}

export const jobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'San Francisco, CA',
    type: 'Full-time',
    remote: true,
    status: 'Active',
    salaryMin: 90000,
    salaryMax: 130000,
    postedDate: 'May 15, 2023',
    applicants: 42,
    newThisWeek: 24,
    initials: 'FD',
    color: 'bg-primary'
  },
  {
    id: '2',
    title: 'Product Designer',
    department: 'Design',
    location: 'New York, NY',
    type: 'Full-time',
    remote: true,
    status: 'Active',
    salaryMin: 85000,
    salaryMax: 120000,
    postedDate: 'May 18, 2023',
    applicants: 38,
    newThisWeek: 15,
    initials: 'PD',
    color: 'bg-success'
  },
  {
    id: '3',
    title: 'Backend Engineer',
    department: 'Engineering',
    location: 'Austin, TX',
    type: 'Full-time',
    remote: false,
    status: 'Active',
    salaryMin: 95000,
    salaryMax: 140000,
    postedDate: 'May 20, 2023',
    applicants: 29,
    newThisWeek: 12,
    initials: 'BE',
    color: 'bg-info'
  },
  {
    id: '4',
    title: 'Marketing Manager',
    department: 'Marketing',
    location: 'Remote',
    type: 'Full-time',
    remote: true,
    status: 'Paused',
    salaryMin: 75000,
    salaryMax: 100000,
    postedDate: 'May 10, 2023',
    applicants: 56,
    newThisWeek: 0,
    initials: 'MM',
    color: 'bg-destructive'
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    department: 'Engineering',
    location: 'Seattle, WA',
    type: 'Contract',
    remote: true,
    status: 'Active',
    salaryMin: 110000,
    salaryMax: 150000,
    postedDate: 'May 22, 2023',
    applicants: 18,
    newThisWeek: 8,
    initials: 'DO',
    color: 'bg-primary'
  },
  {
    id: '6',
    title: 'HR Specialist',
    department: 'Human Resources',
    location: 'Chicago, IL',
    type: 'Part-time',
    remote: false,
    status: 'Closed',
    salaryMin: 45000,
    salaryMax: 60000,
    postedDate: 'Apr 28, 2023',
    applicants: 67,
    newThisWeek: 0,
    initials: 'HR',
    color: 'bg-success'
  },
  {
    id: '7',
    title: 'Data Analyst',
    department: 'Analytics',
    location: 'Boston, MA',
    type: 'Full-time',
    remote: true,
    status: 'Active',
    salaryMin: 70000,
    salaryMax: 95000,
    postedDate: 'May 25, 2023',
    applicants: 33,
    newThisWeek: 19,
    initials: 'DA',
    color: 'bg-info'
  },
  {
    id: '8',
    title: 'UX Researcher',
    department: 'Design',
    location: 'Los Angeles, CA',
    type: 'Full-time',
    remote: true,
    status: 'Active',
    salaryMin: 80000,
    salaryMax: 110000,
    postedDate: 'May 27, 2023',
    applicants: 21,
    newThisWeek: 11,
    initials: 'UX',
    color: 'bg-primary'
  }
];
