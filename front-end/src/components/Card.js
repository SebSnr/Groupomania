import React, { useEffect } from 'react'
import axios from 'axios'

export default function Card() {


    useEffect(() => {getArticles()}, [])



    const getArticles = () => {
        
        axios.get("http://4000/articles")
            .then((res) => console.log(res))

    }    



    return (
        <div className="card post-card shadow">
            <div className="post-header">
                <img src="./img/Montgolfiere.jpg" alt="post multimedia content"/>
            </div>
            <div className="post-body">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum expedita quasi, sapiente reiciendis quia ullam nihil repellat sunt excepturi cum ex sint error alias laudantium itaque laboriosam facere odio hic?
                </p>
            </div>
        </div>
    )
}
