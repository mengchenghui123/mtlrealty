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
      type: PropertyDetails.type,
      price: PropertyDetails.price,
      mlsNumber: PropertyDetails.mlsNumber,
      propertyType: PropertyDetails.propertyType,
      livingSpace: PropertyDetails.livingSpace,
      yearBuild: PropertyDetails.yearBuild,
      municipalTaxes: PropertyDetails.municipalTaxes,
      schoolTaxes: PropertyDetails.schoolTaxes,
      condoFee: PropertyDetails.condoFee,
      lotSize: PropertyDetails.lotSize,
    },
    validate: {
      title: (value) => validateString(value),
      description: (value) => validateString(value),
      type: (value) =>
        value === "Rent" || value === "Sale"
          ? null
          : "Must be either 'Rent' or 'Sale'",
      price: (value) =>
        value < 100 ? "Must be greater than 100 dollars" : null,
      mlsNumber: (value) => validateString(value),
      propertyType: (value) => validateString(value),
      livingSpace: (value) => (value < 0 ? "Must be greater than 0" : null),
      yearBuild: (value) => (value < 1000 ? "Must be greater than 1000" : null),
      municipalTaxes: (value) => (value < 0 ? "Must be greater than 0" : null),
      schoolTaxes: (value) => (value < 0 ? "Must be greater than 0" : null),
      condoFee: (value) => (value < 0 ? "Must be greater than 0" : null),
      lotSize: (value) => (value < 0 ? "Must be greater than 0" : null),
    },
  });

  const {
    title,
    description,
    price,
    type,
    mlsNumber,
    propertyType,
    livingSpace,
    yearBuild,
    municipalTaxes,
    schoolTaxes,
    condoFee,
    lotSize,
  } = form.values;
  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => ({
        ...prev,
        title,
        description,
        price,
        type,
        mlsNumber,
        propertyType,
        livingSpace,
        yearBuild,
        municipalTaxes,
        schoolTaxes,
        condoFee,
        lotSize,
      }));
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
          placeholder="Property title"
          {...form.getInputProps("title")}
        />
        <Textarea
          placeholder="Description"
          label="Description"
          withAsterisk
          {...form.getInputProps("description")}
        />
        <Textarea
          placeholder="Rent or Sale"
          label="Type"
          withAsterisk
          {...form.getInputProps("type")}
        />
        <NumberInput
          withAsterisk
          label="Price"
          placeholder="500"
          min={0}
          {...form.getInputProps("price")}
        />
        <TextInput
          withAsterisk
          label="mls number"
          placeholder="msl number"
          {...form.getInputProps("mlsNumber")}
        />
        <TextInput
          withAsterisk
          label="property type"
          placeholder="Rent or Sale"
          {...form.getInputProps("propertyType")}
        />
        <NumberInput
          withAsterisk
          label="livingSpace"
          placeholder="0"
          min={0}
          {...form.getInputProps("livingSpace")}
        />
        <NumberInput
          withAsterisk
          label="yearBuild"
          placeholder="0"
          min={1000}
          {...form.getInputProps("yearBuild")}
        />
        <NumberInput
          withAsterisk
          label="municipalTaxes"
          placeholder="0"
          min={0}
          {...form.getInputProps("municipalTaxes")}
        />
        <NumberInput
          withAsterisk
          label="schoolTaxes"
          placeholder="0"
          min={0}
          {...form.getInputProps("schoolTaxes")}
        />
        <NumberInput
          withAsterisk
          label="condoFee"
          placeholder="0"
          min={0}
          {...form.getInputProps("condoFee")}
        />
        <NumberInput
          withAsterisk
          label="lotSize"
          placeholder="0"
          min={0}
          {...form.getInputProps("lotSize")}
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
