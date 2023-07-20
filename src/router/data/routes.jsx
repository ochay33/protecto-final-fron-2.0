import { Login } from "../../views/Login/Login"
import { Home } from "../../views/Home/Home"
import { Registro } from "../../views/Registro/Registro"
import { Menues } from "../../views/Menues/Menues"
import { Administrador } from "../../views/Administrador/Administrador"
import { Menu } from "../../views/Menu/Menu"
import { IsLogged } from "../../components/IsLogged/IsLogged"
import { IsAdmin } from "../../components/IsAdmin/IsAdmin"

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
		path: "administrador",
		element: (
			<IsAdmin>
				<Administrador />
			</IsAdmin>
		),
	},
	{
		path: "*",
		element: 404,
	},
]