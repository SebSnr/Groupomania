import React from "react"
import {SocialIcon} from "react-social-icons"

export default function SocialBar() {
	return (
		<div className="socialBar">
			<button type="button" className="btn">
				<SocialIcon network="facebook" />
			</button>
			<button type="button" className="btn">
				<SocialIcon network="youtube" />
			</button>
			<button type="button" className="btn ">
				<SocialIcon network="twitter" />
			</button>
		</div>
	)
}
