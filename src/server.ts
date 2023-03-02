import App from "@/app";
import MovieRoutes from "@/movies/movie.route";
import UserRoutes from "@/users/users.route";
import TheatreRoutes from "@/theatres/theatre.route";

const app = new App([new UserRoutes(), new MovieRoutes(), new TheatreRoutes()]);

app.listen();
