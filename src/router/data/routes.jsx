import { Login } from "../../views/Login"
import { Home } from "../../views/Home"
import { Registro } from "../../views/Registro"
import { Menues } from "../../views/Menues"
import { Administrator } from "../../views/Administrator"
import { Menu } from "../../views/Menu"
import { IsLogged } from "../../components/IsLogged"
import { IsAdmin } from "../../components/IsAdmin"

export const routes = [
	{ path: "/", element: <Home /> },
	{
		path: "/login",
		element: (
			<IsLogged>
				<Login />
			</IsLogged>
		),
	},
	{ path: "/menues", element: <Menues /> },
	{ path: "/registro", element: <Registro /> },
	{ path: "/menu/:menuId", element: <Menu /> },
	{
		path: "administrator",
		element: (
			<IsAdmin>
				<Administrator />
			</IsAdmin>
		),
	},
	{
		path: "*",
		element: 404,
	},
]