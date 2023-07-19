import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const IsAdmin = ({ children }) => {
	const navigate = useNavigate()

	useEffect(() => {
		if (JSON.parse(localStorage.getItem("rol")) !== "ADMIN") navigate("/")
	})

	return children
}
