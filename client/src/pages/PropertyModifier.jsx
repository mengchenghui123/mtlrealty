import React, { useContext, useEffect, useState } from "react";
import { deleteResidency, updateResidency } from "../utils/Api";
import { toast } from "react-toastify";
import useProperty from "../Hook/useProperty";
import AddPropertyModal from "../components/AddPropertyModal/AddPropertyModal";
import { Link } from "react-router-dom";
import userDetailContext from "../context/userDetailContext";
import { PuffLoader } from "react-spinners";

const PropertyModifier = () => {
  const { data: propertyData, isError, isLoading } = useProperty();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [modalOpened, setModalopened] = useState(false);
  const {
    userDetails: { token },
  } = useContext(userDetailContext);

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

  const totalPage = Math.ceil(propertyData.length / itemsPerPage);
  const currentData = propertyData.slice(
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
    const match = propertyData.find((item) => item.id === itemId);
    return match ? match.mlsNumber : "N/A";
  };

  const handleDeleteResidence = async (id) => {
    try {
      await deleteResidency(id, token);
      toast.success(`User ${id} deleted successfully`);
    } catch (error) {
      console.error("Failed to delete residency", error);
    }
  };

  const handleEditClick = async (id) => {
    const propertyToEdit = propertyData.find((item) => item.id === id);
    if (propertyToEdit) {
      console.log(propertyToEdit);
      setFormData(propertyToEdit);
      setEditingId(id);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("rooms.")) {
      const index = parseInt(name.split(".")[1], 10); // 提取索引
      const roomKey = name.split(".")[2]; // 提取字段名 (type, level, dimensions, flooring)
      setFormData((prevData) => {
        const updatedRooms = [...(prevData.rooms || [])]; // 保持之前的 rooms 数据

        // 更新特定房间的属性
        if (!updatedRooms[index]) {
          updatedRooms[index] = {}; // 如果该房间不存在，初始化为一个空对象
        }
        updatedRooms[index][roomKey] = value; // 更新特定属性

        return {
          ...prevData,
          rooms: updatedRooms,
        };
      });
    } else if (name.startsWith("facilities.")) {
      const facilityKey = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        facilities: {
          ...prevData.facilities,
          [facilityKey]: value, // 转换为整数
        },
      }));
    } else if (name.startsWith("agent")) {
      const agentKey =
        name === "agentPhoneNumber"
          ? "phoneNumber"
          : name.replace("agent", "").toLowerCase();
      setFormData((prevData) => ({
        ...prevData,
        agentInfo: {
          ...prevData.agentInfo,
          [agentKey]: value, // 更新 agentInfo 的相应字段
        },
      }));
    } else if (name.startsWith("amenities.")) {
      const index = parseInt(name.split(".")[1], 10);
      setFormData((prevData) => {
        const updatedAmenities = [...(prevData.amenities || [])];
        updatedAmenities[index] = value;

        return {
          ...prevData,
          amenities: updatedAmenities,
        };
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]:
          name === "price" || name === "yearBuild"
            ? value
              ? parseInt(value, 10)
              : 0 // 转换为整数，若为空则默认为 0
            : name === "livingSpace" ||
              name === "lotSize" ||
              name === "municipalTaxes" ||
              name === "schoolTaxes" ||
              name === "condoFee"
            ? value
              ? parseFloat(value)
              : 0.0 // 转换为浮点数，若为空则默认为 0.0
            : value, // 其他字段保持为字符串（如有）
      }));
    }
  };

  const handleAddPropertyClick = () => {
    setModalopened(true);
  };

  const removeRoom = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      rooms: (prevData.rooms || []).filter((_, i) => i !== index),
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // 提交表单逻辑
    if (formData && editingId) {
      console.log("Submitting data for ID:", editingId);
      console.log("Data:", formData);
      const { id, ...dataToUpdate } = formData;
      try {
        await updateResidency(editingId, dataToUpdate, token);
        toast.success("Property updated successfully");
      } catch (error) {
        console.error("Error updating property:", error);
        toast.error("Failed to update property");
      }
    }
  };
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
                      <a href="#">
                        <i className="fa fa-heart" aria-hidden="true" />
                        Franchise
                      </a>
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
                          </div>
                        </td>
                        <td>{item.type}</td>
                        <td>{item.totalInvestment}</td>
                        <td className="actions">
                          <a
                            onClick={() => handleEditClick(item.id)}
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
                        className={`page-item ${
                          currentPage === 1 ? "disabled" : ""
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
                          className={`page-item ${
                            currentPage === index + 1 ? "active" : ""
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
                      <li
                        className={`page-item ${
                          currentPage === totalPage ? "disabled" : ""
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

              {formData && (
                <div className="edit-form">
                  <h3 className="text-center mb-4">Edit {formData.title}</h3>
                  <form
                    onSubmit={handleFormSubmit}
                    className="border p-4 rounded"
                  >
                    <div className="form-group mb-3">
                      <label>Title</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title || ""}
                        onChange={handleFormChange}
                        placeholder="Title"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>Type</label>
                      <input
                        type="text"
                        name="type"
                        value={formData.type || ""}
                        onChange={handleFormChange}
                        placeholder="Sale, Rent, Commercial, Franchise"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>description</label>
                      <textarea
                        name="description"
                        value={formData.description || ""}
                        onChange={handleFormChange}
                        placeholder="Description"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>price</label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price || ""}
                        className="form-control"
                        onChange={handleFormChange}
                        placeholder="price"
                        step="any"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>livingSpace</label>
                      <input
                        type="number"
                        name="livingSpace"
                        value={formData.livingSpace || ""}
                        className="form-control"
                        onChange={handleFormChange}
                        placeholder="livingSpace"
                        step="any"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>lotSize</label>
                      <input
                        type="number"
                        name="lotSize"
                        value={formData.lotSize || ""}
                        className="form-control"
                        onChange={handleFormChange}
                        placeholder="lotSize"
                        step="any"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>yearBuild</label>
                      <input
                        type="number"
                        name="yearBuild"
                        value={formData.yearBuild || ""}
                        className="form-control"
                        onChange={handleFormChange}
                        placeholder="yearBuild"
                        step="any"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>schoolTaxes</label>
                      <input
                        type="number"
                        name="municipalTaxes"
                        value={formData.schoolTaxes || ""}
                        className="form-control"
                        onChange={handleFormChange}
                        placeholder="municipalTaxes"
                        step="any"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>schoolTaxes</label>
                      <input
                        type="number"
                        name="schoolTaxes"
                        value={formData.schoolTaxes || ""}
                        className="form-control"
                        onChange={handleFormChange}
                        placeholder="schoolTaxes"
                        step="any"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>condoFee</label>
                      <input
                        type="number"
                        name="condoFee"
                        value={formData.condoFee || ""}
                        className="form-control"
                        onChange={handleFormChange}
                        placeholder="condoFee"
                        step="any"
                      />
                    </div>
                    <h4>Rooms</h4>
                    {formData.rooms &&
                      formData.rooms.map((room, index) => (
                        <div key={index} className="room">
                          <div className="form-group mb-3">
                            <label>Room Type{index}</label>
                            <input
                              type="text"
                              name={`rooms.${index}.type`}
                              value={room.type || ""}
                              onChange={handleFormChange}
                              placeholder="Type"
                              className="form-control"
                            />
                          </div>
                          <div className="form-group mb-3">
                            <label>Level</label>
                            <input
                              type="text"
                              name={`rooms.${index}.level`}
                              value={room.level || ""}
                              onChange={handleFormChange}
                              placeholder="Level"
                              className="form-control"
                            />
                          </div>
                          <div className="form-group mb-3">
                            <label>Dimensions</label>
                            <input
                              type="text"
                              name={`rooms.${index}.dimensions`}
                              value={room.dimensions || ""}
                              onChange={handleFormChange}
                              placeholder="Dimensions"
                              className="form-control"
                            />
                          </div>
                          <div className="form-group mb-3">
                            <label>Flooring</label>
                            <input
                              type="text"
                              name={`rooms.${index}.flooring`}
                              value={room.flooring || ""}
                              onChange={handleFormChange}
                              placeholder="Flooring"
                              className="form-control"
                            />
                          </div>
                        </div>
                      ))}
                    <div className="form-group mb-3">
                      <label>Bedrooms</label>
                      <input
                        type="text"
                        name="facilities.bedrooms"
                        value={formData.facilities?.bedrooms || ""}
                        onChange={handleFormChange}
                        className="form-control"
                        placeholder="Number of bedrooms"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>Bathrooms</label>
                      <input
                        type="text"
                        name="facilities.bathrooms"
                        value={formData.facilities?.bathrooms || ""}
                        onChange={handleFormChange}
                        className="form-control"
                        placeholder="Number of bathrooms"
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label>Parking</label>
                      <input
                        type="text"
                        name="facilities.parking"
                        value={formData.facilities?.parking || ""}
                        onChange={handleFormChange}
                        className="form-control"
                        placeholder="Number of parking spaces"
                      />
                    </div>

                    <h4>Agent Info</h4>
                    <div className="form-group mb-3">
                      <label>Name</label>
                      <input
                        type="text"
                        name="agentName"
                        value={
                          formData.agentInfo
                            ? formData.agentInfo.name || ""
                            : ""
                        }
                        onChange={handleFormChange}
                        className="form-control"
                        placeholder="Agent Name"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>Phone</label>
                      <input
                        type="text"
                        name="agentPhoneNumber"
                        value={
                          formData.agentInfo
                            ? formData.agentInfo.phoneNumber || ""
                            : ""
                        }
                        onChange={handleFormChange}
                        className="form-control"
                        placeholder="Agent Phone"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>Email</label>
                      <input
                        type="email"
                        name="agentEmail" // 这里的 name 指向 agentInfo.email
                        value={
                          formData.agentInfo
                            ? formData.agentInfo.email || ""
                            : ""
                        }
                        onChange={handleFormChange}
                        className="form-control"
                        placeholder="Agent Email"
                      />
                    </div>
                    <h4>Amenities</h4>
                    {formData.amenities && formData.amenities.length > 0 ? (
                      formData.amenities.map((amenity, index) => (
                        <div className="form-group mb-3" key={index}>
                          <label>Amenity {index + 1}</label>
                          <input
                            type="text"
                            name={`amenities.${index}`} // 使用数组索引作为字段名
                            value={amenity}
                            onChange={handleFormChange}
                            className="form-control"
                            placeholder="Amenity"
                          />
                        </div>
                      ))
                    ) : (
                      <div className="form-group mb-3">
                        <label>Amenity</label>
                        <input
                          type="text"
                          name={`amenities.0`} // 第一个输入框
                          value={
                            formData.amenities
                              ? formData.amenities[0] || ""
                              : ""
                          }
                          onChange={handleFormChange}
                          className="form-control"
                          placeholder="Amenity"
                        />
                      </div>
                    )}

                    <button type="submit" className="btn btn-success btn-block">
                      Submit
                    </button>
                    <button
                      type="Add"
                      className="btn btn-success btn-block"
                      onClick={(e) => {
                        e.preventDefault(); // 阻止默认的跳转行为
                        handleAddPropertyClick(); // 调用点击处理函数
                      }}
                    >
                      Add Property
                    </button>
                    <AddPropertyModal
                      opened={modalOpened}
                      setOpened={setModalopened}
                    />
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertyModifier;
