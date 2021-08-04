import React, {useContext, useState, useEffect, useMemo} from "react"

import ProfilePicture from "./ProfilePicture"
import {AuthContext} from "../App"
import FormModifyProfile from "./FormModifyProfile"

export default function ProfileBar() {
	// use global state of authContext
	const {AuthState} = useContext(AuthContext)

	const initialProfileRender = useMemo(() => {
		// change render of profilBar : initial or modify
		const handleProfileRender = () => {
			setProfileRender(<FormModifyProfile setProfileRender={setProfileRender} initialProfileRender={initialProfileRender} />)
		}

		return (
			<div
				className="card shadow d-flex flex-wrap flex-column align-items-center justify-content-between
        	flex-sm-row flex-lg-column align-items-lg-center 
        	p-3 h-100"
			>
				<ProfilePicture photo={AuthState.photo} class="" />
				<div className="flex-grow-1 p-3 d-flex flex-wrap flex-column justify-content-around flex-sm-row flex-lg-column ">
					{AuthState.isAdmin ? (
						<h3 className="w-100 text-center">
							Profil
							<br />
							admin
						</h3>
					) : (
						<h3 className="w-100 text-center">Profil</h3>
					)}
					<div>
						<div>{AuthState.firstName}</div>
						<div>{AuthState.lastName}</div>
						{/* <div className="mb-2 text-wrap text-break">{AuthState.email}</div>
						<div className="mb-3 text-truncate text-wrap">{AuthState.firstName} {AuthState.lastName}</div> */}
					</div>
					<div className="d-flex align-items-center">
						<button onClick={() => handleProfileRender()} className="btn btn-link">
							Modifier
						</button>
					</div>
				</div>
			</div>
		)
	}, [AuthState.firstName, AuthState.isAdmin, AuthState.lastName, AuthState.photo]) 

	// state of profileRender
	const [profileRender, setProfileRender] = useState(initialProfileRender)

	useEffect(() => {
		setProfileRender(initialProfileRender)
	}, [AuthState, initialProfileRender])

	return profileRender
}
