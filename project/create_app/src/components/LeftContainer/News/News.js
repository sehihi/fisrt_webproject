import React, { useState, useEffect } from 'react';
import './News.css'; // CSS 파일 임포트

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('http://localhost:3001/news');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setNewsData(data);
        setLoading(false);
      } catch (error) {
        console.error('뉴스 데이터를 가져오는 중 오류 발생:', error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <p>Loading news...</p>;
  }

  return (
    <div className="News">
      <header className="News-header">
        {newsData.length === 0 ? (
          <p>No news available.</p>
        ) : (
          <div className="news-list">
            {newsData.slice(0, 4).map(newsItem => ( // 4개의 뉴스만 표시
              <div key={newsItem.id} className="news-item">
                <h2>
                  <a href={newsItem.link} target="_blank" rel="noopener noreferrer">
                    <span dangerouslySetInnerHTML={{ __html: newsItem.title }} />
                  </a>
                </h2>
                <p dangerouslySetInnerHTML={{ __html: newsItem.description }} />
                <p>Published on: {new Date(newsItem.pubDate).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </header>
    </div>
  );
};

export default News;
