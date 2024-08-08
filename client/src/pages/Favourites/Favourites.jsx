import React, { useContext, useState } from "react";
import useProperty from "../../Hook/useProperty";
import { PuffLoader } from "react-spinners";
import Pagination from "../../components/Pagination/Pagination";
import { useNavigate } from "react-router-dom";
import Heart from "../../components/Heart/Heart";
import { property, truncate } from "lodash";
import userDetailContext from "../../context/userDetailContext";

const Items_Per_Page = 16;

const Favourites = () => {
  const { data, isError, isLoading } = useProperty();
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const {
    userDetails: { favourites },
  } = useContext(userDetailContext);

  if (isError) {
    return (
      <div className="wrapper">
        <span>Error while fetching data</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    );
  }

  //信息过滤
  const filterProperties = data
    .filter((property) => favourites.includes(property.id))
    .filter(
      (property) =>
        property.title.toLowerCase().includes(filter.toLowerCase()) ||
        property.city.toLowerCase().includes(filter.toLowerCase()) ||
        property.country.toLowerCase().includes(filter.toLowerCase())
    );

  //分页
  const totalPage = Math.ceil(filterProperties.length / Items_Per_Page);
  const currentData = filterProperties.slice(
    currentPage * Items_Per_Page,
    (currentPage + 1) * Items_Per_Page
  );
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  const PropertyCard = ({ card }) => {
    return (
      <div className="col-md-3 mb-4">
        <div
          className="card h-100 d-flex flex-column justify-content-between"
          onClick={() => navigate(`/property/${card.id}`)}
        >
          <Heart id={card?.id} />
          <img src={card.image} className="card-img-top" alt="home" />
          <div>
            <h5 className="card-title">
              {truncate(card.title, { length: 15 })}
            </h5>
            <p className="card-text text-secondary">
              {truncate(card.description, { length: 80 })}
            </p>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <span className="badge bg-primary">${card.price}</span>
              <span className="text-muted">{card.facilities.bedrooms} Bed</span>
              <span className="text-muted">
                {card.facilities.bathrooms} Bath
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="container mt-5" style={{ paddingTop: "80px" }}>
      <div className="row my-4">
        <div className="col-12">
          <input
            type="text"
            className="form-control"
            placeholder="Search properties..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        {currentData.map((card, i) => (
          <PropertyCard card={card} key={i} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default Favourites;
