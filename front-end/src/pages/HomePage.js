import React, { useContext, useEffect, useState} from "react"
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
	// use authentication globalstate
	const {AuthState} = useContext(AuthContext)

	// state articles data
	const [articlesData, setArticlesData] = useState(false)
	const [articlesRefresh, setArticlesRefresh] = useState(false)

	// event: get articles and refresh
	useEffect(() => {
		getArticles()
		setArticlesRefresh(false)
	}, [articlesRefresh, AuthState])

	// get all articles
	const getArticles = () => {
		axios({
			method: "get",
			url: `${ApiUrl}/articles`,
			headers: {"Authorization": `Bearer ${AuthState.token}`},
		}).then((res) => {
			setArticlesData(res.data)
			console.log(res.data)
		})
	}

	if (articlesData === false) return <div className="d-flex justify-content-center align-items-center vh-100 bg-white"><Loader type="TailSpin" color="#036bfc" height={100} width={100} timeout={300000} /></div>
	else
		return (
			<React.Fragment>
				<Navigation />
				<div className="container">
					<div className="row">
						<div className="d-none d-lg-block col-9">
							<aside className="p-0 d-none d-lg-block mb-4">
								<ProfileBar />
							</aside>
							<aside className="p-0 d-none d-lg-block">
								<Members />
							</aside>
						</div>
						<div className="offset-lg-1 col-lg-26 mb-4">
							<aside className="align-self-center mb-4 ">
								<h1 className="d-none">Page d'accueil Groupomania</h1>
								<ArticleForm setArticlesRefresh={setArticlesRefresh} refresh={false} />
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
										<ArticleCard article={article} key={article.id} setArticlesRefresh={setArticlesRefresh} class="article--card col-lg-17" />
									))}
							</main>
						</div>
					</div>
					{/* )} */}
				</div>
			</React.Fragment>
		)
}
