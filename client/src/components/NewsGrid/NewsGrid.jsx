import { FaCommentDots, FaHeart, FaShareAlt } from 'react-icons/fa';
import './NewsGrid.css';

const newsData = [
  {
    id: 1,
    title: 'The Real Estate News',
    date: 'Jun 23, 2020',
    author: 'Admin',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.',
    image: '/r1.png',
    shares: 306,
    comments: 34,
    likes: 122,
  },
  {
    id: 2,
    title: 'The Real Estate News',
    date: 'Jun 23, 2020',
    author: 'Admin',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.',
    image: '/r2.png',
    shares: 306,
    comments: 34,
    likes: 122,
  },
  {
    id: 3,
    title: 'The Real Estate News',
    date: 'Jun 23, 2020',
    author: 'Admin',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.',
    image: '/r3.png',
    shares: 306,
    comments: 34,
    likes: 122,
  },
  {
    id: 4,
    title: 'The Real Estate News',
    date: 'Jun 23, 2020',
    author: 'Admin',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.',
    image: '/value.png',
    shares: 306,
    comments: 34,
    likes: 122,
  }
];

const NewsGrid = () => {
  return (
    <div className="news-grid">
      <div className="row">
        <div className="col-12">
          <div className="r-head flexColStart">
            <span className="fs-5 fw-semibold text-uppercase">Latest</span>
            <span className="orangeText">News</span>
          </div>
        </div>
      </div>
      <div className="row">
        {newsData.map((news) => (
          <div key={news.id} className="col-md-6 mb-4">
            <div className="card news-card shadow-sm d-flex flex-row">
              <div className="row g-0 h-100">
                <div className="col-4 h-100">
                  <img src={news.image} alt={news.title} className="img-fluid news-img h-100" />
                </div>
                <div className="col-8 h-100">
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="card-title">{news.title}</h5>
                      <p className="card-text">
                        {news.date} / By {news.author}
                      </p>
                      <p className='pt-2'>{news.description}</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="card-text mb-0 fw-bold">Read more...</p>
                      <div className="d-flex">
                        <span className="me-3"><FaHeart /> {news.likes}</span>
                        <span className="me-3"><FaCommentDots /> {news.comments}</span>
                        <span className="me-3"><FaShareAlt /> {news.shares}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsGrid;
