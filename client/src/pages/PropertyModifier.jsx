import React, { useContext, useEffect, useState, useRef } from "react";
import {
  deleteResidency,
  updateResidency,
  createResidency,
} from "../utils/Api";
import { toast } from "react-toastify";
import useProperty from "../Hook/useProperty";
import AddPropertyModal from "../components/AddPropertyModal/AddPropertyModal";
import { Link } from "react-router-dom";
import userDetailContext from "../context/userDetailContext";
import { useAuth0 } from "@auth0/auth0-react";

const PropertyModifier = () => {
  const { data: propertyData, isError, isLoading } = useProperty();
  const { user, isUserLoading } = useAuth0();
  const [currentPage, setCurrentPage] = useState(1);
  const cloudinaryRef = useRef();
  const multiWidgetRef = useRef();
  const [imageURL, setImageURL] = useState("");
  const [imageURLs, setImageURLs] = useState([]);
  const itemsPerPage = 5;
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    description: "",
    price: "",
    livingSpace: "",
    lotSize: "",
    yearBuild: "",
    municipalTaxes: "",
    schoolTaxes: "",
    condoFee: "",
    rooms: [], // 确保这里是一个数组
    taxed: false,
    isFeature: false,
    facilities: {
      bedrooms: "",
      bathrooms: "",
      parking: "",
    },
    agentInfo: {
      name: "",
      phoneNumber: "",
      email: "",
    },
    amenities: [],
    image: "",
    images: [],
    userEmail: "",
  });
  const [currentAmenity, setCurrentAmenity] = useState("");
  const [amenityToEdit, setAmenityToEdit] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [newRooms, setNewRooms] = useState([]);
  const [roomData, setRoomData] = useState({
    type: "",
    level: "",
    dimensions: "",
    flooring: "",
  });
  const selectedImageRef = useRef(null);
  const {
    userDetails: { token },
  } = useContext(userDetailContext);

  useEffect(() => {
    if (!isUserLoading && user) {
      // 确保加载完成且 user 有数据
      setFormData((prevData) => ({
        ...prevData,
        userEmail: user.email, // 更新 userEmail
      }));
    }
  }, [isUserLoading, user]);

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary; // 使用 window.cloudinary
    multiWidgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dqvrf3bmz", // 替换为你的 Cloudinary 云名称
        uploadPreset: "jml3yeuq", // 替换为你的上传 preset
        maxFiles: 50,
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
            setFormData((prevData) => ({
              ...prevData,
              images: prevData.images.map((url, index) =>
                index === selected ? result.info.secure_url : url
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
          }
          selectedImageRef.current = null;
        }
      }
    );
  }, []);

  if (isError) {
    return (
      <div className="wrapper">
        <span>Error loading Datas</span>
      </div>
    );
  }

  if (isLoading || isUserLoading) {
    return <div style={{ height: "60vh" }} />;
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

  const handleDeleteResidence = async (id) => {
    try {
      await deleteResidency(id, token);
      console.log("deleted");
      toast.success(`User ${id} deleted successfully`);
    } catch (error) {
      console.error("Failed to delete residency", error);
      toast.error("Failed to delete residency");
    }
  };

  const handleEditClick = async (id) => {
    const propertyToEdit = propertyData.find((item) => item.id === id);
    if (propertyToEdit) {
      const updatedFormData = {
        title: propertyToEdit.title || "",
        type: propertyToEdit.type || "",
        description: propertyToEdit.description || "",
        price: propertyToEdit.price || "",
        livingSpace: propertyToEdit.livingSpace || "",
        lotSize: propertyToEdit.lotSize || "",
        yearBuild: propertyToEdit.yearBuild || "",
        municipalTaxes: propertyToEdit.municipalTaxes || "",
        schoolTaxes: propertyToEdit.schoolTaxes || "",
        condoFee: propertyToEdit.condoFee || "",
        rooms: propertyToEdit.rooms || [],
        taxed: propertyToEdit.taxed ?? false,
        facilities: {
          bedrooms: propertyToEdit.facilities?.bedrooms || "",
          bathrooms: propertyToEdit.facilities?.bathrooms || "",
          parking: propertyToEdit.facilities?.parking || "",
        },
        agentInfo: {
          name: propertyToEdit.agentInfo?.name || "",
          phoneNumber: propertyToEdit.agentInfo?.phoneNumber || "",
          email: propertyToEdit.agentInfo?.email || "",
        },
        amenities: propertyToEdit.amenities || [],
        image: propertyToEdit.image || "",
        images: propertyToEdit.images || [],
        userEmail: propertyToEdit.userEmail || "",
      };
      setFormData(updatedFormData);
      setEditingId(id);
      setNewRooms(updatedFormData.rooms);
      setAmenityToEdit(updatedFormData.amenities);
      setEditMode(true);
    }
  };

  const handleRoomEditChange = (e, index) => {
    const { name, value } = e.target;
    if (editMode) {
      setNewRooms((prevRooms) => {
        const updatedRooms = [...prevRooms];
        updatedRooms[index] = { ...updatedRooms[index], [name]: value };
        return updatedRooms;
      });
    }
  };
  const saveRooms = () => {
    setFormData((prevData) => ({
      ...prevData,
      rooms: newRooms,
    }));
    setEditMode(false);
  };

  const handleRoomAddChange = (e) => {
    const { name, value } = e.target;
    setRoomData((prevRoom) => ({
      ...prevRoom,
      [name]: value,
    }));
  };

  const AddRoom = () => {
    setFormData((prevData) => ({
      ...prevData,
      rooms: [...prevData.rooms, roomData], // 将 roomData 添加到 formData 的 rooms 数组中
    }));

    // 清空 roomData
    setRoomData({
      type: "",
      level: "",
      dimensions: "",
      flooring: "",
    });
  };

  const removeRoom = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      rooms: prevData.rooms.filter((_, i) => i !== index),
    }));
  };

  const handleAmenityChange = (e) => {
    setCurrentAmenity(e.target.value);
  };

  const handleAddAmenity = () => {
    if (currentAmenity.trim()) {
      // 检查输入是否为空
      setFormData((prevData) => ({
        ...prevData,
        amenities: [...prevData.amenities, currentAmenity],
      }));
    }
    setCurrentAmenity("");
  };

  const handleAmenityEditChange = (e, index) => {
    const updateAmenities = [...amenityToEdit];
    updateAmenities[index] = e.target.value;
    setAmenityToEdit(updateAmenities);
  };

  const handleEditAmenity = (index) => {
    // 检查 `amenityToEdit` 和索引
    console.log("Current amenities to edit:", amenityToEdit); // 打印当前的 amenities
    console.log("Editing index:", index); // 打印正在编辑的索引

    if (amenityToEdit.length > 0 && index < amenityToEdit.length) {
      setFormData((prevData) => {
        const updatedAmenities = [...prevData.amenities];
        updatedAmenities[index] = amenityToEdit[index]; // 更新特定的 amenity
        console.log("Updated amenities:", updatedAmenities); // 打印更新后的值
        return {
          ...prevData,
          amenities: updatedAmenities,
        };
      });
    } else {
      console.warn("No amenities to update or index is out of bounds."); // 警告信息
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked, // 更新 taxed 属性为 true 或 false
    }));
  };

  const handleSelectMainImage = () => {
    selectedImageRef.current = "main"; // 标记为主图
    multiWidgetRef.current.open(); // 打开上传窗口
  };

  const handleSelectOtherImage = (index) => {
    selectedImageRef.current = `sub-${index}`; // 标记为要替换的附加图像的索引
    multiWidgetRef.current.open(); // 打开上传窗口
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("facilities.")) {
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

  const handleNewImage = () => {
    selectedImageRef.current = "new";
    multiWidgetRef.current?.open();
  };
  const handleFormAdd = async (e) => {
    e.preventDefault();
    console.log("before data:", formData);
    if (formData) {
      try {
        await createResidency(formData, token);
        toast.success("Property created successfully!");
      } catch (err) {
        toast.error("Failed to create property");
        console.log("after data:", formData);
      }
    } else {
      return;
    }
  };

  const handleClearForm = () => {
    setFormData({
      id: "",
      title: "",
      type: "",
      description: "",
      price: 0,
      livingSpace: 0,
      lotSize: 0,
      yearBuild: 0,
      municipalTaxes: 0,
      schoolTaxes: 0,
      condoFee: 0,
      taxed: false,
      rooms: [],
      facilities: {
        bedrooms: 0,
        bathrooms: 0,
        parking: 0,
      },
      agentInfo: {
        name: "",
        phoneNumber: "",
        email: "",
      },
      amenities: [],
      image: "",
      images: [],
    });
    setEditMode(false);
    setNewRooms([]);
    setRoomData([]);
    setAmenityToSubmit([]);
    setCurrentAmenity([]);
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
                      <Link to="/admin">
                        <i className="fa fa-map-marker" /> Dashboard
                      </Link>
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
                        <td>{item.price}</td>
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
                        placeholder="Sale, Rent"
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
                      <label>
                        <input
                          type="checkbox"
                          name="taxed"
                          checked={formData.taxed} // 绑定到 formData 中的 taxed 属性
                          onChange={handleCheckboxChange}
                        />
                        Price includes tax
                      </label>
                    </div>
                    <div className="form-group mb-3">
                      <label>
                        <input
                          type="checkbox"
                          name="isFeature"
                          checked={formData.isFeature} // 绑定到 formData 中的 isFeature 属性
                          onChange={handleCheckboxChange}
                        />
                        Make it Feature
                      </label>
                    </div>
                    <div className="form-group mb-3">
                      <label>Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address || ""}
                        className="form-control"
                        onChange={handleFormChange}
                        placeholder="address"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>Country</label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country || ""}
                        className="form-control"
                        onChange={handleFormChange}
                        placeholder="country"
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
                      <label>mlsNumber</label>
                      <input
                        type="text"
                        name="mlsNumber"
                        value={formData.mlsNumber || ""}
                        onChange={handleFormChange}
                        placeholder="mlsNumber"
                        className="form-control"
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
                      <label>Municipal Taxes</label>
                      <input
                        type="number"
                        name="municipalTaxes"
                        value={formData.municipalTaxes || ""}
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
                    <div className="form-group mb-3">
                      <label>Property Type</label>
                      <input
                        type="text"
                        name="propertyType"
                        value={formData.propertyType || ""}
                        className="form-control"
                        onChange={handleFormChange}
                        placeholder="Condo/House/Appartment"
                      />
                    </div>
                    <h4>Rooms</h4>
                    {newRooms && newRooms.length > 0 ? (
                      newRooms.map((room, index) => (
                        <div key={index} className="room-form mb-4">
                          <h4>Room {index + 1}</h4>
                          <div className="form-group mb-3">
                            <label>Room Type</label>
                            <input
                              type="text"
                              name="type"
                              value={room.type || ""}
                              onChange={(e) => handleRoomEditChange(e, index)}
                              placeholder="Type"
                              className="form-control"
                            />
                          </div>
                          <div className="form-group mb-3">
                            <label>Level</label>
                            <input
                              type="text"
                              name="level"
                              value={room.level || ""}
                              onChange={(e) => handleRoomEditChange(e, index)}
                              placeholder="Level"
                              className="form-control"
                            />
                          </div>
                          <div className="form-group mb-3">
                            <label>Dimensions</label>
                            <input
                              type="text"
                              name="dimensions"
                              value={room.dimensions || ""}
                              onChange={(e) => handleRoomEditChange(e, index)}
                              placeholder="Dimensions"
                              className="form-control"
                            />
                          </div>
                          <div className="form-group mb-3">
                            <label>Flooring</label>
                            <input
                              type="text"
                              name="flooring"
                              value={room.flooring || ""}
                              onChange={(e) => handleRoomEditChange(e, index)}
                              placeholder="Flooring"
                              className="form-control"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeRoom(index)}
                            className="btn btn-danger"
                          >
                            Remove Room
                          </button>
                          <button
                            type="button"
                            onClick={saveRooms}
                            className="btn btn-danger"
                          >
                            Save Rooms
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="room-form mb-4">
                        <h4>Room 1</h4>
                        <div className="form-group mb-3">
                          <label>Room Type</label>
                          <input
                            type="text"
                            name="type"
                            value={roomData.type || ""}
                            onChange={handleRoomAddChange}
                            placeholder="Type"
                            className="form-control"
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label>Level</label>
                          <input
                            type="text"
                            name="level"
                            value={roomData.level || ""}
                            onChange={handleRoomAddChange}
                            placeholder="Level"
                            className="form-control"
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label>Dimensions</label>
                          <input
                            type="text"
                            name="dimensions"
                            value={roomData.dimensions || ""}
                            onChange={handleRoomAddChange}
                            placeholder="Dimensions"
                            className="form-control"
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label>Flooring</label>
                          <input
                            type="text"
                            name="flooring"
                            value={roomData.flooring || ""}
                            onChange={handleRoomAddChange}
                            placeholder="Flooring"
                            className="form-control"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={AddRoom}
                          className="btn btn-danger"
                        >
                          Add Room
                        </button>
                      </div>
                    )}

                    <h4>Facilities</h4>
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
                    {editMode && amenityToEdit.length > 0 ? (
                      amenityToEdit.map((amenity, index) => (
                        <div className="form-group mb-3" key={index}>
                          <label>Amenity {index + 1}</label>
                          <input
                            type="text"
                            name="amenity" // 使用数组索引作为字段名
                            value={amenity || []}
                            onChange={(e) => handleAmenityEditChange(e, index)}
                            className="form-control"
                            placeholder="Amenity"
                          />
                          <button
                            type="button"
                            onClick={() => handleEditAmenity(index)}
                            className="btn btn-primary mt-2"
                          >
                            Change Amenity
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="form-group mb-3">
                        <label>Amenity</label>
                        <input
                          type="text"
                          value={currentAmenity || []}
                          onChange={handleAmenityChange}
                          className="form-control"
                          placeholder="Amenity"
                        />
                        <button
                          type="button"
                          onClick={handleAddAmenity}
                          className="btn btn-primary mt-2"
                        >
                          Add Amenity
                        </button>
                      </div>
                    )}
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
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={handleSelectMainImage}
                        >
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
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={handleNewImage}
                        >
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
                      Add Property
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleClearForm}
                    >
                      Clear Form
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

export default PropertyModifier;
