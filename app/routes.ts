import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("./pages/Home.jsx"),
    route("book", "./pages/AllBook.jsx")

] satisfies RouteConfig;
