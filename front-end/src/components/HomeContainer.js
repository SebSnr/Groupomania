import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ApiUrl } from '../variables-config'
import ArticleCard from "./ArticleCard"
import ArticleForm from "./ArticleForm"

export default function HomeContent() {


    const [articlesData, setArticlesData] = useState([])

    useEffect(() => {getArticles()}, [])



    const getArticles = () => {
        
        axios.get(`${ApiUrl}/articles`)
            .then((res) => {
                setArticlesData(res.data)
                console.log(res.data)
            })
            // console.log(articlesData)
    }    


    return (
        <div className="container">
            
            <ArticleForm />

            <div className="row d-lg-flex justify-content-lg-around">
                {articlesData
                    .map((article) => (
                        <ArticleCard key={article.id} article={article} />
                    ))
                }
            </div>
        </div>
    )
}
