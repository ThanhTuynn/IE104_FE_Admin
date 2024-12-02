import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'
import OrderProductPage from '../pages/OrderProductPage/OrderProductPage'
import ListConsumerPage from '../pages/ListCusmerPage/ListCusmerPage'
import ListStaffPage from '../pages/ListStaffPage/ListStaffPage'
import DetailCustomerPage from '../pages/DetailCustomerPage/DetailCustomerPage'
import DetailStaffPage from '../pages/DetailStaff/DetailStaffPage'
import DetailOrderPage from '../pages/DetailOrderPage/DetailOrderPage'

const routes = [
    {
        path: 'list-order-product',
        page: OrderProductPage,
        isShowHeader: true
    },
    {
        path: 'detail-order',
        page: DetailOrderPage,
        isShowHeader: true
    },
    {
        path: 'list-customer',
        page: ListConsumerPage,
        isShowHeader: true
    },
    {
        path: 'detail-customer',
        page: DetailCustomerPage,
        isShowHeader: true
    },
    {
        path: 'detail-staff',
        page: DetailStaffPage,
        isShowHeader: true
    },
    {
        path: 'list-staff',
        page: ListStaffPage,
        isShowHeader: true
    },
    {
        path: '*',
        page: NotFoundPage,
    }
]

export default routes;