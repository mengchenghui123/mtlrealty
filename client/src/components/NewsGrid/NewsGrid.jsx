const newsData = [
  {
    id: 1,
    title: "The Real Estate News",
    date: "Jun 23, 2020",
    author: "Admin",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.",
    image: "https://i.imgur.com/awa2U2i.png",
    shares: 306,
    comments: 34,
    likes: 122,
  },
  {
    id: 2,
    title: "The Real Estate News",
    date: "Jun 23, 2020",
    author: "Admin",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.",
    image: "https://i.imgur.com/awa2U2i.png",
    shares: 306,
    comments: 34,
    likes: 122,
  },
  {
    id: 3,
    title: "The Real Estate News",
    date: "Jun 23, 2020",
    author: "Admin",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.",
    image: "https://i.imgur.com/awa2U2i.png",
    shares: 306,
    comments: 34,
    likes: 122,
  },
  {
    id: 4,
    title: "The Real Estate News",
    date: "Jun 23, 2020",
    author: "Admin",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.",
    image: "https://i.imgur.com/awa2U2i.png",
    shares: 306,
    comments: 34,
    likes: 122,
  },
];

const NewsGrid = () => {
  return (
    <>
      {/* START SECTION BLOG */}
      <section className="blog-section bg-white-1 rec-pro">
        <div className="container-fluid">
          <div className="section-title">
            <h3>Latest</h3>
            <h2>News</h2>
          </div>
          <div className="news-wrap">
            <div className="row">
              {newsData.map((news, index) => (
                <div
                  key={news.id}
                  className={`col-xl-6 col-md-12 col-xs-12 ${
                    index % 2 === 0 ? "fade-right" : "fade-left"
                  }`}
                  data-aos={`fade-${index % 2 === 0 ? "right" : "left"}`}
                >
                  <div className="news-item news-item-sm">
                    <a href="blog-details.html" className="news-img-link">
                      <div className="news-item-img">
                        <img
                          className="resp-img"
                          src={news.image}
                          alt="blog image"
                        />
                      </div>
                    </a>
                    <div className="news-item-text">
                      <a href="blog-details.html">
                        <h3>{news.title}</h3>
                      </a>
                      <span className="date">
                        {news.date} &nbsp;/&nbsp; By {news.author}
                      </span>
                      <div className="news-item-descr">
                        <p>{news.description}</p>
                      </div>
                      <div className="news-item-bottom">
                        <a href="blog-details.html" className="news-link">
                          Read more...
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* END SECTION BLOG */}
    </>
  );
};

export default NewsGrid;
