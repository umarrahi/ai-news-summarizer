// // client\src\components\layouts\Sidebar.tsx
// import { useState } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   useSidebar,
// } from "@/components/ui/sidebar";
// import { 
//   Clock,
//   FileText,
//   Sparkles
// } from "lucide-react";
// import { HistoryItem } from "@/types";

// // Mock history data
// const historyItems: HistoryItem[] = [
//   { 
//     id: '1',
//     title: "AI Revolution in Healthcare", 
//     preview: "Revolutionary AI models are transforming medical diagnostics and treatment planning...",
//     date: "2 hours ago",
//     isPremium: true
//   },
//   { 
//     id: '2',
//     title: "Climate Change Solutions", 
//     preview: "New renewable energy technologies show promising results in reducing carbon emissions...",
//     date: "1 day ago",
//     isPremium: false
//   },
//   { 
//     id: '3',
//     title: "Space Exploration Update", 
//     preview: "Latest Mars mission discoveries reveal potential signs of ancient water activity...",
//     date: "3 days ago",
//     isPremium: true
//   },
//   { 
//     id: '4',
//     title: "Tech Industry Trends", 
//     preview: "Emerging technologies reshape the future of work and digital transformation...",
//     date: "1 week ago",
//     isPremium: false
//   },
// ];

// const AppSidebar = () => {
//   const { state } = useSidebar();
//   const location = useLocation();
//   const collapsed = state === "collapsed";

//   return (
//     <Sidebar
//       className={`${collapsed ? "w-14" : "w-64"} transition-all duration-300`}
//       collapsible="icon"
//     >
//       <SidebarContent className="bg-sidebar border-r border-sidebar-border flex flex-col h-full">
//         {/* Logo Header */}
//         <div className="h-16 p-6 border-b border-sidebar-border flex items-center">
//           {!collapsed ? (
//             <div className="flex items-center gap-3">
//               <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
//                 <Sparkles className="w-5 h-5 text-primary-foreground" />
//               </div>
//               <div>
//                 <h2 className="font-bold text-sidebar-foreground">NewsAI</h2>
//               </div>
//             </div>
//           ) : (
//             <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto">
//               <Sparkles className="w-5 h-5 text-primary-foreground" />
//             </div>
//           )}
//         </div>

//         {/* History Section */}
//         <div className="flex-1 overflow-hidden">
//           <SidebarGroup className="p-4">
//             {!collapsed && (
//               <SidebarGroupLabel className="text-sidebar-foreground/70 font-medium mb-3 flex items-center gap-2">
//                 <Clock className="w-4 h-4" />
//                 Recent History
//               </SidebarGroupLabel>
//             )}

//             <SidebarGroupContent>
//               <SidebarMenu className="space-y-2">
//                 {historyItems.map((item) => (
//                   <SidebarMenuItem key={item.id}>
//                     <SidebarMenuButton 
//                       className="hover:bg-sidebar-accent text-sidebar-foreground transition-colors rounded-lg p-3 h-auto cursor-pointer"
//                     >
//                       <div className="flex items-start gap-3 w-full">
//                         <div className="relative">
//                           <FileText className={`w-4 h-4 mt-0.5 flex-shrink-0 ${collapsed ? "mx-auto" : ""}`} />
//                           {item.isPremium && !collapsed && (
//                             <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></div>
//                           )}
//                         </div>
//                         {!collapsed && (
//                           <div className="flex-1 min-w-0">
//                             <p className="text-sm font-medium text-sidebar-foreground truncate">
//                               {item.title}
//                             </p>
//                             <p className="text-xs text-sidebar-foreground/60 line-clamp-2 mt-1">
//                               {item.preview}
//                             </p>
//                             <p className="text-xs text-sidebar-foreground/40 mt-1">
//                               {item.date}
//                             </p>
//                           </div>
//                         )}
//                       </div>
//                     </SidebarMenuButton>
//                   </SidebarMenuItem>
//                 ))}
//               </SidebarMenu>
//             </SidebarGroupContent>
//           </SidebarGroup>
//         </div>

//         {/* App Version Footer */}
//         <div className="p-4 border-t border-sidebar-border">
//           {!collapsed ? (
//             <div className="text-center">
//               <p className="text-xs text-sidebar-foreground/50">NewsAI Dashboard</p>
//               <p className="text-xs text-sidebar-foreground/40">Version 2.1.0</p>
//             </div>
//           ) : (
//             <div className="text-center">
//               <p className="text-xs text-sidebar-foreground/40">v2.1</p>
//             </div>
//           )}
//         </div>
//       </SidebarContent>
//     </Sidebar>
//   );
// }

