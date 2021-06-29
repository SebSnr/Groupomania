import React, { useEffect } from 'react'
import axios from 'axios'

export default function ArticleCard() {


    useEffect(() => {getArticles()}, [])



    const getArticles = () => {
        
        axios.get("http://4000/articles")
            .then((res) => console.log(res))

    }    



    return (
        <div className="card post-card shadow col-12 col-md-5 mb-3 mb-md-5">
            <div className="overflow-hidden">
                <img src="./img/Montgolfiere.jpg" className="card-img-top " alt="article multimédia"/>
            </div>
            <div className="card-body">
                <p className="card-text">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum expedita quasi, sapiente reiciendis quia ullam nihil repellat sunt excepturi cum ex sint error alias laudantium itaque laboriosam facere odio hic?
                </p>
            </div>
        </div>
    )
}
