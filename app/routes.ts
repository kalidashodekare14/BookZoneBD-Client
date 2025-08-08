import { type RouteConfig, index, layout, route, } from "@react-router/dev/routes";


export default [
    index("./pages/Home.jsx"),
    route("books", "./pages/AllBook.jsx"),
    route("categories", "./pages/Categories.jsx"),
    route("subjects", "./pages/Subjects.jsx"),
    route("writers", "./pages/Writers.jsx"),
    route("publisher", "./pages/Publisher.jsx"),
    route("book/:book_id", "./pages/ViewDetails.jsx"),
    route("writer/:writer_id", "./pages/WriterDetails.jsx"),
    route("login", "./pages/Login.jsx"),
    route("signup", "./pages/SignUp.jsx"),
    route('email_varify', './pages/PasswordResetForm.jsx'),
    // Auth Protected
    layout("./ProtectedRoute/AuthProtected.jsx", [
        route('checkout', './pages/Checkout.jsx'),
        route('checkout_payment', './pages/CheckoutPayment.jsx'),
        route("payment_success", "./pages/PaymentSuccess.jsx"),
        route("payment_fail", "./pages/PaymentFail.jsx"),
        route("payment_cancel", "./pages/PaymentCancel.jsx"),
    ]),

    // User Protected
    layout('./ProtectedRoute/UserProtected.jsx', [
        route("profile", './pages/UserProfile.jsx'),
        route('orders', './pages/UserOrders.jsx'),
    ]),

    // Writer Protected
    layout('./ProtectedRoute/WriterProtected.jsx', [
        route('writer_profile', './pages/WriterProfile.jsx'),
        route('writer_books', './pages/WriterBooks.jsx'),
    ]),

    // Dashboard 
    layout("./ProtectedRoute/AdminProtected.jsx", [
        route("dashboard", "./pages/Dashboard/dashboard.jsx", [
            index("./pages/Dashboard/HomeDashboard.jsx"),
            route("/dashboard/all_book", "./pages/Dashboard/AdminPage/AllBook.jsx"),
            route("/dashboard/manage_users", "./pages/Dashboard/AdminPage/AllUser.jsx"),
            route("/dashboard/add_book", "./pages/Dashboard/AdminPage/AddBook.jsx"),
            route("/dashboard/view_order", "./pages/Dashboard/AdminPage/ViewOrder.jsx"),
            route("/dashboard/view_order/details/:order_id", "./pages/Dashboard/AdminPage/OrderDetails.jsx"),
            route("/dashboard/view-review", "./pages/Dashboard/AdminPage/ViewReview.jsx"),
            route("/dashboard/author-manage", "./pages/Dashboard/AdminPage/AuthorManage.jsx"),
            route("/dashboard/author-create", "./pages/Dashboard/AdminPage/AuthorCreate.jsx"),
        ])
    ])


] satisfies RouteConfig;



