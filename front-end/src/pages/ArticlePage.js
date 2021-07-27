import React from "react"
import Navigation from "../components/Navigation"
// components
import ArticleCard from "../components/ArticleCard"

export default function ArticlePage(props) {
    // get article data from props
	let article = props.location.state.article

	return (
		<React.Fragment>
			<Navigation />
			<main className="container d-flex justify-content-center ">
				<ArticleCard article={article} class="article--page" />
			</main>
		</React.Fragment>
	)
}
