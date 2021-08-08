import React, {useContext, useEffect, useState, useCallback, useMemo} from "react"
import {AuthContext} from "../App"
import axios from "axios"
import Loader from "react-loader-spinner"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
// Utils
import {ApiUrl} from "../utils/variables-config"
import { alertErrorMessage, alertSuccessMessage } from "../utils/alertMessage"
//components
import ProfilePicture from "./ProfilePicture"
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashAlt  } from "@fortawesome/free-solid-svg-icons"

export default function Members() {

	const {AuthState} = useContext(AuthContext) // use global state of authContext
	const MySwal = withReactContent(Swal) // custom alert button

	const [users, setUsers] = useState([])  // set users data state
	const [filteredUsers, setFilteredUsers] = useState(users) // users data state in order to search in it
	const [loading, setLoading] = useState(true)  // loading page state

	const getUsers = useCallback(() => {
		axios({
			method: "get",
			url: `${ApiUrl}/auth/`,
			headers: {"Authorization": `Bearer ${AuthState.token}`},
		}).then((res) => {
			setUsers(res.data)
			setFilteredUsers(res.data)
			setLoading(false)
		})
	}, [AuthState.token])

	// searched users render
	const handleSearch = useCallback(
		(value) => {
			let result = users.filter((user) => {
				if (user.firstName.toLowerCase().search(value) !== -1 || user.lastName.toLowerCase().search(value) !== -1) return true
				else return false
			})
			setFilteredUsers(result)
		},
		[users]
	)
	
	// delete user request
	const deleteUser = useCallback(
		(email) => {
			axios({
				method: "delete",
				url: `${ApiUrl}/auth/user/${email}`,
				headers: {"Authorization": `Bearer ${AuthState.token}`},
			})
				.then((res) => {
					if (res.status === 200) {
						alertSuccessMessage("Compte supprimé", 1000)
						getUsers()
					}
				})
				.catch(() => {
					alertErrorMessage("Erreur : impossible de supprimer cet utilisateur.")
				})
		},
		[AuthState.token, getUsers]
	)

	const initialMembersRender = useMemo(() => {
		return (
			<div className="card shadow p-3 h-100 overflow-hidden d-flex flex-column mb-4">
				<h3 className="text-center mb-3">Collègues</h3>
				<input type="text" onChange={(event) => handleSearch(event.target.value.toLowerCase())} className="searchUsers mb-4" placeholder="Rechercher..."></input>
				<ul className="p-0 w-100 overflow-auto" style={{"maxHeight": "80vh", "maxWidth": "350px"}} >
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

								{AuthState.isAdmin === true && user.firstName !== AuthState.firstName ? (
									<button
										type="button"
										className="btn-sm btn--trash bg-white fs-5"
										onClick={() => {
											// ask confirmation
											MySwal.fire({
												title: "❌ Administrateur : Supprimer cet compte définitivement ?",
												timer: 15000,
												showCancelButton: true,
												confirmButtonText: "Oui",
												cancelButtonText: "Non",
												buttonsStyling: false,
												customClass: {
													confirmButton: "btn btn-primary mx-3",
													cancelButton: "btn btn-danger mx-3",
													title: "h5 font",
													popup: "card",
												},
											}).then((result) => {
												if (result.isConfirmed) {
													deleteUser(user.email)
												} else return
											})

										}}
										title="Admin: supprimer l'utilisateur"
										aria-label="Admin: supprimer l'utilisateur"
									>
									<FontAwesomeIcon icon={faTrashAlt} />
									</button>
								) : null}
							</li>
						</div>
					))}
				</ul>
			</div>
		)
	}, [AuthState.firstName, AuthState.isAdmin, filteredUsers, handleSearch])


	const [membersRender, setMembersRender] = useState(initialMembersRender)  // render member state

	// event : get members render after get users
	useEffect(() => {
		setMembersRender(initialMembersRender)
	}, [filteredUsers, initialMembersRender, ])

	// event : get users at loading page
	useEffect(() => {
		getUsers()
	}, [getUsers, ])

	// loader page if no members data
	if (loading === true)
		return (
			<div className="d-flex justify-content-center align-items-center vh-100 bg-white">
				<Loader type="TailSpin" color="#036bfc" height={100} width={100} timeout={300000} />
			</div>
		)
	else return membersRender
}

// member profil component
function MemberProfile(props) {
	return (
		<div className="card shadow p-3 mb-4 h-100 overflow-hidden d-flex flex-column align-items-center text-truncate">
			<ProfilePicture photo={props.user.photo} />
			<div className="mt-3 mb-2 text-wrap text-break">{props.user.email}</div>
			<div className="mb-3 text-truncate text-wrap">
				{props.user.firstName} {props.user.lastName}
			</div>

			<button
				className="btn-sm btn--customize1"
				onClick={() => {
					props.setMembersRender(props.initialMembersRender)
				}}
			>
				Retour 
			</button>
		</div>
	)
}
