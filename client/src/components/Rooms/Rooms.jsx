import React, { useState } from "react";
import { TextInput, Box, Group, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { validateString } from "../../utils/Common";

const Rooms = ({ prevStep, nextStep, PropertyDetails, setPropertyDetails }) => {
  const [rooms, setRooms] = useState(PropertyDetails.rooms || []);

  const form = useForm({
    initialValues: {
      type: "",
      level: "",
      dimensions: "",
      flooring: "",
    },
    validate: {
      type: (value) => validateString(value),
      level: (value) => validateString(value),
      dimensions: (value) => validateString(value),
      flooring: (value) => validateString(value),
    },
  });

  const addRoom = () => {
    const { hasError } = form.validate();
    if (!hasError) {
      const newRoom = {
        type: form.values.type,
        level: form.values.level,
        dimensions: form.values.dimensions,
        flooring: form.values.flooring,
      };
      setRooms((prevRooms) => [...prevRooms, newRoom]);
      form.reset();
    }
  };

  const removeRoom = (index) => {
    setRooms((prevRooms) => prevRooms.filter((element, i) => i !== index));
  };

  const handleSubmit = () => {
    setPropertyDetails((prev) => ({
      ...prev,
      rooms: rooms,
    }));
    nextStep();
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
          label="Room Type"
          {...form.getInputProps("type")}
        />
        <TextInput
          withAsterisk
          label="Level"
          {...form.getInputProps("level")}
        />
        <TextInput
          withAsterisk
          label="Dimensions"
          {...form.getInputProps("dimensions")}
        />
        <TextInput
          withAsterisk
          label="flooring"
          {...form.getInputProps("flooring")}
        />
        <Button mt="md" onClick={addRoom}>
          Add Room
        </Button>
        {rooms.length > 0 && (
          <Box mt="md">
            {rooms.map((room, index) => (
              <Group key={index} position="apart" mt="xs">
                {room && (
                  <div>
                    {room.type} - {room.level} - {room.dimensions} -{" "}
                    {room.flooring}
                  </div>
                )}
                <Button color="red" onClick={() => removeRoom(index)}>
                  Remove
                </Button>
              </Group>
            ))}
          </Box>
        )}
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

export default Rooms;
