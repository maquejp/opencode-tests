import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { UserProvider, useUser } from "./contexts/UserContext";
import { TaskProvider } from "./contexts/TaskContext";
import { ProjectProvider } from "./contexts/ProjectContext";
import { RoleProvider } from "./contexts/RoleContext";
import Header from "./components/Header";
import TasksPage from "./pages/TasksPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import UsersPage from "./pages/UsersPage";
import RolesPage from "./pages/RolesPage";
import GanttPage from "./pages/GanttPage";
import LoginPage from "./pages/LoginPage";
import NotFoundView from "./pages/NotFoundView";

// Protected Route Wrapper Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, loading } = useUser();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const AppContent: React.FC = () => {
  const { currentUser, loading } = useUser();

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route 
        path="/login" 
        element={currentUser ? <Navigate to="/" replace /> : <LoginPage />} 
      />
      
      {/* Protected routes - require authentication */}
      <Route
        path="/*"
        element={
          currentUser ? (
            <div className="min-h-screen bg-gray-50">
              <Header />
              <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Routes>
                  <Route path="/" element={<TasksPage />} />
                  <Route path="/tasks" element={<TasksPage />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
                  <Route path="/projects/:projectId/gantt" element={<GanttPage />} />
                  <Route path="/users" element={<UsersPage />} />
                  <Route path="/roles" element={<RolesPage />} />
                  <Route path="*" element={<NotFoundView />} />
                </Routes>
              </main>
            </div>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <UserProvider>
      <ProjectProvider>
        <RoleProvider>
          <TaskProvider>
            <Router>
              <AppContent />
            </Router>
          </TaskProvider>
        </RoleProvider>
      </ProjectProvider>
    </UserProvider>
  );
};

export default App;
