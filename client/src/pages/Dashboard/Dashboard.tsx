// client\src\pages\Dashboard\Dashboard.tsx
import AppLayout from "@/components/layouts/AppLayout";
import DashboardChatView from "./DashboardChatView";
import DashboardDefault from "./DashboardDefault"; // your main AI summary UI
import { useChat } from "@/contexts/ChatContext";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const Dashboard = () => {
    const { activeChatId, setActiveChatId } = useChat();
    const [searchParams] = useSearchParams();

    // Sync URL → Context on load
    useEffect(() => {
        const chatIdFromUrl = searchParams.get("chat");
        if (chatIdFromUrl && chatIdFromUrl !== activeChatId) {
            setActiveChatId(chatIdFromUrl);
        } else if (!chatIdFromUrl && activeChatId) {
            setActiveChatId(null);
        }
    }, [searchParams, activeChatId, setActiveChatId]);

    // Optional: Sync Context → URL (advanced, requires navigation)
    // Usually not needed unless you want deep links

    return (
        <AppLayout>
            {activeChatId ? <DashboardChatView /> : <DashboardDefault />}
        </AppLayout>
    );
};

export default Dashboard;
