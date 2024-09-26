import React from "react";
import { useForm } from "@mantine/form";
import { validateString } from "../../utils/Common";
import { Button, Group, Select, TextInput } from "@mantine/core";
import useCountries from "../../Hook/useCountries";
import "@mantine/dates/styles.css";

const AddLocation = ({ PropertyDetails, setPropertyDetails, nextStep }) => {
  const { getAll } = useCountries();
  const form = useForm({
    initialValues: {
      country: PropertyDetails?.country,
      city: PropertyDetails?.city,
      address: PropertyDetails?.address,
    },
    validate: {
      country: (value) => validateString(value),
      city: (value) => validateString(value),
      address: (value) => validateString(value),
    },
  });

  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => ({ ...prev, city, address, country }));
      nextStep();
    }
  };

  const { country, city, address } = form.values;
  const location = `${address}, ${city}, ${country}`;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div
        className="flexCenter"
        style={{
          justifyContent: "space-between",
          gap: "3rem",
          marginTop: "3rem",
          flexDirection: "row",
        }}
      >
        {/*left side */}
        {/*input */}
        <div className="flexColStart" style={{ flex: 1 }}>
          <Select
            w={"100%"}
            withAsterisk
            label="Country"
            clearable
            searchable
            data={getAll()}
            {...form.getInputProps("country", { type: "input" })}
          />

          <TextInput
            w={"100%"}
            withAsterisk
            label="City"
            {...form.getInputProps("city", { type: "input" })}
          />

          <TextInput
            w={"100%"}
            withAsterisk
            label="Address"
            {...form.getInputProps("address", { type: "input" })}
          />
        </div>

        {/*right side */}

        <div className="flexColStart" style={{ flex: 1 }}>
          <iframe
            src={`https://www.google.ca/maps?q=${encodeURIComponent(
              location
            )}&output=embed`}
            width="100%"
            height="450"
            style={{ border: 0, marginTop: "20px" }}
            allowFullScreen
            tabIndex="0"
          ></iframe>
        </div>
      </div>

      <Group position="center" mt={"xl"}>
        <Button type="submit">Next Step</Button>
      </Group>
    </form>
  );
};

export default AddLocation;
