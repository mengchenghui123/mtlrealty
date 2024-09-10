import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllUsers } from "../utils/Api";
import { toast } from "react-toastify";
import useProperty from "../Hook/useProperty";

const Admin = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState("");
  const { data } = useProperty();
  useEffect(() => {
    document.body.classList.add(
      "int_white_bg",
      "hd-white",
      "maxw1600",
      "m0a",
      "dashboard-bd"
    );
    const fetchAccessToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: "https://api.realEstate.com", // API 标识符
          scope: "openid profile email",
        });
        setToken(accessToken); // 存储 accessToken 以备后续使用
      } catch (error) {
        toast.error("Failed to get access token");
      }
    };

    if (isAuthenticated) {
      fetchAccessToken();
    }
    return () => {
      document.body.classList.remove("int_white_bg", "hd-white");
    };
  }, [isAuthenticated, getAccessTokenSilently]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (token) {
        try {
          const userData = await getAllUsers(token);
          setUsers(userData);
        } catch (error) {
          toast.error("Failed to fetch users");
        }
      }
    };

    fetchUsers();
  }, [token]);

  if (!token) {
    return <div>Loading token...</div>;
  }

  if (!users.length) {
    return <div>Loading users...</div>;
  }

  return (
    // <div>
    //   <h1>All Users (Test)</h1>
    //   <ul>
    //     {users.map((user) => (
    //       <li key={user.id}>
    //         {user.id}: {user.email} - {user.name}
    //       </li>
    //     ))}
    //   </ul>
    // </div>
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
                      <a className="active" href="dashboard.html">
                        <i className="fa fa-map-marker" /> Dashboard
                      </a>
                    </li>

                    <li>
                      <a href="my-listings.html">
                        <i className="fa fa-list" aria-hidden="true" />
                        Residencial
                      </a>
                    </li>
                    <li>
                      <a href="favorited-listings.html">
                        <i className="fa fa-heart" aria-hidden="true" />
                        Franchise
                      </a>
                    </li>
                    <li>
                      <a href="add-property.html">
                        <i className="fa fa-list" aria-hidden="true" />
                        Commercial
                      </a>
                    </li>
                    <li>
                      <a href="payment-method.html">
                        <i className="fas fa-credit-card" />
                        User
                      </a>
                    </li>
                    <li>
                      <a href="index.html">
                        <i className="fas fa-sign-out-alt" />
                        Log Out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-9 col-md-12 col-xs-12 pl-0 user-dash2">
              <div className="dashborad-box stat bg-white">
                <h4 className="title">Manage Dashboard</h4>
                <div className="section-body">
                  <div className="row">
                    <div className="col-lg-3 col-md-6 col-xs-12 dar pro mr-3">
                      <div className="item">
                        <div className="icon">
                          <i className="fa fa-list" aria-hidden="true" />
                        </div>
                        <div className="info">
                          <h6 className="number">{data.length}</h6>
                          <p className="type ml-1">Residencial Properties</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-xs-12 dar rev mr-3">
                      <div className="item">
                        <div className="icon">
                          <i className="fa fa-list" />
                        </div>
                        <div className="info">
                          <h6 className="number">{users.length}</h6>
                          <p className="type ml-1">Users</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6 dar com mr-3">
                      <div className="item mb-0">
                        <div className="icon">
                          <i className="fa fa-list" />
                        </div>
                        <div className="info">
                          <h6 className="number">223</h6>
                          <p className="type ml-1">Franchise</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6 dar booked">
                      <div className="item mb-0">
                        <div className="icon">
                          <i className="fa fa-list" />
                        </div>
                        <div className="info">
                          <h6 className="number">432</h6>
                          <p className="type ml-1">Commercials</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dashborad-box">
                <h4 className="title">Listing</h4>
                <div className="section-body listing-table">
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Listing Name</th>
                          <th>Date</th>
                          <th>Rating</th>
                          <th>Status</th>
                          <th>Edit</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Luxury Restaurant</td>
                          <td>23 Jan 2020</td>
                          <td className="rating">
                            <span>5.0</span>
                          </td>
                          <td className="status">
                            <span className=" active">Active</span>
                          </td>
                          <td className="edit">
                            <a href="#">
                              <i className="fa fa-pencil" />
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>Gym in Town</td>
                          <td>11 Feb 2020</td>
                          <td className="rating">
                            <span>4.5</span>
                          </td>
                          <td className="status">
                            <span className="active">Active</span>
                          </td>
                          <td className="edit">
                            <a href="#">
                              <i className="fa fa-pencil" />
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>Cafe in Boston</td>
                          <td>09 Jan 2020</td>
                          <td className="rating">
                            <span>5.0</span>
                          </td>
                          <td className="status">
                            <span className="non-active">Non-Active</span>
                          </td>
                          <td className="edit">
                            <a href="#">
                              <i className="fa fa-pencil" />
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td className="pb-0">Car Dealer in New York</td>
                          <td className="pb-0">24 Feb 2018</td>
                          <td className="rating pb-0">
                            <span>4.5</span>
                          </td>
                          <td className="status pb-0">
                            <span className="active">Active</span>
                          </td>
                          <td className="edit pb-0">
                            <a href="#">
                              <i className="fa fa-pencil" />
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="my-properties">
                <table className="table-responsive">
                  <thead>
                    <tr>
                      <th className="pl-2">My Properties</th>
                      <th className="p-0" />
                      <th>Date Added</th>
                      <th>Views</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="image myelist">
                        <a href="single-property-1.html">
                          <img
                            alt="my-properties-3"
                            src="images/feature-properties/fp-1.jpg"
                            className="img-fluid"
                          />
                        </a>
                      </td>
                      <td>
                        <div className="inner">
                          <a href="single-property-1.html">
                            <h2>Luxury Villa House</h2>
                          </a>
                          <figure>
                            <i className="lni-map-marker" /> Est St, 77 -
                            Central Park South, NYC
                          </figure>
                        </div>
                      </td>
                      <td>08.14.2020</td>
                      <td>163</td>
                      <td className="actions">
                        <a href="#" className="edit">
                          <i className="lni-pencil" />
                          Edit
                        </a>
                        <a href="#">
                          <i className="far fa-trash-alt" />
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="pagination-container">
                  <nav>
                    <ul className="pagination">
                      <li className="page-item">
                        <a className="btn btn-common" href="#">
                          <i className="lni-chevron-left" /> Previous{" "}
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          1
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          2
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          3
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="btn btn-common" href="#">
                          Next <i className="lni-chevron-right" />
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admin;
