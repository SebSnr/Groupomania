import React, { useContext, useEffect, useState } from 'react'
import Navigation from '../components/Navigation'
import { AuthContext } from "../App"
import ArticleCard from '../components/ArticleCard'
import axios from 'axios'
import { ApiUrl } from '../variables-config'
import ErrorPage from '../components/ErrorPage'

export default function HomePage() {

	const { AuthState } = useContext(AuthContext)

    if (!AuthState.isAuthenticated){
        window.location = ("/login")
    }

    return (
		<React.Fragment>
            {AuthState.isAuthenticated ? 
                <div>
					<Navigation />
					<ArticleContent />
				</div>
                : <ErrorPage />}
        </React.Fragment>
	)

}

 function ArticleContent() {

    // get article from browser url
	let articleId = document.location.hash.replace("#", "")

    console.log(articleId)

     // state articles data
     const [article, setArticle] = useState({})

    // event: get article at the loading page
    useEffect(() => {getArticle()}, [])

    // get user token by the local storage
    const token = JSON.parse(localStorage.getItem("token"))

    // get articles
    const getArticle = () => {
        axios({
            method: "get",
            url: `${ApiUrl}/articles/${articleId}`,
            headers: {"Authorization" : `Bearer ${token}`}
          })
        .then((res) => {
            setArticle(res.data)
            console.log(res.data)
        })
}    

    return (
        <div className="container">
            <ArticleCard article={article} class="pageCardClass"/>
        </div>
    )

}
