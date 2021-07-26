import React, {useContext, useEffect, useState} from "react"
import {AuthContext} from "../App"
import axios from "axios"
// Utils
import {ApiUrl} from "../utils/variables-config"
import ProfilePictureMini from "./MiniProfilePicture"

export default function Members() {
	const {AuthState} = useContext(AuthContext)

	//state users data
	const [usersData, setUsersData] = useState([])

	// event : get users at loading page
	useEffect(() => {
		getUsers()
	}, [])

	const getUsers = () => {
		axios({
			method: "get",
			url: `${ApiUrl}/auth/`,
			headers: {"Authorization": `Bearer ${AuthState.token}`},
		}).then((res) => {
			console.log(res.data)
			setUsersData(res.data)
		})
	}

	const deleteUser = (user) => {
		axios({
			method: "delete",
			url: `${ApiUrl}/auth/${user}`,
			headers: {"Authorization": `Bearer ${AuthState.token}`},
		})
			.then((res) => {
				if (res.status === 200) {
					alert("Compte utilsateur supprimé")
					getUsers()
				}
			})
			.catch((error) => {
				console.log(error)
				alert("Impossible de supprimer cet utilisateur.")
			})
	}

	return (
		<div className="card shadow p-3 h-100 overflow-hidden d-flex flex-column align-items-center">
			<h3 className="text-center mb-3">Collègues</h3>
			<ul className="p-0 w-100" style={{"maxHeight": "80vh", "maxWidth": "220px"}}>
				{usersData.map((user) => (
					<div key={user.firstName}>
						<li className="d-flex align-items-center justify-content-between flex-wrap mb-4 w-100" >
							<ProfilePictureMini photo={user.photo} />
							<div className="flex-grow-1">
								{user.firstName} <br />
								{user.lastName}
							</div>
							{AuthState.isAdmin === true && user.id !== AuthState.user ? (
								<button
									type="button"
									className="btn-sm bg-white fs-5"
									onClick={() => {
										if (window.confirm("Administrateur : Supprimer cet utilisateur définitivement ?")) deleteUser(user.id)
									}}
									title="Admin: Supprimer l'utilisateur'"
									aria-label="Admin: Supprimer l'utilisateur"
								>
									🗑️
								</button>
							) : null}
						</li>
					</div>
				))}
			</ul>
		</div>
	)
}
