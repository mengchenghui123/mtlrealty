import React from "react";
import PropertyGrid from "../PropertyGrid/PropertyGrid";
import PropertyServices from "../PropertyServices/PropertyServices";
import useProperty from "../../Hook/useProperty";
import useFranchise from "../../Hook/useFranchise";
import useCommercial from "../../Hook/useCommercial";

export const Risidencies = () => {
  const { data, isError, isLoading } = useProperty();
  const {
    data: franchiseData,
    isError: isFranchiseError,
    isLoading: isFranchiseLoading,
  } = useFranchise();
  const {
    data: commercialData,
    isError: iscommercialError,
    isLoading: isCommercialLoading,
  } = useCommercial();
  const propertyChunks = [];
  const title = ["Residential", "Franchise", "Commercial"];
  const chunkSize = 6;

  if (isError || isFranchiseError || iscommercialError) {
    return (
      <div className="wrapper">
        <span>Error loading Properties</span>
      </div>
    );
  }

  if (isLoading || isFranchiseLoading || isCommercialLoading) {
    return <div style={{ height: "60vh" }}></div>;
  }

  const limitedData = data ? data.slice(0, 6) : [];
  const limitedFranchiseData = franchiseData ? franchiseData.slice(0, 6) : [];
  const limitedCommercialData = commercialData
    ? commercialData.slice(0, 6)
    : [];
  const combineData = [
    ...limitedData,
    ...limitedFranchiseData,
    ...limitedCommercialData,
  ];

  const totalProperties =
    limitedData.length +
    limitedFranchiseData.length +
    limitedCommercialData.length;

  for (let i = 0; i < totalProperties; i += chunkSize) {
    propertyChunks.push(combineData.slice(i, i + chunkSize));
  }

  console.log(propertyChunks);

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
    </section>
  );
};

export default Risidencies;
