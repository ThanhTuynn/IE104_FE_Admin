import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'
import OrderProductPage from '../pages/OrderProductPage/OrderProductPage'
import ListConsumerPage from '../pages/ListCustomerPage/ListCustomerPage'
import ListEmployeePage from '../pages/ListEmployeePage/ListEmployeePage'
import DetailCustomerPage from '../pages/DetailCustomerPage/DetailCustomerPage'
import DetailEmployeePage from '../pages/DetailEmployee/DetailEmployeePage'
import DetailOrderPage from '../pages/DetailOrderPage/DetailOrderPage'
import SignInPage from '../pages/SignInPage/SignInPage'
import ListProductPage from '../pages/ListProductPage/ListProductPage'
import DetailProductPage from '../pages/DetailProductPage/DetailProductPage'
import Dashboard from '../pages/DashboardPage/Dashboard'
import Storeinfo from '../pages/StoreinfoPage/Storeinfo'
import AdminInfo from '../pages/AdminInfoPage/AdminInfoPage'
import EmployeeInfo from '../pages/EmployeeInfoPage/EmployeeInfoPage'
import LogoutPage from '../pages/LogoutPage/LogoutPage'

// const routes = [
//     {

//         path: '/',
//         page: Dashboard,
//         isShowHeader: true
//     },
//     {
//         path: 'list-order-product',
//         page: OrderProductPage,
//         isShowHeader: true
//     },
//     {
//         path: 'store-info',
//         page: Storeinfo,
//         isShowHeader: true
//     },
//     {
//         path: 'order-detail/1',
//         page: DetailOrderPage,
//         isShowHeader: true
//     },
//     {
//         path: 'list-product',
//         page: ListProductPage,
//         isShowHeader: true
//     },
//     {
//         path: 'product-detail/1',
//         page: DetailProductPage,
//         isShowHeader: true
//     },
//     {
//         path: 'list-customer',
//         page: ListConsumerPage,
//         isShowHeader: true
//     },
//     {
//         path: 'customer-detail/1',
//         page: DetailCustomerPage,
//         isShowHeader: true
//     },
//     {
//         path: 'list-employee',
//         page: ListEmployeePage,
//         isShowHeader: true
//     },
//     {
//         path: 'employee-detail/1',
//         page: DetailEmployeePage,
//         isShowHeader: true
//     },
//     {
//         path: 'sign-in',
//         page: SignInPage,
//     },
//     {
//         path: 'admin-info',
//         page: AdminInfo,
//         isShowHeader: true
//     },
//     {

//         path: 'employee-info',
//         page: EmployeeInfo,
//         isShowHeader: true
//     },

//     {
//         path: '*',
//         page: NotFoundPage,
//     }
// ]

// export default routes;
const routes = [
  {
    path: "/",
    page: Dashboard,
    isShowHeader: true,
    isProtected: true, // Chỉ truy cập nếu đã đăng nhập
  },
  {
    path: "list-order-product",
    page: OrderProductPage,
    isShowHeader: true,
    isProtected: true, // Chỉ truy cập nếu đã đăng nhập
  },
  {
    path: "store-info",
    page: Storeinfo,
    isShowHeader: true,
    isProtected: true, // Chỉ truy cập nếu đã đăng nhập
  },
  {
    path: "order-detail/1",
    page: DetailOrderPage,
    isShowHeader: true,
    isProtected: true, // Chỉ truy cập nếu đã đăng nhập
  },
  {
    path: "list-product",
    page: ListProductPage,
    isShowHeader: true,
    isProtected: true, // Chỉ truy cập nếu đã đăng nhập
  },
  {
    path: "product-detail/:id",
    page: DetailProductPage,
    isShowHeader: true,
    isProtected: true, // Chỉ truy cập nếu đã đăng nhập
  },
  {
    path: "list-customer",
    page: ListConsumerPage,
    isShowHeader: true,
    isProtected: true, // Chỉ truy cập nếu đã đăng nhập
  },
  {
    path: "customer-detail/1",
    page: DetailCustomerPage,
    isShowHeader: true,
    isProtected: true, // Chỉ truy cập nếu đã đăng nhập
  },
  {
    path: "list-employee",
    page: ListEmployeePage,
    isShowHeader: true,
    isProtected: true, // Chỉ truy cập nếu đã đăng nhập
  },
  {
    path: "employee-detail/1",
    page: DetailEmployeePage,
    isShowHeader: true,
    isProtected: true, // Chỉ truy cập nếu đã đăng nhập
  },
  {
    path: "sign-in",
    page: SignInPage,
    isProtected: false, // Không yêu cầu đăng nhập
  },
  {
    path: "admin-info",
    page: AdminInfo,
    isShowHeader: true,
    isProtected: true, // Chỉ truy cập nếu đã đăng nhập
  },
  {
    path: "employee-info",
    page: EmployeeInfo,
    isShowHeader: true,
    isProtected: true, // Chỉ truy cập nếu đã đăng nhập
  },
  {
    path: "logout",
    page: LogoutPage,
    isShowHeader: true,
    isProtected: true, // Chỉ truy cập nếu đã đăng nhập
  },
  {
    path: "*",
    page: NotFoundPage,
    isProtected: false, // Không yêu cầu đăng nhập
  },
];

export default routes;
