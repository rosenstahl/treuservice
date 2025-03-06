"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue: string;
  children: React.ReactNode;
}

const Tabs = ({ defaultValue, className, children, ...props }: TabsProps) => {
  const [activeTab, setActiveTab] = React.useState(defaultValue);
  
  // Klonen der Kinder, um activeTab und setActiveTab Props zu übergeben
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      // Define an interface for the props you're passing to children
      interface TabChildProps {
        activeTab?: string;
        setActiveTab?: (value: string) => void;
        className?: string;
        children?: React.ReactNode;
      }

      // Use the interface in the cloneElement call
      return React.cloneElement(
        child as React.ReactElement<TabChildProps>, 
        { 
          activeTab: activeTab, 
          setActiveTab: setActiveTab 
        }
      );
    }
    return child;
  });
  
  return (
    <div className={cn("w-full", className)} {...props}>
      {childrenWithProps}
    </div>
  );
};

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  activeTab?: string;
  setActiveTab?: (value: string) => void;
}

const TabsList = ({ className, children, activeTab, setActiveTab, ...props }: TabsListProps) => {
  // Klonen der Kinder, um activeTab und setActiveTab Props zu übergeben
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      // Define an interface for the props you're passing to children
      interface TabChildProps {
        activeTab?: string;
        setActiveTab?: (value: string) => void;
        className?: string;
        children?: React.ReactNode;
      }

      // Use the interface in the cloneElement call
      return React.cloneElement(
        child as React.ReactElement<TabChildProps>, 
        { 
          activeTab: activeTab, 
          setActiveTab: setActiveTab 
        }
      );
    }
    return child;
  });
  
  return (
    <div 
      className={cn("inline-flex h-10 items-center justify-center rounded-md bg-slate-100 p-1 text-slate-500", className)} 
      {...props}
    >
      {childrenWithProps}
    </div>
  );
};

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  activeTab?: string;
  setActiveTab?: (value: string) => void;
}

const TabsTrigger = ({ value, activeTab, setActiveTab, className, children, ...props }: TabsTriggerProps) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
        activeTab === value 
          ? "bg-white text-slate-950 shadow-sm" 
          : "hover:bg-slate-50",
        className
      )}
      onClick={() => setActiveTab?.(value)}
      {...props}
    >
      {children}
    </button>
  );
};

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  activeTab?: string;
}

const TabsContent = ({ value, activeTab, className, children, ...props }: TabsContentProps) => {
  if (activeTab !== value) return null;
  
  return (
    <div className={cn("mt-2", className)} {...props}>
      {children}
    </div>
  );
};

export { Tabs, TabsList, TabsTrigger, TabsContent };