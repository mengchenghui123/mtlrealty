import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";

const UploadImage = ({
  PropertyDetails,
  setPropertyDetails,
  nextStep,
  prevStep,
}) => {
  const [imageURL, setImageURL] = useState(PropertyDetails.image);
  return (
    <div className="flexColCenter uploadWrapper">
      {!imageURL ? (
        <div className="flexColCenter uploadZone">
          <AiOutlineCloudUpload size={50} color="grey" />
          <span>Upload Image</span>
        </div>
      ) : (
        <div className="uploadImage">
          <img src={imageURL} alt="" />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
