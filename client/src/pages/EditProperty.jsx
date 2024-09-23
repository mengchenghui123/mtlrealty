import React from "react";
import { useParams } from "react-router-dom";

const EditProperty = () => {
  const { id } = useParams();
  return <p>ID is :{id}</p>;
};

export default EditProperty;
