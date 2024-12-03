import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'
import OrderProductPage from '../pages/OrderProductPage/OrderProductPage'
import ListConsumerPage from '../pages/ListCustomerPage/ListCustomerPage'
import ListEmployeePage from '../pages/ListEmployeePage/ListEmployeePage'
import DetailCustomerPage from '../pages/DetailCustomerPage/DetailCustomerPage'
import DetailEmployeePage from '../pages/DetailEmployee/DetailEmployeePage'
import DetailOrderPage from '../pages/DetailOrderPage/DetailOrderPage'
import SignInPage from '../pages/SignInPage/SignInPage'
import Dashboard from '../pages/Dashboard/Dashboard'
import ListProductPage from '../pages/ListProductPage/ListProductPage'
import Storeinfo from '../pages/StoreInfoPage/StoreInfoPage'

const routes = [
    {
        path: 'list-order-product',
        page: OrderProductPage,
        isShowHeader: true
    },
    // {
    //     path: 'list-product',
    //     page: ListProductPage,
    //     isShowHeader: true
    // },
    {
        path: 'store-info',
        page: Storeinfo,
        isShowHeader: true
    },
    {
        path: 'order-detail/1',
        page: DetailOrderPage,
        isShowHeader: true
    },
    {
        path: 'list-customer',
        page: ListConsumerPage,
        isShowHeader: true
    },
    {
        path: 'customer-detail/1',
        page: DetailCustomerPage,
        isShowHeader: true
    },
    {
        path: 'employee-detail/1',
        page: DetailEmployeePage,
        isShowHeader: true
    },
    {
        path: 'list-employee',
        page: ListEmployeePage,
        isShowHeader: true
    },
    {
        path: 'dashboard',
        page: Dashboard,
        isShowHeader: true
    },
    {
        path: 'sign-in',
        page: SignInPage,
    },
    {
        path: '*',
        page: NotFoundPage,
    }
]

export default routes;