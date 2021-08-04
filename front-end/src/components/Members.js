import React, {useContext, useEffect, useState, useCallback, useMemo} from "react"
import {AuthContext} from "../App"
import axios from "axios"
import Loader from "react-loader-spinner"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
// Utils
import {ApiUrl} from "../utils/variables-config"
//components
import ProfilePicture from "./ProfilePicture"

export default function Members() {
	const {AuthState} = useContext(AuthContext)

	const MySwal = withReactContent(Swal) // custom alert button

	const [users, setUsers] = useState([])
	const [filteredUsers, setFilteredUsers] = useState(users)
	const [loading, setLoading] = useState(true)

	const getUsers = useCallback(() => {
		axios({
			method: "get",
			url: `${ApiUrl}/auth/`,
			headers: {"Authorization": `Bearer ${AuthState.token}`},
		}).then((res) => {
			console.log(res.data)
			setUsers(res.data)
			setFilteredUsers(res.data)
			setLoading(false)
		})
	}, [AuthState.token])

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

	const deleteUser = useCallback(
		(email) => {
			axios({
				method: "delete",
				url: `${ApiUrl}/auth/user/${email}`,
				headers: {"Authorization": `Bearer ${AuthState.token}`},
			})
				.then((res) => {
					if (res.status === 200) {
						MySwal.fire({
							title: "Compte supprimé",
							icon: "success",
							timer: 1000,
							showConfirmButton: false,
							showCloseButton: false,
							buttonsStyling: false,
							customClass: {
								confirmButton: "btn btn-primary mx-3",
								cancelButton: "btn btn-danger mx-3",
								title: "h4 font",
								popup: "card",
							},
						})
						getUsers()
					}
				})
				.catch(() => {
					MySwal.fire({
						title: "Erreur : impossible de supprimer cet utilisateur.",
						icon: "error",
						showCloseButton: false,
						buttonsStyling: false,
						customClass: {
							confirmButton: "btn btn-primary mx-3",
							title: "h4 font",
							popup: "card",
						},
					})
				})
		},
		[AuthState.token, MySwal, getUsers]
	)

	const initialMembersRender = useMemo(() => {
		return (
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

								{AuthState.isAdmin === true && user.firstName !== AuthState.firstName ? (
									<button
										type="button"
										className="btn-sm bg-white fs-5"
										onClick={() => {
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
	// }, [AuthState.firstName, AuthState.isAdmin, MySwal, deleteUser, filteredUsers, handleSearch, ])
}, [AuthState.firstName, AuthState.isAdmin, filteredUsers, handleSearch])


	const [membersRender, setMembersRender] = useState(initialMembersRender)

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

function MemberProfile(props) {
	return (
		<div className="card shadow p-3 mb-4 h-100 overflow-hidden d-flex flex-column align-items-center text-truncate">
			{/* <h3 className="text-center mb-3">Collègue</h3> */}
			<ProfilePicture photo={props.user.photo} />
			<div className="mt-3 mb-2 text-wrap text-break">{props.user.email}</div>
			<div className="mb-3 text-truncate text-wrap">
				{props.user.firstName} {props.user.lastName}
			</div>

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
