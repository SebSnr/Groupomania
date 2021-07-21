import React, {useContext, useState} from "react"

import ProfilePicture from "./ProfilePicture"
import {AuthContext} from "../App"
import FormModifyProfile from "./FormModifyProfile"

export default function ProfileBar() {
	// use global state of authContext
	const {AuthState} = useContext(AuthContext)

	const [profileRender, setProfileRender] = useState(
		<div
			className="d-flex flex-wrap flex-column align-items-center justify-content-between
        flex-sm-row flex-lg-column align-items-lg-center 
        p-3 mb-5 profileBar"
		>
			<h3 className="d-none">Profil</h3>
			<div className="">
				<ProfilePicture photo={AuthState.photo} />
			</div>
			<div className="flex-grow-1 p-3 d-flex flex-wrap flex-column justify-content-around flex-sm-row flex-lg-column ">
				<h3 className="w-100 text-center">Profil</h3>
				<div>
					<div className="">{AuthState.firstName}</div>
					<div className="">{AuthState.lastName}</div>
				</div>
				<div className="d-flex align-items-center">
					<button onClick={() => setProfileRender(<FormModifyProfile />)} className="btn btn-link">
						Modifier
					</button>
				</div>
			</div>
		</div>
	)

	return profileRender
}
