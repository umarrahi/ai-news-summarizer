import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { 
  Clock,
  FileText,
  Sparkles
} from "lucide-react";
import { HistoryItem } from "@/types";

// Mock history data
const historyItems: HistoryItem[] = [
  { 
    id: '1',
    title: "AI Revolution in Healthcare", 
    preview: "Revolutionary AI models are transforming medical diagnostics and treatment planning...",
    date: "2 hours ago",
    isPremium: true
  },
  { 
    id: '2',
    title: "Climate Change Solutions", 
    preview: "New renewable energy technologies show promising results in reducing carbon emissions...",
    date: "1 day ago",
    isPremium: false
  },
  { 
    id: '3',
    title: "Space Exploration Update", 
    preview: "Latest Mars mission discoveries reveal potential signs of ancient water activity...",
    date: "3 days ago",
    isPremium: true
  },
  { 
    id: '4',
    title: "Tech Industry Trends", 
    preview: "Emerging technologies reshape the future of work and digital transformation...",
    date: "1 week ago",
    isPremium: false
  },
];

const AppSidebar = () => {
  const { state } = useSidebar();
  const location = useLocation();
  const collapsed = state === "collapsed";

  return (
    <Sidebar
      className={`${collapsed ? "w-14" : "w-64"} transition-all duration-300`}
      collapsible="icon"
    >
      <SidebarContent className="bg-sidebar border-r border-sidebar-border flex flex-col h-full">
        {/* Logo Header */}
        <div className="h-16 p-6 border-b border-sidebar-border flex items-center">
          {!collapsed ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-bold text-sidebar-foreground">NewsAI</h2>
              </div>
            </div>
          ) : (
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
          )}
        </div>

        {/* History Section */}
        <div className="flex-1 overflow-hidden">
          <SidebarGroup className="p-4">
            {!collapsed && (
              <SidebarGroupLabel className="text-sidebar-foreground/70 font-medium mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Recent History
              </SidebarGroupLabel>
            )}

            <SidebarGroupContent>
              <SidebarMenu className="space-y-2">
                {historyItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton 
                      className="hover:bg-sidebar-accent text-sidebar-foreground transition-colors rounded-lg p-3 h-auto cursor-pointer"
                    >
                      <div className="flex items-start gap-3 w-full">
                        <div className="relative">
                          <FileText className={`w-4 h-4 mt-0.5 flex-shrink-0 ${collapsed ? "mx-auto" : ""}`} />
                          {item.isPremium && !collapsed && (
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></div>
                          )}
                        </div>
                        {!collapsed && (
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-sidebar-foreground truncate">
                              {item.title}
                            </p>
                            <p className="text-xs text-sidebar-foreground/60 line-clamp-2 mt-1">
                              {item.preview}
                            </p>
                            <p className="text-xs text-sidebar-foreground/40 mt-1">
                              {item.date}
                            </p>
                          </div>
                        )}
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        {/* App Version Footer */}
        <div className="p-4 border-t border-sidebar-border">
          {!collapsed ? (
            <div className="text-center">
              <p className="text-xs text-sidebar-foreground/50">NewsAI Dashboard</p>
              <p className="text-xs text-sidebar-foreground/40">Version 2.1.0</p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-xs text-sidebar-foreground/40">v2.1</p>
            </div>
          )}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;