import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'
import OrderProductPage from '../pages/OrderProductPage/OrderProductPage'
import ListConsumerPage from '../pages/ListCustomerPage/ListCustomerPage'
import ListEmployeePage from '../pages/ListEmployeePage/ListEmployeePage'
import DetailCustomerPage from '../pages/DetailCustomerPage/DetailCustomerPage'
import DetailStaffPage from '../pages/DetailStaff/DetailStaffPage'
import DetailOrderPage from '../pages/DetailOrderPage/DetailOrderPage'
import SignInPage from '../pages/SignInPage/SignInPage'

const routes = [
    {
        path: 'list-order-product',
        page: OrderProductPage,
        isShowHeader: true
    },
    {
        path: 'order-detail',
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
        page: DetailStaffPage,
        isShowHeader: true
    },
    {
        path: 'list-staff',
        page: ListEmployeePage,
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