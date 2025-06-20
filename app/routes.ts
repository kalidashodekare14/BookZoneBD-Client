import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("./pages/Home.jsx"),
    route("book", "./pages/AllBook.jsx"),
    route("categories", "./pages/Categories.jsx"),
    route("subjects", "./pages/Subjects.jsx"),
    route("writers", "./pages/Writers.jsx"),
    route("publisher", "./pages/Publisher.jsx"),
    route("book/:book_id", "./pages/ViewDetails.jsx"),
    route("login", "./pages/Login.jsx"),
    route("signup", "./pages/SignUp.jsx"),
    // Dashboard 
    route("dashboard", "./pages/Dashboard/dashboard.jsx", [
        index("./pages/Dashboard/HomeDashboard.jsx"),
        
    ])

] satisfies RouteConfig;
