import { useState } from "react";
import Pagination from "../Pagination/Pagination"; // 引入新的 Pagination 组件

const DataListingPage = ({ data, title }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const totalPage = Math.ceil(data.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentPageData = data.slice(offset, offset + itemsPerPage);

  const handlePageChange = (selected) => {
    setCurrentPage(selected);
  };

  return (
    <div className="page-container">
      <div className="container">
        <div className="content-box">
          <h1 className="title">{title}</h1>
          <div className="break-line" />

          {/* 过滤器部分，按需引入 */}
          {/* <Filters /> */}

          <div className="data-list">
            {currentPageData.map((item) => (
              <div
                className="item col-lg-4 col-md-12 col-xs-12 landscapes sale pr-0 pb-0"
                key={item.id}
              >
                <div className="project-single mb-0 bb-0">
                  <div className="project-inner project-head">
                    <div className="homes">
                      <a
                        href="#"
                        className="homes-img"
                        onClick={() => handleCardClick(item.id)}
                      >
                        <div className="homes-tag button alt featured">
                          Featured
                        </div>
                        <div className="homes-tag button alt sale">
                          For Sale
                        </div>
                        <div className="homes-price">${item.price}</div>
                        <img
                          src={item.image}
                          alt="home-1"
                          className="img-responsive"
                        />
                      </a>
                    </div>
                    <div className="button-effect">
                      <a href="single-property-1.html" className="btn">
                        <i className="fa fa-link" />
                      </a>
                      <a
                        href={`https://www.youtube.com/watch?v=${item.videoId}`}
                        className="btn popup-video popup-youtube"
                      >
                        <i className="fas fa-video" />
                      </a>
                      <a
                        href="single-property-2.html"
                        className="img-poppu btn"
                      >
                        <i className="fa fa-photo" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="break-line" />

          {/* 分页组件 */}
          <Pagination
            currentPage={currentPage}
            totalPage={totalPage}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default DataListingPage;
