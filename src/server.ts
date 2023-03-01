import App from "@/app";
import MovieRoutes from "@/movies/movie.route";
import UserRoutes from "@/users/users.route";

const app = new App([new UserRoutes(), new MovieRoutes]);

app.listen();
