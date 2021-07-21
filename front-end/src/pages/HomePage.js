import React, {useContext, useEffect, useState} from "react"
import Navigation from "../components/Navigation"
import {AuthContext} from "../App"
import axios from "axios"
import {ApiUrl} from "../variables-config"
import ArticleCard from "../components/ArticleCard"
import ArticleForm from "../components/ArticleForm"
import ErrorPage from "../components/ErrorPage"
import ProfileBar from "../components/ProfileBar"

export default function HomePage() {
	const {AuthState} = useContext(AuthContext)

	if (!AuthState.isAuthenticated) {
		window.location = "/login"
	}

	return (
		<React.Fragment>
			{AuthState.isAuthenticated ? (
				<div>
					<Navigation />
					<HomeContent />
				</div>
			) : (
				<ErrorPage />
			)}
		</React.Fragment>
	)
}

function HomeContent() {
	// state articles data
	const [articlesData, setArticlesData] = useState([])

	// event: get article at the loading page
	useEffect(() => {
		getArticles()
	}, [])

	// get user token by the local storage
	const token = JSON.parse(localStorage.getItem("token"))

	// get articles
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
			<div className="row">
				<aside className="col-lg-5 p-0 d-none d-md-block">
					<ProfileBar />
				</aside>
				<aside className="offset-lg-1 col-lg-12">
					<h1 className="d-none">Page d'accueil Groupomania</h1>
					<ArticleForm />
				</aside>
				<aside className="offset-lg-1 col-lg-5 p-0 d-none d-lg-block card">
					<h3>Membres</h3>
					<ul>
						<li>Samuel</li>
						<li>Georges</li>
						<li>Eddy</li>

					</ul>
				</aside>
			</div>
			<main className="home-content">
				<div className="row d-lg-flex justify-content-lg-between">
					<h3 className="d-none">Post article</h3>
					{articlesData
						.sort(function (a, b) {
							let dateA = new Date(a.createdAt),
								dateB = new Date(b.createdAt)
							return dateB - dateA
						})
						.map((article) => (
							<ArticleCard article={article} key={article.id} />
						))}
				</div>
			</main>
			
		</div>
	)
}
