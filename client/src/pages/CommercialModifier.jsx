import React, { useRef, useState, useEffect, useContext } from "react";
import useCommercial from "../Hook/useCommercial";
import { AiOutlineCloudUpload } from "react-icons/ai";
import userDetailContext from "../context/userDetailContext";
import { updateCommercial, createCommercial } from "../utils/Api";

const CommercialModifier = () => {
  const { data: commercialData, isError, isLoading } = useCommercial();
  const [selectedCommercial, setSelectedCommercial] = useState(null);
  const [formData, setFormData] = useState({});
  const {
    userDetails: { token },
  } = useContext(userDetailContext);
  const [imageURL, setImageURL] = useState("");
  const [imageURLs, setImageURLs] = useState([]);
  const cloudinaryRef = useRef();
  const multiWidgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    multiWidgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dbsagqpe3",
        uploadPreset: "krgglwqe",
        maxFiles: 10,
      },
      (err, result) => {
        if (result.event === "success") {
          if (!imageURL) {
            setImageURL(result.info.secure_url); // 设置主图像
          } else {
            setImageURLs((prevURLs) => [...prevURLs, result.info.secure_url]); // 添加其他图像
          }
        }
      }
    );
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data.</p>;

  const handleSelect = (commercial) => {
    setSelectedCommercial(commercial);
    setFormData(commercial);
    setImageURL(commercial.image || "");
    setImageURLs(commercial.images || []);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateCommercial(
        selectedCommercial.id,
        { ...formData, image: imageURL, images: imageURLs },
        token
      );
      console.log("update successful");
      selectedCommercial(null);
      setFormData({});
      setImageURL("");
      setImageURLs([]);
    } catch (error) {
      alert("Error updating commercial");
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await createCommercial(
        { ...formData, image: imageURL, images: imageURLs },
        token
      );
      console.log("create successful");
      setFormData({});
      setImageURL("");
      setImageURLs([]);
    } catch (error) {
      console.log("Error adding commercial.");
    }
  };

  const handleDeleteImage = (url) => {
    setImageURLs(imageURLs.filter((image) => image != url));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Manager Commercial</h1>
      <ul className="list-group mb-4">
        {commercialData.map((commercial) => {
          <li
            key={commercial.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {commercial.title}
            <button onClick={() => handleSelect(commercial)}>Edit</button>
          </li>;
        })}
      </ul>
      <h2 className="text-center mb-4">
        {selectedCommercial ? "Edit Commercial" : "Add Commercial"}
      </h2>
      <form
        onSubmit={selectedCommercial ? handleUpdate : handleAdd}
        className="border p-4 rounded"
      >
        <div className="form-group">
          <input
            type="text"
            name="title"
            value={formData.title || ""}
            onChange={handleChange}
            placeholder="Title"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="type"
            value={formData.type || "Rent/Sale/Commercial"}
            onChange={handleChange}
            placeholder="Type"
            required
          />
        </div>
        <div className="form-group">
          <textarea
            name="type"
            value={formData.description || ""}
            onChange={handleChange}
            placeholder="Description"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="propertyType"
            value={formData.propertyType || ""}
            onChange={handleChange}
            placeholder="propertyType eg:House/Condo/Restaurant"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="livingSpace"
            value={formData.livingSpace || ""}
            onChange={handleChange}
            placeholder="livingSpace sqft"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="lotSize"
            value={formData.lotSize || ""}
            onChange={handleChange}
            placeholder="lotSize sqft"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="annualRevenue"
            value={formData.lotSize || ""}
            onChange={handleChange}
            placeholder="$annualRevenue"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="totalInvestment"
            value={formData.totalInvestment || ""}
            onChange={handleChange}
            placeholder="$totalInvestment"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="estimatedProfit"
            value={formData.estimatedProfit || ""}
            onChange={handleChange}
            placeholder="$estimatedProfit"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="EstimatedPaybackPeriod"
            value={formData.EstimatedPaybackPeriod || ""}
            onChange={handleChange}
            placeholder="EstimatedPaybackPeriod"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="address"
            value={formData.address || ""}
            onChange={handleChange}
            placeholder="address"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="mlsNumber"
            value={formData.mlsNumber || ""}
            onChange={handleChange}
            placeholder="mlsNumber"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="mlsNumber"
            value={formData.mlsNumber || ""}
            onChange={handleChange}
            placeholder="mlsNumber"
            required
          />
        </div>
        <div className="form-group">
          <div onClick={() => multiWidgetRef.current.open()}>
            <AiOutlineCloudUpload size={50} color="grey" />
            <span>Upload Main Image</span>
          </div>
          {imageURL && (
            <div className="uploadedImage">
              <img src={imageURL} alt="Main Image" />
              <button onClick={() => setImageURL("")}>Remove Main Image</button>
            </div>
          )}
        </div>
        <div className="form-group">
          <div onClick={() => multiWidgetRef.current.open()}>
            <AiOutlineCloudUpload size={50} color="grey" />
            <span>Upload Additional Images</span>
          </div>
          <div className="uploadImages">
            {imageURLs.map((url, index) => (
              <div key={index} className="uploadedImage">
                <img src={url} alt={`upload-${index}`} />
                <button onClick={() => handleDeleteImage(url)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          {selectedCommercial ? "Update Commercial" : "Add Commercial"}
        </button>
      </form>
    </div>
  );
};

export default CommercialModifier;
