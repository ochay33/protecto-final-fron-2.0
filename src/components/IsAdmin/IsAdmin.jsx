import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const IsAdmin = ({ children }) => {
	const navigate = useNavigate()

	useEffect(() => {
		if (localStorage.getItem("role") !== "admin") navigate("/")
	})

	return children
}