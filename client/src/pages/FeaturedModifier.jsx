import React, { useState } from "react";
import useProperty from "../Hook/useProperty";
import useCommercial from "../Hook/useCommercial";
import useFranchise from "../Hook/useFranchise";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const FeaturedModifier = () => {
  const {
    data: commercialData,
    isError: commercialError,
    isLoading: commercialLoading,
  } = useCommercial();
  const { data, isError, isLoading } = useProperty();
  const {
    data: franchiseData,
    isError: franchiseError,
    isLoading: franchiseLoading,
  } = useFranchise();

  if (commercialLoading || isLoading || franchiseLoading) {
    return <div>Loading...</div>;
  }

  if (commercialError || isError || franchiseError) {
    return <div>Error loading properties.</div>;
  }

  const featuredProperties = [
    ...(commercialData?.filter((property) => property.isFeature) || []),
    ...(data?.filter((property) => property.isFeature) || []),
    ...(franchiseData?.filter((property) => property.isFeature) || []),
  ];

  return (
    <div id="wrapper" className="int_main_wraapper">
      <div className="clearfix" />
      <section className="user-page section-padding">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-md-12 col-xs-12 pl-0 pr-0 user-dash">
              <div className="user-profile-box mb-0">
                <div className="detail clearfix">
                  <ul className="mb-0">
                    <li>
                      <a>
                        <i className="fa fa-map-marker" /> Dashboard
                      </a>
                    </li>
                    <li>
                      <Link to="/admin/FeaturedModifier">
                        <i className="fa fa-list" aria-hidden="true" />
                        Featured
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/FranchiseModifier">
                        <i className="fa fa-heart" aria-hidden="true" />
                        Franchise
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/CommercialModifier">
                        <i className="fa fa-list" aria-hidden="true" />
                        Commercial
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/PropertyModifier">
                        <i className="fa fa-list" aria-hidden="true" />
                        Property
                      </Link>
                    </li>
                    <li>
                      <a href="/">
                        <i className="fas fa-sign-out-alt" />
                        Home
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-9 col-md-12 col-xs-12 pl-0 user-dash2">
              <div className="my-properties">
                {/* 显示 featuredProperties */}
                <h2>Featured Properties</h2>
                <table className="table-responsive">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                    </tr>
                  </thead>
                  <tbody>
                    {featuredProperties.map((item) => (
                      <tr key={item.id}>
                        <td className="image myelist">
                          <a>
                            <img
                              alt="my-properties"
                              src={item.image}
                              className="img-fluid"
                            />
                          </a>
                        </td>
                        <td>
                          <div className="inner">
                            <a>
                              <h2>{item.title}</h2>
                            </a>
                            <figure>
                              <i className="lni-map-marker" /> {item.id}
                            </figure>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturedModifier;
