// src/components/elegant-dashboard.jsx
import React from 'react';
import {
  Bell,
  LayoutGrid,
  BarChart3,
  Settings,
  Calendar,
  Plus,
  ArrowUpRight,
  Download,
  Users,
  DollarSign,
  Activity
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer
} from 'recharts';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// --- Mock Data ---

const kpiData = [
  { title: "Total Revenue", value: "$45,231.89", change: "+20.1%", Icon: DollarSign },
  { title: "Subscriptions", value: "+2350", change: "+180.1%", Icon: Users },
  { title: "Active Now", value: "+573", change: "+201", Icon: Activity },
];

const chartData = [
  { name: 'Jan', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Feb', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Mar', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Apr', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'May', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Jun', total: Math.floor(Math.random() * 5000) + 1000 },
];

const navItems = [
  { label: "Dashboard", icon: LayoutGrid, active: true },
  { label: "Analytics", icon: BarChart3 },
  { label: "Schedule", icon: Calendar },
  { label: "Notifications", icon: Bell, notification: 3 },
  { label: "Settings", icon: Settings },
];

// --- Main Dashboard Component ---

export function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden w-16 flex-col items-center border-r bg-background sm:flex py-4">
          <TooltipProvider>
            <nav className="flex flex-col items-center gap-4 px-2">
              {navItems.map((item) => (
                <Tooltip key={item.label}>
                  <TooltipTrigger asChild>
                    <a
                      href="#"
                      className={`relative flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                        item.active
                          ? 'bg-muted text-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.notification && (
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                          {item.notification}
                        </span>
                      )}
                      <span className="sr-only">{item.label}</span>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent side="right">{item.label}</TooltipContent>
                </Tooltip>
              ))}
            </nav>
            <div className="mt-auto flex flex-col items-center gap-4 px-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://i.pravatar.cc/32" alt="@shadcn" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </TooltipProvider>
        </aside>

        {/* Main Content */}
        <main className="flex flex-1 flex-col gap-4 p-4 sm:p-6 lg:p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
            <div className="flex items-center gap-2">
              {/* This is a placeholder for a real date range picker */}
              {/* <DateRangePicker />  */}
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Download className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Download
                </span>
              </Button>
            </div>
          </div>
          
          {/* KPI Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {kpiData.map((kpi, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {kpi.title}
                  </CardTitle>
                  <kpi.Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{kpi.value}</div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                    <span className="text-green-500">{kpi.change}</span> from last month
                  </p>
                </CardContent>
              </Card>
            ))}
             <Card className="flex items-center justify-center border-2 border-dashed bg-transparent">
                <Button variant="ghost" className="w-full h-full">
                    <Plus className="h-6 w-6 text-muted-foreground mr-2" />
                    <span className="text-muted-foreground">Add Widget</span>
                </Button>
            </Card>
          </div>
          
          {/* Chart Card */}
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Efficiency Gains</CardTitle>
              <CardDescription>
                A visual representation of your team's efficiency over the last 6 months.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value/1000}K`}
                  />
                  <RechartsTooltip 
                    cursor={{ fill: 'rgba(140, 140, 140, 0.1)' }}
                    contentStyle={{ 
                      backgroundColor: '#1C1917', // A dark bg for the tooltip
                      borderColor: '#44403C',
                      borderRadius: '0.5rem'
                    }} 
                  />
                  <Bar dataKey="total" fill="url(#colorUv)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}