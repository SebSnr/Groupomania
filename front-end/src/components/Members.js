import React, {useContext, useEffect, useState} from "react"
import {AuthContext} from "../App"
import axios from "axios"
// Utils
import {ApiUrl} from "../utils/variables-config"
//components
import ProfilePicture from "./ProfilePicture"

export default function Members() {
	const {AuthState} = useContext(AuthContext)

	//state users data
	const [users, setUsers] = useState([])
	const [filteredUsers, setFilteredUsers] = useState(users)

	let initialMembersRender = (
		<div className="card shadow p-3 h-100 overflow-hidden d-flex flex-column mb-4">
			<h3 className="text-center mb-3">Collègues</h3>
			<input type="text" onChange={(event) => handleSearch(event.target.value.toLowerCase())} className="searchUsers mb-4" placeholder="Rechercher..."></input>
			<ul className="p-0 w-100" style={{"maxHeight": "80vh", "maxWidth": "350px"}}>
				{filteredUsers.map((user, index) => (
					<div key={index}>
						<li className="d-flex align-items-center justify-content-between mb-4 w-100 text-left">
							<button
								className="d-flex align-items-center justify-content-start flex-grow-1 bg-transparent text-start text-truncate "
								onClick={() => setMembersRender(<MemberProfile user={user} setMembersRender={setMembersRender} initialMembersRender={initialMembersRender} />)}
							>
								<ProfilePicture photo={user.photo} class="profile-picture--mini" />
								<span className="text-truncate">
									{user.firstName}
									<br /> {user.lastName}
								</span>
							</button>

							{AuthState.isAdmin === true && user.id !== AuthState.user ? (
								<button
									type="button"
									className="btn-sm bg-white fs-5"
									onClick={() => {
										if (window.confirm("Administrateur : Supprimer cet utilisateur définitivement ?")) deleteUser(user.email)
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

	const [membersRender, setMembersRender] = useState(initialMembersRender)

	// event : get users at loading page
	useEffect(() => {
		getUsers()
	}, [])
	// event : get members render after get users
	useEffect(() => {
		setMembersRender(initialMembersRender)
	}, [filteredUsers])

	const getUsers = () => {
		axios({
			method: "get",
			url: `${ApiUrl}/auth/`,
			headers: {"Authorization": `Bearer ${AuthState.token}`},
		}).then((res) => {
			console.log(res.data)
			setUsers(res.data)
			setFilteredUsers(res.data)
		})
	}

	const handleSearch = (value) => {
		let result = users.filter((user) => {
			if (user.firstName.toLowerCase().search(value) !== -1 || user.lastName.toLowerCase().search(value) !== -1) return true
		})
		setFilteredUsers(result)
	}

	const deleteUser = (email) => {
		axios({
			method: "delete",
			url: `${ApiUrl}/auth/user/${email}`,
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

	return membersRender
}

function MemberProfile(props) {
	return (
		<div className="card shadow p-3 mb-4 h-100 overflow-hidden d-flex flex-column align-items-center text-truncate">
			{/* <h3 className="text-center mb-3">Collègue</h3> */}
			<ProfilePicture photo={props.user.photo} />
			<div className="mt-3 text-truncate">
				{props.user.firstName}<br />{props.user.lastName}
			</div>
			<div className="mb-3 text-wrap text-break">{props.user.email}</div>

			<button
				className="btn-sm btn-customize1"
				onClick={() => {
					props.setMembersRender(props.initialMembersRender)
				}}
			>
				Retour
			</button>
		</div>
	)
}
