import React, { useRef, useState, useEffect, useContext } from "react";
import userDetailContext from "../context/userDetailContext";
import useFranchise from "../Hook/useFranchise";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  updateFranchise,
  createFranchise,
  deleteFranchise,
} from "../utils/Api";

const FranchiseModifier = () => {
  const { data: franchiseData, isError, isLoading } = useFranchise();
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [imageURL, setImageURL] = useState(""); // 主图像
  const [imageURLs, setImageURLs] = useState([]); // 附加图像
  const [mapImageUlr, setMapImageUlr] = useState([]);
  const cloudinaryRef = useRef();
  const multiWidgetRef = useRef();
  const selectedImageRef = useRef(null);
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
          } else if (selected.startsWith("map-")) {
            const mapIndex = parseInt(selected.split("-")[1], 10);
            setMapImageUlr((prevURLs) =>
              prevURLs.map((url, index) =>
                index === mapIndex ? result.info.secure_url : url
              )
            );
            setFormData((prevData) => ({
              ...prevData,
              maps: prevData.maps.map((url, index) =>
                index === mapIndex ? result.info.secure_url : url
              ),
            }));
          } else if (selected.startsWith("sub-")) {
            const subImage = parseInt(selected.split("-")[1], 10);
            setImageURLs((prevURLs) =>
              prevURLs.map((url, index) =>
                index === subImage ? result.info.secure_url : url
              )
            );
            setFormData((prevData) => ({
              ...prevData,
              images: prevData.images.map((url, index) =>
                index === subImage ? result.info.secure_url : url
              ),
            }));
          } else if (selected === "new") {
            setImageURLs((prevURLs) => [...prevURLs, result.info.secure_url]);
            setFormData((prevData) => ({
              ...prevData,
              images: [...(prevData.images || []), result.info.secure_url], // 添加新图片的 URL
            }));
          } else if (selected === "newMap") {
            setMapImageUlr((prevURLs) => [...prevURLs, result.info.secure_url]);
            setFormData((prevData) => ({
              ...prevData,
              maps: [...(prevData.maps || []), result.info.secure_url], // 添加新图片的 URL
            }));
          }
          selectedImageRef.current = null;
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

  const totalPage = Math.ceil(franchiseData.length / 5);
  const currentData = franchiseData.slice(
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
    const franchiseToEdit = franchiseData.find((item) => item.id === id);
    if (franchiseToEdit) {
      setFormData(franchiseToEdit);
      setEditingId(id);
      setMapImageUlr(franchiseToEdit.maps);
      setImageURL(franchiseToEdit.image);
      setImageURLs(franchiseToEdit.images);
    }
  };
  const handleDeleteFranchise = async (id) => {
    try {
      await deleteFranchise(id, token);
      toast.success(`franchise ${id} deleted successfully`);
    } catch (error) {
      console.error("Failed to delete franchise", error);
      toast.error("Failed to delete franchise");
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
      if (agentFields[name]) {
        return {
          ...prevData,
          agentInfo: {
            ...prevData.agentInfo,
            [agentFields[name]]: value,
          },
        };
      } else if (name === "franchiseFee") {
        return {
          ...prevData,
          [name]: value ? parseFloat(value) : 0.0,
        };
      } else {
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
  const handleSelectMapImage = (mapIndex) => {
    selectedImageRef.current = `map-${mapIndex}`; // 标记为主图
    multiWidgetRef.current.open(); // 打开上传窗口
  };

  const handleSelectOtherImage = (index) => {
    selectedImageRef.current = `sub-${index}`; // 标记为要替换的附加图像的索引
    multiWidgetRef.current.open(); // 打开上传窗口
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // 提交表单逻辑
    if (formData && editingId) {
      console.log("Submitting data for ID:", editingId);
      console.log("Data:", formData);
      const { id, ...dataToUpdate } = formData;
      try {
        await updateFranchise(editingId, dataToUpdate, token);
        toast.success("Franchise updated successfully");
      } catch (error) {
        console.error("Error updating Franchise:", error);
        toast.error("Failed to update Franchise");
      }
    }
  };

  const handleFormAdd = async (e) => {
    e.preventDefault();
    if (formData) {
      try {
        await createFranchise(formData, token);
        toast.success("Franchise created successfully!");
      } catch (err) {
        console.error("Error creating Franchise:", error);
        toast.error("Failed to create Franchise");
      }
    } else {
      return;
    }
  };

  const handleNewImage = () => {
    selectedImageRef.current = "new";
    multiWidgetRef.current?.open();
  };
  const handleNewMap = () => {
    selectedImageRef.current = "newMap";
    multiWidgetRef.current?.open();
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
                      <th className="pl-2">My Franchise</th>
                      <th className="p-0" />
                      <th>Size</th>
                      <th>Price</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  {currentData.map((item) => (
                    <tbody key={item.id}>
                      <tr>
                        <td className="image myelist">
                          <a>
                            <img
                              alt="my-properties-3"
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
                              <i className="lni-map-marker" /> {item.size}
                            </figure>
                          </div>
                        </td>
                        <td>{item.franchiseFee}</td>
                        <td>{item.investment}</td>
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
                              handleDeleteFranchise(item.id);
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
                    className="border p-4 rounded"
                    onSubmit={handleFormSubmit}
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
                      <label>Size</label>
                      <input
                        type="text"
                        name="size"
                        value={formData.size || ""}
                        onChange={handleFormChange}
                        placeholder="size"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>Rent</label>
                      <input
                        type="text"
                        name="rent"
                        value={formData.rent || ""}
                        onChange={handleFormChange}
                        placeholder="rent"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>Investment</label>
                      <input
                        type="text"
                        name="investment"
                        value={formData.investment || ""}
                        onChange={handleFormChange}
                        placeholder="investment"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>Franchise Fee</label>
                      <input
                        type="number"
                        name="franchiseFee"
                        value={formData.franchiseFee || ""}
                        onChange={handleFormChange}
                        placeholder="franchiseFee"
                        className="form-control"
                        step={1}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>Sales</label>
                      <input
                        type="text"
                        name="sales"
                        value={formData.sales || ""}
                        onChange={handleFormChange}
                        placeholder="sales"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>target People</label>
                      <input
                        type="text"
                        name="targetPeople"
                        value={formData.targetPeople || ""}
                        onChange={handleFormChange}
                        placeholder="targetPeople"
                        className="form-control"
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
                        name="agentPhone"
                        value={
                          formData.agentInfo
                            ? formData.agentInfo.phone || ""
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
                      <label>Map Image</label>
                      <div className="d-flex flex-wrap">
                        {formData.maps?.map((url, index) => (
                          <div key={index} className="mr-2 mb-2">
                            <img
                              src={url}
                              alt={`Map${index}`}
                              style={{
                                width: 100,
                                height: 100,
                                objectFit: "cover",
                                cursor: "pointer",
                              }}
                              onClick={() => handleSelectMapImage(index)}
                            />
                          </div>
                        ))}
                        <button onClick={handleNewMap}>Upload map image</button>
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <label>Sub Image</label>
                      <div className="d-flex flex-wrap">
                        {formData.images?.map((url, index) => (
                          <div key={index} className="mr-2 mb-2">
                            <img
                              src={url}
                              alt={`Image${index}`}
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
                        <button onClick={handleNewImage}>
                          Upload Sub image
                        </button>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-success btn-block">
                      Submit
                    </button>
                    <button
                      type="submit"
                      className="btn btn-success btn-block"
                      onClick={handleFormAdd}
                    >
                      Add
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

export default FranchiseModifier;
