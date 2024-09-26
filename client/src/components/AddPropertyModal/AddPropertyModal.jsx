import { Container, Modal, Stepper } from "@mantine/core";
import React, { useState } from "react";
import AddLocation from "../AddLocation/AddLocation";
import { useAuth0 } from "@auth0/auth0-react";
import UploadImage from "../UploadImage/UploadImage";
import BasicDetails from "../BasicDetails/BasicDetails";
import Facilities from "../Facilities/Facilities";
import Amenities from "../Amenities/Amenities";
import Rooms from "../Rooms/Rooms";
import UploadMultipleImages from "../UploadMultipleImages/UploadMultipleImages";

const AddPropertyModal = ({ opened, setOpened }) => {
  const [active, setActive] = useState(0);
  const { user } = useAuth0();
  const [PropertyDetails, setPropertyDetails] = useState({
    title: "",
    description: "",
    price: 0,
    type: "",
    country: "",
    city: "",
    address: "",
    mlsNumber: "",
    propertyType: "",
    lotSize: 0,
    livingSpace: 0,
    yearBuild: 0,
    municipalTaxes: 0,
    schoolTaxes: 0,
    condoFee: 0,
    image: null,
    images: [],
    facilities: {
      bedrooms: 0,
      bathrooms: 0,
      parking: 0,
    },
    amenities: [],
    rooms: [],
    agentInfo: {},
    userEmail: user?.email,
  });
  const nextStep = () => {
    setActive((current) => (current < 7 ? current + 1 : current));
  };

  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current));
  };

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      closeOnClickOutside
      size={"90rem"}
    >
      <Container h={"40rem"} w={"100%"}>
        <Stepper active={active} onStepClick={setActive}>
          <Stepper.Step label="Location" description="Address">
            <AddLocation
              nextStep={nextStep}
              PropertyDetails={PropertyDetails}
              setPropertyDetails={setPropertyDetails}
            />
          </Stepper.Step>
          <Stepper.Step label="Image" description="Upload">
            <UploadImage
              prevStep={prevStep}
              nextStep={nextStep}
              PropertyDetails={PropertyDetails}
              setPropertyDetails={setPropertyDetails}
            />
          </Stepper.Step>

          <Stepper.Step label="Images" description="Upload">
            <UploadMultipleImages
              prevStep={prevStep}
              nextStep={nextStep}
              PropertyDetails={PropertyDetails}
              setPropertyDetails={setPropertyDetails}
            />
          </Stepper.Step>

          <Stepper.Step label="Basics" description="Detail">
            <BasicDetails
              prevStep={prevStep}
              nextStep={nextStep}
              PropertyDetails={PropertyDetails}
              setPropertyDetails={setPropertyDetails}
            />
          </Stepper.Step>

          <Stepper.Step label="Facilities" description="Facilities">
            <Facilities
              PropertyDetails={PropertyDetails}
              setPropertyDetails={setPropertyDetails}
              prevStep={prevStep}
              nextStep={nextStep}
            />
          </Stepper.Step>

          <Stepper.Step label="Rooms" description="Rooms">
            <Rooms
              PropertyDetails={PropertyDetails}
              setPropertyDetails={setPropertyDetails}
              prevStep={prevStep}
              nextStep={nextStep}
            />
          </Stepper.Step>

          <Stepper.Step label="Amenities" description="Amenities">
            <Amenities
              PropertyDetails={PropertyDetails}
              setPropertyDetails={setPropertyDetails}
              prevStep={prevStep}
              setOpened={setOpened}
              setActiveStep={setActive}
            />
          </Stepper.Step>

          <Stepper.Completed>
            Completed, click back button to get to previous step
          </Stepper.Completed>
        </Stepper>
      </Container>
    </Modal>
  );
};

export default AddPropertyModal;
