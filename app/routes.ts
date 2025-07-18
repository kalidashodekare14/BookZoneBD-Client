import { type RouteConfig, index, layout, route, } from "@react-router/dev/routes";


export default [
    index("./pages/Home.jsx"),
    route("books", "./pages/AllBook.jsx"),
    route("categories", "./pages/Categories.jsx"),
    route("subjects", "./pages/Subjects.jsx"),
    route("writers", "./pages/Writers.jsx"),
    route("publisher", "./pages/Publisher.jsx"),
    route("book/:book_id", "./pages/ViewDetails.jsx"),
    route("login", "./pages/Login.jsx"),
    route("signup", "./pages/SignUp.jsx"),
    // Auth Protected
    layout("./ProtectedRoute/AuthProtected.jsx", [
        route("profile", './pages/UserProfile.jsx'),
        route('checkout', './pages/Checkout.jsx'),
    ]),

    // Dashboard 
    route("dashboard", "./pages/Dashboard/dashboard.jsx", [
        index("./pages/Dashboard/HomeDashboard.jsx"),
        route("/dashboard/all_book", "./pages/Dashboard/AdminPage/AllBook.jsx"),
        route("/dashboard/manage_users", "./pages/Dashboard/AdminPage/AllUser.jsx"),
        route("/dashboard/add_book", "./pages/Dashboard/AdminPage/AddBook.jsx"),
        route("/dashboard/view_order", "./pages/Dashboard/AdminPage/ViewOrder.jsx"),
        route("/dashboard/view-review", "./pages/Dashboard/AdminPage/ViewReview.jsx"),
    ])

] satisfies RouteConfig;



