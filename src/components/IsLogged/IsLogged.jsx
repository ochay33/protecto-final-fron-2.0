import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const IsLogged = ({ children }) => {
	const navigate = useNavigate()

	useEffect(() => {
		if (localStorage.getItem("usuario")) navigate("/")
	})

	return children
<<<<<<< HEAD
}
=======
}
>>>>>>> fb138dc581fdcb1a8629f736c0ed4bfa3d93b8e2
