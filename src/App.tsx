import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import AdminAuthProvider from '@/admin/AdminAuthProvider';
import AdminLoginPage from '@/admin/AdminLoginPage';
import AdminPage from '@/admin/AdminPage';
import RequireAdmin from '@/admin/RequireAdmin';

function AdminLayout() {
  return (
    <AdminAuthProvider>
      <Outlet />
    </AdminAuthProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<AdminLayout />}>
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <AdminPage />
              </RequireAdmin>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
