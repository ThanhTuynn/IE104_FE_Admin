// import React, { Fragment } from 'react'
// import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
// import routes from './routes/index'
// import DefaultComponent from './components/DefaultComponent/DefaultComponent'

// function App() {
//   return (
//     <div>
//         <Router>
//           <Routes>
//             { routes.map((route) => {
//               const Page = route.page
//               const Layout = route.isShowHeader ? DefaultComponent : Fragment;
//               return (
//                 <Route key={route.path} path={route.path} element={
//                   <Layout>
//                     <Page/>
//                   </Layout>
//                 } />
//               )
//             })}
//           </Routes>
//         </Router>
//     </div>
//   )
// }

// // test up github

// export default App;
import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import routes from './routes/index';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import { logout, resetAdmin, updateAdmin } from './redux/slices/adminSlice';
import { ensureValidToken, getDetailAdmin } from './services/admin.service';
import Cookies from "js-cookie";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const loadAdminDetails = async () => {
      try {
        // Lấy refreshToken từ cookies
        const refreshToken = Cookies.get("refreshToken");
        if (!refreshToken) {
          dispatch(resetAdmin());
          return;
        }
  
        // Giải mã refreshToken để lấy thông tin expiration
        const decodedRefreshToken = JSON.parse(atob(refreshToken.split(".")[1]));
        const currentTime = Date.now() / 1000; // Thời gian hiện tại tính bằng giây
  
        // Kiểm tra xem refreshToken có hết hạn không
        if (decodedRefreshToken.exp < currentTime) {
          dispatch(logout());
          return;
        }

        const token = await ensureValidToken(dispatch, resetAdmin, refreshToken); // Kiểm tra và làm mới accessToken nếu cần
        if (token) { console.log(token); }
        // Sau khi có accessToken hợp lệ, lấy thông tin người dùng
        const decoded = JSON.parse(atob(refreshToken.split(".")[1]));
        if (decoded?.id) {
          const adminDetails = await getDetailAdmin(decoded.id, token);
          dispatch(updateAdmin(adminDetails));
        }
      } catch (error) {
        console.error("Error loading user details:", error);
      }
    };

    loadAdminDetails();
  
    // Thiết lập lại kiểm tra mỗi 5 phút
    const interval = setInterval(() => {
      loadAdminDetails();
    }, 30 * 60 * 1000); // Kiểm tra và làm mới mỗi 5 phút
  
    // Cleanup interval khi component unmount
    return () => clearInterval(interval);
  }, [dispatch, resetAdmin]);

    // Lấy trạng thái isAuthenticated từ Redux
    const isAuthenticated = useSelector((state) => state.admin.isAuthenticated);

    // Component bảo vệ route
    const ProtectedRoute = ({ element }) => {
      return isAuthenticated ? element : <Navigate to="/sign-in" />;
    };

  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            const Layout = route.isShowHeader ? DefaultComponent : Fragment;
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  route.isProtected ? (
                    <ProtectedRoute element={
                      <Layout>
                        <Page />
                      </Layout>
                    } />
                  ) : (
                    <Layout>
                      <Page />
                    </Layout>
                  )
                }
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;