import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import "./UploadMultipleImages.css";
import { Button, Group } from "@mantine/core";

const UploadMultipleImages = ({
  PropertyDetails,
  setPropertyDetails,
  nextStep,
  prevStep,
}) => {
  const [imageURLs, setImageURLs] = useState(PropertyDetails.images || []);
  const cloudinaryRef = useRef();
  const multiWidgetRef = useRef();

  const handleNext = () => {
    setPropertyDetails((prev) => ({ ...prev, images: imageURLs }));
    nextStep();
  };

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
          setImageURLs((prevURLs) => [...prevURLs, result.info.secure_url]);
        }
      }
    );
  }, []);

  return (
    <div className="flexColCenter uploadWrapper">
      <div
        className="flexColCenter uploadZone"
        onClick={() => multiWidgetRef.current?.open()}
      >
        <AiOutlineCloudUpload size={50} color="grey" />
        <span>Upload Images</span>
      </div>
      <div className="uploadImages">
        {imageURLs.map((url, index) => (
          <div key={index} className="uploadedImage">
            <img src={url} alt={`upload-${index}`} />
          </div>
        ))}
      </div>
      <Group position="center" mt={"xl"}>
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={imageURLs.length === 0}>
          Next
        </Button>
      </Group>
    </div>
  );
};

export default UploadMultipleImages;
