import React, {useContext, useEffect, useState, useCallback} from "react"
import {AuthContext} from "../App"
import axios from "axios"
import Loader from "react-loader-spinner"
// Components
import Navigation from "../components/Navigation"
import ArticleForm from "../components/ArticleForm"
import ArticleCard from "../components/ArticleCard"
import ProfileBar from "../components/ProfileBar"
import Members from "../components/Members"
// Utils
import {ApiUrl} from "../utils/variables-config"

export default function HomePage() {
	const {AuthState} = useContext(AuthContext) // use authentication globalstate

	// set and refresh articles data
	const [articlesData, setArticlesData] = useState(false)
	const [articlesRefresh, setArticlesRefresh] = useState(false)

	// get all articles
	const getArticles = useCallback(() => {
		axios({
			method: "get",
			url: `${ApiUrl}/articles`,
			headers: {"Authorization": `Bearer ${AuthState.token}`},
		}).then((res) => {
			setArticlesData(res.data)
		})
	}, [AuthState.token])

	// event: get  and refresh articles
	useEffect(() => {
		getArticles()
		setArticlesRefresh(false)
	}, [articlesRefresh, AuthState, getArticles])

	//loader page
	if (articlesData === false)
		return (
			<div className="d-flex justify-content-center align-items-center vh-100 bg-white">
				<Loader type="TailSpin" color="#036bfc" height={100} width={100} timeout={300000} />
			</div>
		)
	else
		return (
			<React.Fragment>
				<Navigation />
				<div className="container gx-0">
					<div className="row">
						<div className="d-none d-lg-block col-10">
							<aside className="p-0 d-none d-lg-block mb-4">
								<ProfileBar />
							</aside>
							<aside className="p-0 d-none d-lg-block">
								<Members />
							</aside>
						</div>
						<div className="col-lg-26 mb-4">
							<aside className="align-self-center mb-4 ">
								<h1 className="d-none">Page d'accueil Groupomania</h1>
								<ArticleForm setArticlesRefresh={setArticlesRefresh} />
							</aside>
							<main className="d-lg-flex justify-content-lg-between flex-wrap">
								<h3 className="d-none">Post article</h3>
								{articlesData
									.sort(function (a, b) {
										let dateA = new Date(a.createdAt),
											dateB = new Date(b.createdAt)
										return dateB - dateA
									})
									.map((article) => (
										<ArticleCard article={article} key={article.id} setArticlesRefresh={setArticlesRefresh} class="article--card" />
									))}
							</main>
						</div>
					</div>
				</div>
			</React.Fragment>
		)
}
