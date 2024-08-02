import { Box, NumberInput, Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";

const Facilities = ({
  PropertyDetails,
  setPropertyDetails,
  nextStep,
  prevStep,
}) => {
  const form = useForm({
    initialValues: {
      bedrooms: PropertyDetails.facilities.bedrooms,
      parking: PropertyDetails.facilities.parking,
      bathrooms: PropertyDetails.facilities.bathrooms,
    },

    validate: {
      bedrooms: (value) =>
        value < 1 ? "Must have at least one bedroom" : null,
      bathrooms: (value) =>
        value < 1 ? "Must have at least one bathroom" : null,
    },
  });

  const { bedrooms, parking, bathrooms } = form.values;

  const handleNext = () => {
    setPropertyDetails((prev) => ({
      ...prev,
      facilities: { bedrooms, parking, bathrooms },
    }));
    nextStep();
  };
  return (
    <Box maw="30%" mx="auto" my="sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <NumberInput
          withAsterisk
          label="No of Bedrooms"
          min={0}
          {...form.getInputProps("bedrooms")}
        />
        <NumberInput
          label="No of Parking"
          min={0}
          {...form.getInputProps("parking")}
        />
        <NumberInput
          withAsterisk
          label="No of Bathrooms"
          min={0}
          {...form.getInputProps("bathrooms")}
        />
        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button onClick={handleNext}>Next Step</Button>
        </Group>
      </form>
    </Box>
  );
};

export default Facilities;
