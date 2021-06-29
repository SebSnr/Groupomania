import React from 'react'
import ArticleCard from "./ArticleCard"
import ArticleForm from "./ArticleForm"

export default function HomeContent() {
    return (
        <div className="container home-con">
            <ArticleForm />
            <div className="articles-content row">
                <ArticleCard />
                <ArticleCard />
                <ArticleCard />
                <ArticleCard />
                <ArticleCard />
                <ArticleCard />
                <ArticleCard />
            </div>
        </div>
    )
}
