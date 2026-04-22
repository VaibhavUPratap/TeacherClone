import { useState, useEffect } from "react";
import Login from "./pages/Login";
import ResourceDashboard from "./pages/ResourceDashboard";
import ConversationDashboard from "./conversation_dashboard/ConversationDashboard";
import LecturesDashboard from "./lectures_dashboard/LecturesDashboard";
import SlidesDashboard from "./slides_dashboard/SlidesDashboard";
import ClassdataDashboard from "./classdata_dashboard/ClassdataDashboard";
import ArchiveDashboard from "./archive_dashboard/ArchiveDashboard";

function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash || "#login");

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  switch (currentHash) {
    case "#resources":
      return <ResourceDashboard />;
    case "#conversations":
      return <ConversationDashboard />;
    case "#lectures":
      return <LecturesDashboard />;
    case "#slides":
      return <SlidesDashboard />;
    case "#data":
      return <ClassdataDashboard />;
    case "#archive":
      return <ArchiveDashboard />;
    case "#login":
    default:
      if (currentHash !== "" && currentHash !== "#login") {
        window.history.replaceState(null, "", "#login");
      }
      return <Login />;
  }
}

export default App;
