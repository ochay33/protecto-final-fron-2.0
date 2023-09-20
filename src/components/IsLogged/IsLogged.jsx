import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const IsLogged = ({ children }) => {
	const navigate = useNavigate()

	useEffect(() => {
		if (localStorage.getItem("user")) navigate("/menues")
	})

	return children
}