import React from "react"

export default function MiniProfilePicture(props) {

	return (
		<div className="profile-picture profile-picture--mini">
			<img src={props.photo} alt="auteur" className="profile-picture__clipped profile-picture__clipped--mini" />
		</div>
	)
}


// console.log(props.classNameDiv)
// 	console.log(props.classNameImg)
// 	return (
// 		<div className={`profile-picture ${props.classNameDiv}`} >
// 			<img src={props.photo} alt="auteur" className={`profile-picture__clipped ${props.classNameImg}`} />
// 		</div>
// 	)
