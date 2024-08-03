import { useForm } from "@mantine/form";
import React from "react";
import { validateString } from "../../utils/Common";
import {
  TextInput,
  Box,
  Textarea,
  Group,
  Button,
  NumberInput,
} from "@mantine/core";

const BasicDetails = ({
  PropertyDetails,
  setPropertyDetails,
  nextStep,
  prevStep,
}) => {
  const form = useForm({
    initialValues: {
      title: PropertyDetails.title,
      description: PropertyDetails.description,
      price: PropertyDetails.price,
    },
    validate: {
      title: (value) => validateString(value),
      description: (value) => validateString(value),
      price: (value) =>
        value < 100 ? "Must be greater than 100 dollars" : null,
    },
  });

  const { title, description, price } = form.values;
  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => ({ ...prev, title, description, price }));
      nextStep();
    }
  };

  return (
    <Box maw="50%" mx="auto" my="md">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <TextInput
          withAsterisk
          label="Title"
          placeholder="Property Name"
          {...form.getInputProps("title")}
        />
        <Textarea
          placeholder="Description"
          label="Description"
          withAsterisk
          {...form.getInputProps("description")}
        />
        <NumberInput
          withAsterisk
          label="Price"
          placeholder="500"
          min={0}
          {...form.getInputProps("price")}
        />
        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit">Next step</Button>
        </Group>
      </form>
    </Box>
  );
};

export default BasicDetails;
