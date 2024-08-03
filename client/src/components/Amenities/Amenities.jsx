import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Group, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useContext } from "react";
import UserDetailContext from "../../context/userDetailContext";
import useProperties from "../../Hook/useProperty.jsx";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { createResidency } from "../../utils/Api.js";

const Amenities = ({
  prevStep,
  PropertyDetails,
  setPropertyDetails,
  setOpened,
  setActiveStep,
}) => {
  const form = useForm({
    initialValues: {
      gym: PropertyDetails.amenities.gym,
      pool: PropertyDetails.amenities.pool,
      ac: PropertyDetails.amenities.ac,
      balcony: PropertyDetails.amenities.balcony,
    },
    validate: {
      gym: (value) =>
        value === "yes" || value === "no" ? null : "please type yes or no",
      pool: (value) =>
        value === "yes" || value === "no" ? null : "please type yes or no",
      ac: (value) =>
        value === "yes" || value === "no" ? null : "please type yes or no",
      balcony: (value) =>
        value === "yes" || value === "no" ? null : "please type yes or no",
    },
  });

  const { gym, pool, ac, balcony } = form.values;

  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => ({
        ...prev,
        amenities: { gym, pool, ac, balcony },
      }));
      mutate();
    }
  };

  //=========================upload logic===============================

  const { user } = useAuth0();
  const {
    userDetails: { token },
  } = useContext(UserDetailContext);
  const { refetch: refetchProperties } = useProperties();

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      createResidency(
        {
          ...PropertyDetails,
          amenities: { gym, pool, ac, balcony },
        },
        token
      ),
    onError: ({ response }) =>
      toast.error(response.data.message, { position: "bottom-right" }),
    onSettled: () => {
      toast.success("Added Successfully", { position: "bottom-right" });
      setPropertyDetails({
        title: "",
        description: "",
        price: 0,
        country: "",
        city: "",
        address: "",
        image: null,
        images: [],
        facilities: {
          bedrooms: 0,
          bathrooms: 0,
          parking: 0,
        },
        amenities: {
          gym: "",
          pool: "",
          ac: "",
          balcony: "",
        },
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
        <Select
          withAsterisk
          label="Gym"
          data={["yes", "no"]}
          {...form.getInputProps("gym")}
        />
        <Select
          withAsterisk
          label="AC"
          data={["yes", "no"]}
          {...form.getInputProps("ac")}
        />
        <Select
          withAsterisk
          label="Balcony"
          data={["yes", "no"]}
          {...form.getInputProps("balcony")}
        />
        <Select
          withAsterisk
          label="Pool"
          data={["yes", "no"]}
          {...form.getInputProps("pool")}
        />

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
