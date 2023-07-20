import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const IsAdmin = ({ children }) => {
	const navigate = useNavigate()

	useEffect(() => {
<<<<<<< HEAD
		if (localStorage.getItem("role") !== "admin") navigate("/")
	})

	return children
}
=======
		if (JSON.parse(localStorage.getItem("rol")) !== "ADMIN") navigate("/")
	})

	return children
}
>>>>>>> fb138dc581fdcb1a8629f736c0ed4bfa3d93b8e2
