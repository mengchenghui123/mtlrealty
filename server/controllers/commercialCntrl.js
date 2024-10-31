import asyncHandler from "express-async-handler";

import { prisma } from "../config/prismaConfig.js";

export const createCommercial = asyncHandler(async (req, res) => {
  const {
    Area,
    EstimatedPaybackPeriod,
    address,
    description,
    annualRevenue,
    estimatedProfit,
    commercialType,
    image,
    images,
    mlsNumber,
    price,
    title,
    totalInvestment,
    type,
    city,
    agentInfo,
    taxed,
    isFeature,
  } = req.body.data;
  console.log(req.body.data);

  try {
    const commercial = await prisma.commercial.create({
      data: {
        Area,
        EstimatedPaybackPeriod,
        address,
        description,
        annualRevenue,
        estimatedProfit,
        commercialType,
        image,
        images,
        mlsNumber,
        price,
        title,
        totalInvestment,
        type,
        city,
        agentInfo,
        taxed,
        isFeature,
      },
    });
    res.send({ message: "Commercial created successfully", commercial });
  } catch (err) {
    if (err.code === "P2002") {
      throw new Error("A commercial with details already there");
    }
    throw new Error(err.message);
  }
});

export const updateCommercial = async (req, res) => {
  const { id } = req.params;
  const data = req.body.data;
  console.log("Received request to update commercial with ID", id);

  try {
    console.log("Received data:", data);
    console.log("Received request to update commercial with ID:", id);
    const existingCommercial = await prisma.commercial.findUnique({
      where: { id },
    });

    if (!existingCommercial) {
      return res.status(404).json({ message: "commercial not found" });
    }
    console.log("updating commercial...");
    const updateCommercial = await prisma.commercial.update({
      where: { id },
      data,
    });
    res.status(200).json(updateCommercial);
  } catch (err) {
    console.error("Error updating commercial:", JSON.stringify(err, null, 2));
    res.status(500).json({ message: err.message });
  }
};

export const getAllCommercial = asyncHandler(async (req, res) => {
  const commercial = await prisma.commercial.findMany({
    orderBy: {
      title: "desc",
    },
  });
  res.send(commercial);
});

export const deleteCommercial = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.commercial.delete({
      where: { id },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
