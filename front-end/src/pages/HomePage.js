import React, {useContext, useEffect, useState} from "react"
import {AuthContext} from "../App"
import axios from "axios"
// Components
import Navigation from "../components/Navigation"
import ArticleForm from "../components/ArticleForm"
import ArticleCard from "../components/ArticleCard"
import ProfileBar from "../components/ProfileBar"
import ErrorPage from "../components/ErrorPage"
import Members from "../components/Members"
// Utils
import {ApiUrl} from "../utils/variables-config"

export default function HomePage() {
	// use authentication globalstate
	const {AuthState} = useContext(AuthContext)

	// redirection to login page
	if (!AuthState.isAuthenticated) {
		window.location = "/login"
		return <ErrorPage />
	} else {
		return (
			<React.Fragment>
				<Navigation />
				<HomeContent />
			</React.Fragment>
		)
	}
}

function HomeContent() {
	const {AuthState} = useContext(AuthContext)

	// state articles data
	const [articlesData, setArticlesData] = useState([])
	const [articlesRefresh, setArticlesRefresh] = useState(false)

	// event: get articles and refresh
	useEffect(() => {
		getArticles()
		setArticlesRefresh(false)
	}, [articlesRefresh, AuthState, ])

	// get user token from local storage
	const token = JSON.parse(localStorage.getItem("token"))

	// get all articles
	const getArticles = () => {
		axios({
			method: "get",
			url: `${ApiUrl}/articles`,
			headers: {"Authorization": `Bearer ${token}`},
		}).then((res) => {
			setArticlesData(res.data)
			console.log(res.data)
		})
	}

	return (
		<div className="container">
			<div className="row h-100 " >
				<aside className="col-5 p-0 d-none d-lg-block mb-4">
					<ProfileBar />
				</aside>
				<aside className="offset-lg-1 col-lg-12 mb-4 align-self-center gx-0">
					<h1 className="d-none">Page d'accueil Groupomania</h1>
					<ArticleForm setArticlesRefresh={setArticlesRefresh} refresh={false} />
				</aside>
				<aside className="offset-lg-1 col-lg-5 p-0 d-none d-lg-block mb-4">
					<Members />
				</aside>
			</div>
			<main className="row d-lg-flex justify-content-lg-between">
					<h3 className="d-none">Post article</h3>
					{articlesData
						.sort(function (a, b) {
							let dateA = new Date(a.createdAt),
								dateB = new Date(b.createdAt)
							return dateB - dateA
						})
						.map((article) => (
							<ArticleCard article={article} key={article.id} setArticlesRefresh={setArticlesRefresh} />
						))}
			</main>
		</div>
	)
}
