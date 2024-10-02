import React, { useRef, useState, useEffect } from "react";
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
    <div>
      <h1>Manager Commercial</h1>
      <ul>
        {commercialData.map((commercial) => {
          <li key={commercial.id}>
            {commercial.title}
            <button onClick={() => handleSelect(commercial)}>Edit</button>
          </li>;
        })}
      </ul>
      <h2>{selectedCommercial ? "Edit Commercial" : "Add Commercial"}</h2>
      <form onSubmit={selectedCommercial ? handleUpdate : handleAdd}>
        <input
          type="text"
          name="title"
          value={formData.title || ""}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <input
          type="text"
          name="type"
          value={formData.type || "Rent/Sale/Commercial"}
          onChange={handleChange}
          placeholder="Type"
          required
        />
        <textarea
          name="type"
          value={formData.description || ""}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          type="text"
          name="propertyType"
          value={formData.propertyType || ""}
          onChange={handleChange}
          placeholder="propertyType eg:House/Condo/Restaurant"
          required
        />
        <input
          type="text"
          name="livingSpace"
          value={formData.livingSpace || ""}
          onChange={handleChange}
          placeholder="livingSpace sqft"
          required
        />
        <input
          type="text"
          name="lotSize"
          value={formData.lotSize || ""}
          onChange={handleChange}
          placeholder="lotSize sqft"
          required
        />
        <input
          type="text"
          name="annualRevenue"
          value={formData.lotSize || ""}
          onChange={handleChange}
          placeholder="$annualRevenue"
          required
        />
        <input
          type="text"
          name="totalInvestment"
          value={formData.totalInvestment || ""}
          onChange={handleChange}
          placeholder="$totalInvestment"
          required
        />
        <input
          type="text"
          name="estimatedProfit"
          value={formData.estimatedProfit || ""}
          onChange={handleChange}
          placeholder="$estimatedProfit"
          required
        />
        <input
          type="text"
          name="EstimatedPaybackPeriod"
          value={formData.EstimatedPaybackPeriod || ""}
          onChange={handleChange}
          placeholder="EstimatedPaybackPeriod"
          required
        />
        <input
          type="text"
          name="address"
          value={formData.address || ""}
          onChange={handleChange}
          placeholder="address"
          required
        />
        <input
          type="text"
          name="mlsNumber"
          value={formData.mlsNumber || ""}
          onChange={handleChange}
          placeholder="mlsNumber"
          required
        />
        <input
          type="text"
          name="mlsNumber"
          value={formData.mlsNumber || ""}
          onChange={handleChange}
          placeholder="mlsNumber"
          required
        />
        <div>
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
        <div>
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
        <button type="submit">
          {selectedCommercial ? "Update Commercial" : "Add Commercial"}
        </button>
      </form>
    </div>
  );
};

export default CommercialModifier;
