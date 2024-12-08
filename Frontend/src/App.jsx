import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/public/Home';
import About from './pages/public/About';
import Blog from './pages/public/Blog';
import Service from './pages/public/Service';
import Contact from './pages/public/Contact';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/admin/Dashboard';
import BlogsList from './pages/admin/BlogsList';
import BlogCreate from './pages/admin/BlogCreate';
import BlogEdit from './pages/admin/BlogEdit';
import BlogView from './pages/admin/BlogView';
import ServicesList from './pages/admin/ServicesList';
import ServiceCreate from './pages/admin/ServiceCreate';
import ServiceEdit from './pages/admin/ServiceEdit';
import ServiceView from './pages/admin/ServiceView';
import TeamList from './pages/admin/TeamList';
import TeamCreate from './pages/admin/TeamCreate';
import TeamEdit from './pages/admin/TeamEdit';
import TeamView from './pages/admin/TeamView';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
      <Router>
        <div className="flex flex-col min-h-screen">
          {/* Header */}
          <Header />

          {/* Routes */}
          <div className="flex-grow">
            <Routes>
              {/* Public Pages */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/service" element={<Service />} />
              <Route path="/contact" element={<Contact />} />

              {/* Authentication Pages */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/blogs"
                element={
                  <ProtectedRoute>
                    <BlogsList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/blogs/create"
                element={
                  <ProtectedRoute>
                    <BlogCreate />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/blogs/edit/:id"
                element={
                  <ProtectedRoute>
                    <BlogEdit />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/blogs/:id"
                element={
                  <ProtectedRoute>
                    <BlogView />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/services"
                element={
                  <ProtectedRoute>
                    <ServicesList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/services/create"
                element={
                  <ProtectedRoute>
                    <ServiceCreate />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/services/edit/:id"
                element={
                  <ProtectedRoute>
                    <ServiceEdit />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/services/:id"
                element={
                  <ProtectedRoute>
                    <ServiceView />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/team"
                element={
                  <ProtectedRoute>
                    <TeamList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/team/create"
                element={
                  <ProtectedRoute>
                    <TeamCreate />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/team/edit/:id"
                element={
                  <ProtectedRoute>
                    <TeamEdit />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/team/:id"
                element={
                  <ProtectedRoute>
                    <TeamView />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>

          {/* Footer */}
          <Footer />
        </div>

        {/* Notification Container */}
        <ToastContainer />
      </Router>
  );
};

export default App;
