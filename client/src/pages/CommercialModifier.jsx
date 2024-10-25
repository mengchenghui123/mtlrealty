import React, { useRef, useState, useEffect, useContext } from "react";
import useCommercial from "../Hook/useCommercial";
import userDetailContext from "../context/userDetailContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import {
  updateCommercial,
  createCommercial,
  deleteCommercial,
} from "../utils/Api";

const CommercialModifier = () => {
  const { data: commercialData, isError, isLoading } = useCommercial();
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const cloudinaryRef = useRef();
  const multiWidgetRef = useRef();
  const [imageURL, setImageURL] = useState(""); // 主图像
  const [imageURLs, setImageURLs] = useState([]); // 附加图像
  const selectedImageRef = useRef(null); // 用于追踪选中的图片
  const {
    userDetails: { token },
  } = useContext(userDetailContext);

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    multiWidgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dbsagqpe3", // 替换为你的 Cloudinary 云名称
        uploadPreset: "krgglwqe", // 替换为你的上传 preset
        maxFiles: 10, // 每次只上传一张图片
      },
      (err, result) => {
        if (result.event === "success") {
          const selected = selectedImageRef.current;
          if (selected === "main") {
            setImageURL(result.info.secure_url); // 替换主图
            setFormData((prevData) => ({
              ...prevData,
              image: result.info.secure_url, // 更新 formData 的 image 字段
            }));
          } else if (typeof selected === "number") {
            // 替换附加图像
            setImageURLs((prevURLs) =>
              prevURLs.map((url, index) =>
                index === selected ? result.info.secure_url : url
              )
            );
            setFormData((prevData) => ({
              ...prevData,
              images: prevData.images.map((url, index) =>
                index === selected ? result.info.secure_url : url
              ),
            }));
          } else if (selected === "new") {
            setImageURLs((prevURLs) => [...prevURLs, result.info.secure_url]);
            setFormData((prevData) => ({
              ...prevData,
              images: [...(prevData.images || []), result.info.secure_url], // 添加新图片的 URL
            }));
          }
          selectedImageRef.current = null; // 重置选中状态
        }
      }
    );
  }, []);
  if (isLoading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  if (isError)
    return <p className="text-center text-danger">Error loading data.</p>;

  const totalPage = Math.ceil(commercialData.length / 5);
  const currentData = commercialData.slice(
    (currentPage - 1) * 5,
    currentPage * 5
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

  const handleEditClick = async (id) => {
    const commercialToEdit = commercialData.find((item) => item.id === id);
    if (commercialToEdit) {
      setFormData(commercialToEdit);
      setEditingId(id);
      setImageURL(commercialToEdit.image);
      setImageURLs(commercialToEdit.images);
    }
  };

  const handleDeleteCommercial = async (id) => {
    try {
      await deleteCommercial(id, token);
      toast.success(`Commercial ${id} deleted successfully`);
    } catch {
      console.error("Failed to delete commercial", error);
      toast.error("Failed to delete commercial");
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    const agentFields = {
      agentName: "name",
      agentPhone: "phone",
      agentEmail: "email",
    };
    setFormData((prevData) => {
      // 检查当前字段是否是代理人信息字段
      if (agentFields[name]) {
        return {
          ...prevData,
          agentInfo: {
            ...prevData.agentInfo,
            [agentFields[name]]: value, // 更新 agentInfo 的相应字段
          },
        };
      } else {
        // 处理数字字段和其他字段
        return {
          ...prevData,
          [name]: value,
        };
      }
    });
  };

  const handleSelectMainImage = () => {
    selectedImageRef.current = "main"; // 标记为主图
    multiWidgetRef.current.open(); // 打开上传窗口
  };

  const handleSelectOtherImage = (index) => {
    selectedImageRef.current = index; // 标记为要替换的附加图像的索引
    multiWidgetRef.current.open(); // 打开上传窗口
  };

  const handleNewSubImag = () => {
    selectedImageRef.current = "new";
    multiWidgetRef.current?.open();
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // 提交表单逻辑
    if (formData && editingId) {
      console.log("Submitting data for ID:", editingId);
      console.log("Data:", formData);
      const { id, ...dataToUpdate } = formData;
      try {
        await updateCommercial(editingId, dataToUpdate, token);
        toast.success("Property updated successfully");
      } catch (error) {
        console.error("Error updating property:", error);
        toast.error("Failed to update property");
      }
    }
  };

  const handleFormAdd = async (e) => {
    e.preventDefault();
    if (formData) {
      try {
        await createCommercial(formData, token);
        toast.success("Commercial created successfully!");
      } catch (err) {
        console.error("Error creating commercial:", error);
        toast.error("Failed to create commercial");
      }
    } else {
      return;
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
                <table className="table-responsive">
                  <thead>
                    <tr>
                      <th className="pl-2">My Commercials</th>
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
                              handleDeleteCommercial(item.id);
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
                        placeholder="type"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>totalInvestment</label>
                      <input
                        type="text"
                        name="totalInvestment"
                        value={formData.totalInvestment || ""}
                        onChange={handleFormChange}
                        placeholder="totalInvestment"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address || ""}
                        onChange={handleFormChange}
                        placeholder="address"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>Price</label>
                      <input
                        type="text"
                        name="price"
                        value={formData.price || ""}
                        onChange={handleFormChange}
                        placeholder="price"
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
                      <label>City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city || ""}
                        className="form-control"
                        onChange={handleFormChange}
                        placeholder="city"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>Commercial Type</label>
                      <input
                        type="text"
                        name="commercialType"
                        value={formData.commercialType || ""}
                        className="form-control"
                        onChange={handleFormChange}
                        placeholder="Commercial Type"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>Area</label>
                      <input
                        type="text"
                        name="Area"
                        value={formData.Area || ""}
                        className="form-control"
                        onChange={handleFormChange}
                        placeholder="Area"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>annualRevenue</label>
                      <input
                        type="text"
                        name="annualRevenue"
                        value={formData.annualRevenue || ""}
                        className="form-control"
                        onChange={handleFormChange}
                        placeholder="annualRevenue"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>estimatedProfit</label>
                      <input
                        type="text"
                        name="estimatedProfit"
                        value={formData.estimatedProfit || ""}
                        className="form-control"
                        onChange={handleFormChange}
                        placeholder="estimatedProfit"
                        step="any"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>EstimatedPaybackPeriod</label>
                      <input
                        type="text"
                        name="EstimatedPaybackPeriod"
                        value={formData.EstimatedPaybackPeriod || ""}
                        className="form-control"
                        onChange={handleFormChange}
                        placeholder="EstimatedPaybackPeriod"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>mlsNumber</label>
                      <input
                        type="text"
                        name="mlsNumber"
                        value={formData.mlsNumber || ""}
                        className="form-control"
                        onChange={handleFormChange}
                        placeholder="mlsNumber"
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
                        required
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>Phone</label>
                      <input
                        type="text"
                        name="agentPhone"
                        value={
                          formData.agentInfo
                            ? formData.agentInfo.phone || ""
                            : ""
                        }
                        onChange={handleFormChange}
                        className="form-control"
                        placeholder="Agent Phone"
                        required
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
                        required
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>Main Image</label>
                      <div className="d-flex align-items-center">
                        <img
                          src={formData.image}
                          alt="Main"
                          style={{
                            width: 100,
                            height: 100,
                            objectFit: "cover",
                            cursor: "pointer",
                          }}
                          className="mr-2"
                          onClick={handleSelectMainImage}
                        />
                        <button onClick={handleSelectMainImage}>
                          Main Image
                        </button>
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <label>Sub Image</label>
                      <div className="d-flex flex-wrap">
                        {formData.images?.map((url, index) => (
                          <div key={index} className="mr-2 mb-2">
                            <img
                              src={url}
                              alt={`Image ${index}`}
                              style={{
                                width: 100,
                                height: 100,
                                objectFit: "cover",
                                cursor: "pointer",
                              }}
                              onClick={() => handleSelectOtherImage(index)}
                            />
                          </div>
                        ))}
                        <button onClick={handleNewSubImag}>
                          Upload Sub image
                        </button>
                      </div>
                    </div>

                    <button type="submit" className="btn btn-success btn-block">
                      Submit
                    </button>
                    <button
                      type="Add"
                      className="btn btn-success btn-block"
                      onClick={handleFormAdd}
                    >
                      Add Commercial
                    </button>
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

export default CommercialModifier;
