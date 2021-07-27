import React from 'react'
import Navigation from '../components/Navigation'
// components
import ArticleCard from '../components/ArticleCard'

 export default function ArticlePage(props) {

    let article = props.location.state.article

    return (
        <div>
            <Navigation />
            <main className="container d-flex justify-content-center ">
                    <ArticleCard article={article} class="article--page"/> 
            </main>
        </div>
    )

}
