import React from "react";
// import "./Residencies.css";
import PropertyGrid from "../PropertyGrid/PropertyGrid";
import PropertyServices from "../PropertyServices/PropertyServices";
import NewsGrid from "../NewsGrid/NewsGrid";
import useProperty from "../../Hook/useProperty";
import useFranchise from "../../Hook/useFranchise";
import { PuffLoader } from "react-spinners";

export const Risidencies = () => {
  const { data, isError, isLoading } = useProperty();
  const {
    data: franchiseData,
    isError: isFranchiseError,
    isLoading: isFranchiseLoading,
  } = useFranchise();
  const propertyChunks = [];
  const title = ["Residential", "Franchise"];
  const chunkSize = 8;
  const numberOfChunk = 2;

  if (isError || isFranchiseError) {
    return (
      <div className="wrapper">
        <span>Error loading Properties</span>
      </div>
    );
  }

  if (isLoading || isFranchiseLoading) {
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

  const limitedData = data ? data.slice(0, 8) : [];
  const limitedFranchiseData = franchiseData ? franchiseData.slice(0, 8) : [];
  const combineData = [...limitedData, ...limitedFranchiseData];
  for (let i = 0; i < numberOfChunk; i++) {
    propertyChunks.push(combineData.slice(i * chunkSize, (i + 1) * chunkSize));
  }

  return (
    <section className="r-wrapper">
      {propertyChunks.map((chunk, index) => (
        <React.Fragment key={index}>
          {index === 1 && (
            <div key="services" className="property-section">
              <div className="paddings innerwidth r-container">
                <PropertyServices />
              </div>
            </div>
          )}
          <div key={title[index]} className="property-section">
            <div className="paddings innerwidth r-container">
              <PropertyGrid
                properties={chunk}
                title={title[index]} // 使用标题数组
              />
            </div>
          </div>
        </React.Fragment>
      ))}

      <div className="property-section">
        <div className="paddings innerwidth r-container">
          <NewsGrid />
        </div>
      </div>
    </section>
  );
};

export default Risidencies;
