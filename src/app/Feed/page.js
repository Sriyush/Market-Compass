"use client"
import "../styles/feed.css"
import axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";

export default function Feed () {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(
                    'https://newsdata.io/api/1/news?apikey=pub_30342e0a04cd6017f00a598c3a681acfdb6f1&q=crypto derivatives'
                );
                console.log(response.data.results);
                setData(response.data.results || []);
            } catch (error) {
                console.error('There was an error fetching the data!', error);
            }
        }
        fetchdata();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container">
                <p className="mainheader">Market Compass</p>
                <div>
                    {data && data.map((item, index) => (
                        <div key={index} className="cellbox">
                            <div className="header">
                                <div className="newsauthor">
                                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                                        <div className="imageborder">
                                            <img src={item.image_url} alt={item.creator} />
                                        </div>
                                    </a>
                                </div>
                                <div className="date">
                                    {item.pubDate.split(' ')[0].split('-').reverse().join('-')}
                                </div>
                            </div>
                            <hr className="Hr" />
                            <div className="article">
                                <p className="title">{item.title}</p>
                                <p className="description">
                                    {item.description ? item.description.split('\n').slice(0, 10).map((line, idx) => 
                                        <span key={idx}>
                                            {line.length > 400 ? `${line.substring(0, 200)}...` : line}
                                            <br />
                                        </span>
                                    ) : "Description not available."}
                                </p>
                            </div>
                            <div className="hastags">
                                {
                                    (item.keywords || ['crypto', 'DEx exchange'])
                                    .filter(keyword => isNaN(keyword) && (keyword.toLowerCase().startsWith('c') || keyword.toLowerCase().startsWith('d') || keyword.toLowerCase().startsWith('e')))
                                    .slice(0, 5)
                                    .map((keyword, index) => (
                                        <span key={index}>#{keyword} </span>
                                    ))
                                }
                            </div>
                            <hr className="Hr"/>
                            <div className="social">
                                <div className="comment">
                                    <img src='/comment.svg' alt='comment' />
                                </div>
                                <div className="share">
                                    <img src="/arrowloop.svg" alt="share" />
                                </div>
                                <div className="like">
                                    <img src="/like.svg" alt="like" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