// export default AppSidebar;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Sparkles,
  MoreVertical,
  Edit3,
  Trash2,
  Plus,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { deleteSummary, getAllSummaries, updateSummary } from "@/services/api/articleSummarizer";
import { Button } from "../ui/button";

interface SummaryItem {
  id: string;
  title: string;
  summary: string;
  createdAt: string;
}

const AppSidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const navigate = useNavigate();

  const [summaries, setSummaries] = useState<SummaryItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  // ✅ Fetch summaries from API
  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        const res = await getAllSummaries();
        setSummaries(res);
      } catch (err) {
        toast.error("Failed to load summaries");
      }
    };
    fetchSummaries();
  }, []);

  // ✅ Delete summary
  const handleDelete = async (id: string) => {
    try {
      await deleteSummary(id);
      setSummaries((prev) => prev.filter((s) => s.id !== id));
      toast.success("Summary deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  // ✅ Rename summary
  const handleRename = async (id: string) => {
    try {
      await updateSummary(id, { title: newTitle });
      setSummaries((prev) =>
        prev.map((s) => (s.id === id ? { ...s, title: newTitle } : s))
      );
      toast.success("Title updated");
      setEditingId(null);
    } catch {
      toast.error("Failed to rename");
    }
  };

  // ✅ Click summary → open chat
  const handleOpenSummary = (id: string) => {
    navigate(`/dashboard?chat=${id}`);
  };

  // ✅ Truncate text helper
  const truncate = (text: string | null | undefined, length: number): string => {
    if (!text) return ''; // or return '—', 'N/A', etc.
    return text.length > length ? text.slice(0, length) + "..." : text;
  };

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
              <h2 className="font-bold text-sidebar-foreground">NewsAI</h2>
            </div>
          ) : (
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
          )}
        </div>

        {/* Recent History */}
        <div className="flex-1 overflow-y-auto">
          <SidebarGroup className="p-4">
            <Button
              className="w-full mb-3"
              variant="default"
              onClick={() => setActiveChatId("new")}
            >
              <Plus className="w-4 h-4 mr-2" />
               New Summary
            </Button>

            {!collapsed && (
              <SidebarGroupLabel className="text-sidebar-foreground/70 font-medium mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Recent History
              </SidebarGroupLabel>
            )}

            <SidebarGroupContent>
              <SidebarMenu className="space-y-2">
                {summaries.length === 0 ? (
                  <p className="text-xs text-sidebar-foreground/50 px-3">
                    No summaries yet
                  </p>
                ) : (
                  summaries.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        className="hover:bg-sidebar-accent text-sidebar-foreground transition-colors rounded-lg p-3 h-auto cursor-pointer flex justify-between items-start"
                        onClick={() => handleOpenSummary(item.id)}
                      >
                        <div className="flex items-start gap-3 w-full">
                          <FileText className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          {!collapsed && (
                            <div className="flex-1 min-w-0">
                              {editingId === item.id ? (
                                <div className="flex gap-1 items-center">
                                  <Input
                                    value={newTitle}
                                    onChange={(e) =>
                                      setNewTitle(e.target.value)
                                    }
                                    onBlur={() => handleRename(item.id)}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter")
                                        handleRename(item.id);
                                    }}
                                    className="text-xs py-1"
                                    autoFocus
                                  />
                                </div>
                              ) : (
                                <>
                                  <p className="text-sm font-medium truncate">
                                    {truncate(item.title, 24)}
                                  </p>
                                  <p className="text-xs text-sidebar-foreground/60 line-clamp-2 mt-1">
                                    {truncate(item.summary, 83)}
                                  </p>
                                  <p className="text-xs text-sidebar-foreground/40 mt-1">
                                    {new Date(
                                      item.createdAt
                                    ).toLocaleDateString()}
                                  </p>
                                </>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Right-side dropdown */}
                        {!collapsed && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button
                                className="p-1 rounded hover:bg-sidebar-accent"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <MoreVertical className="w-4 h-4 text-muted-foreground" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEditingId(item.id);
                                  setNewTitle(item.title);
                                }}
                              >
                                <Edit3 className="w-4 h-4 mr-2" />
                                Rename
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete(item.id);
                                }}
                                className="text-destructive"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border text-center">
          {!collapsed ? (
            <>
              <p className="text-xs text-sidebar-foreground/50">
                NewsAI Dashboard
              </p>
              <p className="text-xs text-sidebar-foreground/40">Version 2.1.0</p>
            </>
          ) : (
            <p className="text-xs text-sidebar-foreground/40">v2.1</p>
          )}
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
