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
const routes = [
    {
        path: 'list-order-product',
        page: OrderProductPage,
        isShowHeader: true
    },  
    {
        path: 'order-detail/1',
        page: DetailOrderPage,
        isShowHeader: true
    },
    {
        path: 'list-product',
        page: ListProductPage,
        isShowHeader: true
    },
    {
        path: 'product-detail/1',
        page: DetailProductPage,
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
        path: 'list-employee',
        page: ListEmployeePage,
        isShowHeader: true
    },
    {
        path: 'employee-detail/1',
        page: DetailEmployeePage,
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