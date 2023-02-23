import App from "@/app";
import AuthRoutes from "@routes/auth.route";
import MovieRoutes from "./routes/movie.route";

const app = new App([new AuthRoutes(), new MovieRoutes]);

app.listen();
