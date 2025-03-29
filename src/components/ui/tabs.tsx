"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue: string;
  children: React.ReactNode;
}

const Tabs = ({ defaultValue, className, children, ...props }: TabsProps) => {
  const [activeTab, setActiveTab] = React.useState(defaultValue);
  
  // Kontext erstellen und verwenden anstatt Props direkt weiterzugeben
  const tabsContext = React.useMemo(() => ({ 
    activeTab, 
    setActiveTab 
  }), [activeTab, setActiveTab]);
  
  return (
    <TabsContext.Provider value={tabsContext}>
      <div className={cn("w-full", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

// Tabs Context für bessere Komponentenisolierung
type TabsContextType = {
  activeTab: string;
  setActiveTab: (value: string) => void;
};

const TabsContext = React.createContext<TabsContextType | undefined>(undefined);

// Hook für Zugriff auf Tabs-Kontext
const useTabsContext = () => {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs provider");
  }
  return context;
};

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const TabsList = ({ className, children, ...props }: TabsListProps) => {
  // Keine activeTab/setActiveTab Props mehr - nur noch Context
  return (
    <div 
      className={cn("inline-flex h-10 items-center justify-center rounded-md bg-slate-100 p-1 text-slate-500", className)} 
      {...props}
    >
      {children}
    </div>
  );
};

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const TabsTrigger = ({ value, className, children, ...props }: TabsTriggerProps) => {
  // Context verwenden anstatt Props
  const { activeTab, setActiveTab } = useTabsContext();
  
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
        activeTab === value 
          ? "bg-white text-slate-950 shadow-sm" 
          : "hover:bg-slate-50",
        className
      )}
      onClick={() => setActiveTab(value)}
      {...props}
    >
      {children}
    </button>
  );
};

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const TabsContent = ({ value, className, children, ...props }: TabsContentProps) => {
  // Context verwenden anstatt Props
  const { activeTab } = useTabsContext();
  
  if (activeTab !== value) return null;
  
  return (
    <div className={cn("mt-2", className)} {...props}>
      {children}
    </div>
  );
};

export { Tabs, TabsList, TabsTrigger, TabsContent };