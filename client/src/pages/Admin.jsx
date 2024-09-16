import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllUsers, deleteUser, deleteResidency, getProperty } from "../utils/Api";
import { toast } from "react-toastify";
import useProperty from "../Hook/useProperty";
import { PuffLoader } from "react-spinners";
import EditPropertyModal from "../components/EditPropertyModal/EditPropertyModal";

const Admin = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState("");
  const { data, isError, isLoading } = useProperty();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [editModalOpened, setEditModalOpened] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [selectedPropertyDetails, setSelectedPropertyDetails] = useState(null);

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

  if (isError) {
    return (
      <div className="wrapper">
        <span>Error loading Datas</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="puffloaderStyle" style={{ height: "60vh" }}>
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
  const totalPage = Math.ceil(data.length / itemsPerPage);

  if (!token) {
    return <div>Loading token...</div>;
  }

  if (!users.length) {
    return <div>Loading users...</div>;
  }

  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const getMlsNumber = (itemId) => {
    const match = data.find((item) => item.id === itemId);
    return match ? match.mlsNumber : "N/A";
  };

  const handleDelectUser = async (email) => {
    try {
      await deleteUser(email, token);
      toast.success(`User ${email} deleted successfully`);
      setUsers(users.filter((user) => user.email !== email));
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  const handleDeleteResidence = async (id) => {
    try {
      await deleteResidency(id, token);
      toast.success(`User ${id} deleted successfully`);
    } catch (error) {
      console.error("Failed to delete residency", error);
    }
  };

  const handleEditResidence = async (id) => {
    try {
      const details = await getProperty(id);
      setSelectedPropertyDetails(details);
      setSelectedPropertyId(id);
      setEditModalOpened(true);
    } catch (error) {
      toast.error("Failed to load property details");
    }
  };

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
    <>
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
                  <h4 className="title">Users</h4>
                  <div className="section-body listing-table">
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>User id</th>
                            <th>User Email</th>
                            <th>Booked Visit</th>
                            <th>Favourites</th>
                            <th>Delete</th>
                          </tr>
                        </thead>

                        <tbody>
                          {users.map((user) => (
                            <tr key={user.id}>
                              <td>{user.id}</td>
                              <td>{user.email}</td>
                              <td className="rating">
                                {user.bookedVisits && user.bookedVisits.length > 0
                                  ? user.bookedVisits.map((visit, index) => (
                                    <div key={visit.id}>
                                      <span>Date: {visit.date}</span> <br />
                                      <span>
                                        MLS Number: {getMlsNumber(visit.id)}
                                      </span>
                                      {index < user.bookedVisits.length - 1 && (
                                        <hr />
                                      )}{" "}
                                      {/* Add a line break between visits */}
                                    </div>
                                  ))
                                  : "N/A"}
                              </td>
                              <td className="status">
                                {user.favResidenciesID &&
                                  user.favResidenciesID.length > 0
                                  ? user.favResidenciesID.map((item) => {
                                    const mlsNumber = getMlsNumber(item);
                                    return (
                                      <span key={item}>
                                        MLS Number: {mlsNumber || "N/A"} <br />
                                      </span>
                                    );
                                  })
                                  : "N/A"}
                              </td>
                              <td className="edit">
                                <a
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleDelectUser(user.email);
                                  }}
                                  style={{ cursor: "pointer" }}
                                >
                                  <i className="far fa-trash-alt" />
                                </a>
                              </td>
                            </tr>
                          ))}
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
                        <th>Type</th>
                        <th>Price</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    {currentData.map((item) => (
                      <tbody key={item.id}>
                        <tr>
                          <td className="image myelist">
                            <a href="single-property-1.html">
                              <img
                                alt="my-properties-3"
                                src={item.image}
                                className="img-fluid"
                              />
                            </a>
                          </td>

                          <td>
                            <div className="inner">
                              <a href="single-property-1.html">
                                <h2>{item.title}</h2>
                              </a>
                              <figure>
                                <i className="lni-map-marker" /> {item.address}
                              </figure>
                              <figure>
                                <i className="lni-map-marker" /> Mls:
                                {item.mlsNumber}
                              </figure>
                            </div>
                          </td>
                          <td>{item.type}</td>
                          <td>{item.price}</td>
                          <td className="actions">
                            <a
                              onClick={() => handleEditResidence(item.id)}
                              className="edit"
                              style={{ cursor: "pointer" }}
                            >
                              <i className="lni-pencil" />
                              Edit
                            </a>
                            <a
                              onClick={(e) => {
                                e.preventDefault();
                                handleDeleteResidence(item.id);
                              }}
                              style={{
                                cursor: "pointer",
                              }}
                            >
                              <i className="far fa-trash-alt" />
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                  <div className="pagination-container">
                    <nav>
                      <ul className="pagination">
                        <li
                          className={`page-item ${currentPage === 1 ? "disabled" : ""
                            }`}
                        >
                          <button
                            className="btn btn-common"
                            onClick={handlePrevPage}
                          >
                            <i className="lni-chevron-left" /> Previous{" "}
                          </button>
                        </li>
                        {Array.from({ length: totalPage }, (_, index) => (
                          <li
                            key={index + 1}
                            className={`page-item ${currentPage === index + 1 ? "active" : ""
                              }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => handlePageClick(index + 1)}
                            >
                              {index + 1}
                            </button>
                          </li>
                        ))}
                        {/* <li className="page-item">
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
                      </li> */}
                        <li
                          className={`page-item ${currentPage === totalPage ? "disabled" : ""
                            }`}
                        >
                          <button
                            className="btn btn-common"
                            onClick={handleNextPage}
                          >
                            Next <i className="lni-chevron-right" />
                          </button>
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

      <EditPropertyModal
        opened={editModalOpened}
        setOpened={setEditModalOpened}
        propertyId={selectedPropertyId}
        propertyDetails={selectedPropertyDetails}
      />
    </>
  );
};

export default Admin;
