import App from "@/app";
import AuthRoutes from "@routes/auth.route";

const app = new App([new AuthRoutes()]);

app.listen();
