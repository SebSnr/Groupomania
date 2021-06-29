import React from "react"
import {SocialIcon} from "react-social-icons"

export default function SocialBar() {
	return (
		<div className="socialBar">
			<button type="button" className="btn">
				<SocialIcon network="facebook" className="btn-iconed"/>
			</button>
			<button type="button" className="btn">
				<SocialIcon network="youtube" className="btn-iconed"/>
			</button>
			<button type="button" className="btn ">
				<SocialIcon network="twitter" className="btn-iconed" />
			</button>
		</div>
	)
}
