import React from 'react'

export default function ArticleCard (article) {

    return (
        <div className="card post-card shadow col-12 col-md-5 mb-3 mb-md-5">
            <div className="overflow-hidden">
                <img src="./img/Montgolfiere.jpg" className="card-img-top " alt="article multimédia"/>
            </div>
            <div className="card-body">
                <p className="card-text">
                    {article.article.text}
                </p>
            </div>
        </div>
    )
}
