import React, {useEffect, useState, useContext, useCallback} from "react"
import {Formik, Form, Field, ErrorMessage} from "formik"
import axios from "axios"
import * as Yup from "yup"
// Components
import {AuthContext} from "../App"
import CommentForm from "./CommentForm"
import ProfilePicture from "./ProfilePicture"
// Utils
import {ApiUrl} from "../utils/variables-config"
import {toFormatedDate} from "../utils/toformatedDate"

export default function Comments(props) {
	// use global state of authContext
	const {AuthState} = useContext(AuthContext)

	const [commentsRender, setCommentsRender] = useState(2)

	// state comments data
	const [commentsData, setCommentsData] = useState([])
	const [commentsRefresh, setCommentsRefresh] = useState(false)

	// get all comments
	const getComments = useCallback(() => {
		axios({
			method: "get",
			url: `${ApiUrl}/comments/${props.article.id}`,
			headers: {"Authorization": `Bearer ${AuthState.token}`},
		}).then((res) => {
			setCommentsData(res.data)
		})
	}, [AuthState.token, props.article.id])

	// event: get articles and refresh
	useEffect(() => {
		getComments()
		setCommentsRefresh(false)
	}, [commentsRefresh, getComments])

	return (
		<div>
			<div className="d-flex justify-content-evenly border-bottom">
				<div>Like / dislike</div>
				<div>
					<button
						onClick={(e) => {
							e.preventDefault()
							setCommentsRender(commentsRender + 1)
						}}
						className="btn btn-link btn--comments shadow-none text-decoration-none"
					>
						{commentsData.length} commentaires
					</button>
				</div>
			</div>
			<div className="form-2 mt-3">
				<CommentForm article={props.article} setCommentsRefresh={setCommentsRefresh} setCommentsRender={setCommentsRender} commentsRender={commentsRender} />
				{/* {commentsRender % 2 === 0 ? <Commentary data={commentsData} /> : null} */}
				<Commentary data={commentsData} commentsRender={commentsRender} />
			</div>
		</div>
	)
}

function Commentary(props) {
	const {AuthState} = useContext(AuthContext)

	useEffect(() => {}, [props.commentsRender])

	if (props.commentsRender === 0) {
		let comment = props.data[0]
		console.log("salut Ca passe")

		return (
			<li key={comment.id} className="card p-2 mb-1">
				<div className="d-flex align-items-center mb-2">
					<ProfilePicture photo={comment.User.photo} class="profile-picture--mini" />
					<span className="fw-bold mb-0 flex-grow-1 ">
						{comment.User.firstName} {comment.User.lastName}
					</span>
					<span className={`d-flex justify-content-end mx-1 text-muted fst-italic article__date`}>{toFormatedDate(comment.createdAt)}</span>
					{comment.UserId === AuthState.user || AuthState.isAdmin === true ? (
						<button
							type="button"
							className="btn-sm bg-white fs-6"
							onClick={() => {
								if (window.confirm("Supprimer ce post définitivement ?")) console.log("supprime")
							}}
							title="supprimer l'article"
							aria-label="supprimer l'article"
						>
							🗑️
						</button>
					) : null}
				</div>
				<p className="mb-0">{comment.text}</p>
			</li>
		)
	} else if (props.commentsRender % 2 === 1) {
		return props.data
			.sort(function (a, b) {
				let dateA = new Date(a.createdAt),
					dateB = new Date(b.createdAt)
				return dateB - dateA
			})
			.map((comment) => (
				<li key={comment.id} className="card p-2 mb-1">
					<div className="d-flex align-items-center mb-2">
						<ProfilePicture photo={comment.User.photo} class="profile-picture--mini" />
						<span className="fw-bold mb-0 flex-grow-1 ">
							{comment.User.firstName} {comment.User.lastName}
						</span>
						<span className={`d-flex justify-content-end mx-1 text-muted fst-italic article__date`}>{toFormatedDate(comment.createdAt)}</span>
						{comment.UserId === AuthState.user || AuthState.isAdmin === true ? (
							<button
								type="button"
								className="btn-sm bg-white fs-6"
								onClick={() => {
									if (window.confirm("Supprimer ce post définitivement ?")) console.log("supprime")
								}}
								title="supprimer l'article"
								aria-label="supprimer l'article"
							>
								🗑️
							</button>
						) : null}
					</div>
					<p className="mb-0 ms-5">{comment.text}</p>
				</li>
			))
	} else return null
}
