import asyncHandler from "express-async-handler";

import { prisma } from "../config/prismaConfig.js";

export const createFranchise = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    size,
    rent,
    investment,
    franchiseFee,
    sales,
    targetPeople,
    image,
    images,
    maps,
    agentInfo,
    manual,
  } = req.body.data;

  console.log(req.body.data);
  try {
    const franchise = await prisma.franchise.create({
      data: {
        title,
        description,
        size,
        rent,
        investment,
        franchiseFee,
        sales,
        targetPeople,
        image,
        images,
        maps,
        agentInfo,
        manual,
      },
    });
    res.send({ message: "Franchise created successfully", franchise });
  } catch (err) {
    if (err.code === "P2002") {
      throw new Error("A franchise with details already there");
    }
    throw new Error(err.message);
  }
});

export const getAllFranchise = asyncHandler(async (req, res) => {
  const franchise = await prisma.franchise.findMany({
    orderBy: {
      title: "desc",
    },
  });
  res.send(franchise);
});

export const updateFranchise = async (req, res) => {
  const { id } = req.params;
  const data = req.body.data;
  console.log("Received request to update Franchise with ID", id);

  try {
    console.log("Received data:", data);
    console.log("Received request to update Franchise with ID:", id);
    const existingFranchise = await prisma.franchise.findUnique({
      where: { id },
    });

    if (!existingFranchise) {
      return res.status(404).json({ message: "Franchise not found" });
    }
    console.log("updating Franchise...");
    const updateFranchise = await prisma.franchise.update({
      where: { id },
      data,
    });
    res.status(200).json(updateFranchise);
  } catch (err) {
    console.error("Error updating Franchise:", JSON.stringify(err, null, 2));
    res.status(500).json({ message: err.message });
  }
};

export const deleteFranchise = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.franchise.delete({
      where: { id },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
