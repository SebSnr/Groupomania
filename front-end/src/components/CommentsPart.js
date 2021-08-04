import React, {useEffect, useState, useContext, useCallback} from "react"
import {Formik, Form, Field, ErrorMessage} from "formik"
import axios from "axios"
import * as Yup from "yup"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
// Components
import {AuthContext} from "../App"
import CommentForm from "./CommentForm"
import ProfilePicture from "./ProfilePicture"
// Utils
import {ApiUrl} from "../utils/variables-config"
import {toFormatedDate} from "../utils/toformatedDate"

export default function Comments(props) {
	
	const {AuthState} = useContext(AuthContext)// use global state of authContext

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
			setCommentsRefresh(false)
		})
	}, [AuthState.token, props.article.id])

	// event: get articles and refresh
	useEffect(() => {
		getComments()
		setCommentsRefresh(false)
	}, [commentsRefresh, getComments, ])

	return (
		<div>
			<div className="d-flex justify-content-evenly border-bottom">
				{/* <div>Like / dislike</div> */}
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
				<Commentary data={commentsData} commentsRender={commentsRender} setCommentsRefresh={setCommentsRefresh} />
			</div>
		</div>
	)
}

function Commentary(props) {
	const {AuthState} = useContext(AuthContext)// use global state of authContext

	const MySwal = withReactContent(Swal) // custom alert button


	const deleteComment = useCallback(
		(id) => {
			axios({
				method: "delete",
				url: `${ApiUrl}/comments/${id}`,
				headers: {"Authorization": `Bearer ${AuthState.token}`},
			})
				.then((res) => {
					if (res.status === 200) {
						MySwal.fire({
							title: "Commentaire supprimé",
							icon: "success",
							timer: 1000,
							showConfirmButton: false,
							showCloseButton: false,
							buttonsStyling: false,
							customClass: {
								title: "h4 font",
								popup: "card",
							},
						})
						props.setCommentsRefresh(true)
					}
				})
				.catch(() => {
					MySwal.fire({
						title: "Erreur : impossible de supprimer ce commentaire",
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
		[AuthState.token, props]
	)

	const renderCommentary = (comment) => {
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
								MySwal.fire({
									title: "❌ Supprimer ce commentaire ?",
									timer: 15000,
									showCancelButton: true,
									confirmButtonText: "Oui",
									cancelButtonText: "Non",
									buttonsStyling: false,
									customClass: {
										confirmButton: "btn btn-danger mx-3",
										cancelButton: "btn btn-primary mx-3",
										title: "h5 font",
										popup: "card",
									},
								}).then((result) => {
									if (result.isConfirmed) {
										deleteComment(comment.id)
									} else return
								})
							}}
							title="supprimer le commentaire"
							aria-label="supprimer le commentaire"
						>
							🗑️
						</button>
					) : null}
				</div>
				<p className="mb-0">{comment.text}</p>
			</li>
		)
	}

	// Render comment just written by user or render all comments on click
	if (props.commentsRender === 0) {
		let comment = props.data[0]
		return renderCommentary(comment)
	} else if (props.commentsRender % 2 === 1) {
		return props.data
			.sort(function (a, b) {
				let dateA = new Date(a.createdAt),
					dateB = new Date(b.createdAt)
				return dateB - dateA
			})
			.map((comment) => renderCommentary(comment))
	} else return null
}
