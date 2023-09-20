import { Login } from "../../views/Login/Login"
import { Home } from "../../views/Home/Home"
import { Registro } from "../../views/Registro/Registro"
import { Menues } from "../../views/Menues/Menues"
import { Administrador } from "../../views/Administrador/Administrador"
import { Menu } from "../../views/Menu/Menu"
import { IsLogged } from "../../components/IsLogged/IsLogged"
import { IsAdmin } from "../../components/IsAdmin/IsAdmin"
import { Contacto } from "../../views/Contacto/Contacto"
import { Nosotros } from "../../views/Nosotros/Nosotros"
import { CartElements } from "../../components/Carrito/CartElements/CartElements"
import { Orders } from "../../views/Orders/Orders"
import { Users } from "../../views/Users"
import { IsNotLogged } from "../../components/IsNotLogged/IsNotLogged"


export const routes = [
	{ 
		path: "/", 
		element: (
			<IsLogged>
		        <Home /> 
		    </IsLogged>
		),
	},

	{
		path: "/login",
		element: (
			<IsLogged>
				<Login />
			</IsLogged>
		),
	},
	
	{ 
		path: "/registro",
		element: (
			<IsLogged>
		        <Registro /> 
			</IsLogged>	  
		),
	},

	{ path: "/contacto", element: <Contacto /> },
	{ path: "/nosotros", element: <Nosotros /> },

	{ 
		path: "/menu/:menuId", 
		element: (
			<IsNotLogged>	
		        <Menu /> 
			</IsNotLogged>
		),
	},

	{ 
		path : "/carrito" , 
		element: (
			<IsNotLogged>
		        <CartElements /> 
		    </IsNotLogged>
		),
	},

	{ 
		path: "/menues", 
		element: (
			<IsNotLogged>
		        <Menues />
			</IsNotLogged>
		),
	},

    { 
		path : "/orders", 
		element: (
		    <IsAdmin>
		        <Orders />
		    </IsAdmin>
		),
	},
	{
		path:"/users" ,
		element : (
			<IsAdmin>
				<Users />
			</IsAdmin>
		),
	},
	
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