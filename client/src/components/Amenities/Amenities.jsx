import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useContext, useState } from "react";
import UserDetailContext from "../../context/userDetailContext";
import useProperties from "../../Hook/useProperty.jsx";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { createResidency } from "../../utils/Api.js";

const Amenities = ({
  PropertyDetails,
  setPropertyDetails,
  setOpened,
  setActiveStep,
  prevStep,
}) => {
  const [amenities, setAmenities] = useState(PropertyDetails.amenities || []);
  const [newAmenity, setNewAmenity] = useState("");

  const handleAddAmenity = () => {
    if (newAmenity.trim() === "") {
      toast.error("Amenity must be a non-empty string");
      return;
    }
    setAmenities((prev) => [...prev, newAmenity]);
    setNewAmenity("");
  };

  const handleSubmit = () => {
    setPropertyDetails((prev) => ({
      ...prev,
      amenities: amenities,
    }));
    mutate();
  };

  //=========================upload logic===============================

  const { user } = useAuth0();
  const {
    userDetails: { token },
  } = useContext(UserDetailContext);
  const { refetch: refetchProperties } = useProperties();

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      createResidency({ ...PropertyDetails, amenities: amenities }, token),
    onError: ({ response }) =>
      toast.error(response.data.message, { position: "bottom-right" }),
    onSettled: () => {
      toast.success("Added Successfully", {
        position: "bottom-right",
      });
      setPropertyDetails({
        title: "",
        description: "",
        price: 0,
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
      setOpened(false);
      setActiveStep(0);
      refetchProperties();
    },
  });

  return (
    <Box maw="30%" mx="auto" my="sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Group position="center" mt="xl">
          <TextInput
            label="Add Amenity"
            value={newAmenity}
            onChange={(e) => setNewAmenity(e.target.value)}
            placeholder="Enter amenity"
          />
          <Button type="button" onClick={handleAddAmenity}>
            Add
          </Button>
        </Group>

        <Box mt="md">
          <h4>Amenities:</h4>
          <ul>
            {amenities.map((amenity, index) => (
              <li key={index}>
                {amenity}
                <Button
                  onClick={() =>
                    setAmenities(amenities.filter((_, i) => i !== index))
                  }
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        </Box>

        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit" color="green" disabled={isLoading}>
            {isLoading ? "Submitting" : "Add Property"}
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default Amenities;
