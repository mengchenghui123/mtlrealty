import asyncHandler from "express-async-handler";

import { prisma } from "../config/prismaConfig.js";

export const createResidency = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    type,
    price,
    address,
    mlsNumber,
    propertyType,
    livingSpace,
    lotSize,
    yearBuild,
    country,
    municipalTaxes,
    schoolTaxes,
    condoFee,
    rooms,
    image,
    facilities,
    images,
    userEmail,
    agentInfo,
    amenities,
  } = req.body.data;
  if (rooms === null || typeof rooms !== "object") {
    return res.status(400).send({
      message: "Rooms field is required and must be a valid JSON object.",
    });
  }
  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        type,
        price,
        address,
        mlsNumber,
        propertyType,
        livingSpace,
        lotSize,
        yearBuild,
        country,
        municipalTaxes,
        schoolTaxes,
        condoFee,
        rooms,
        image,
        facilities,
        images,
        userEmail,
        agentInfo,
        amenities,
        owner: { connect: { email: userEmail } },
      },
    });
    res.send({ message: "Residency created successfully", residency });
  } catch (err) {
    if (err.code === "P2002") {
      throw new Error("Residency with address already here");
    }
    throw new Error(err.message);
  }
});

//function to get all the documents /residencies
export const getAllResidencies = asyncHandler(async (req, res) => {
  const residencies = await prisma.residency.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  res.send(residencies);
});

//function to ge a specific document/residency
export const getResidency = asyncHandler(async (req, res) => {
  //禁用缓存
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", 0);
  res.setHeader("Surrogate-Control", "no-store");

  const { id } = req.params;

  try {
    const residency = await prisma.residency.findUnique({
      where: { id },
    });
    res.send(residency);
  } catch (err) {
    // throw new Error(err.message);
    console.error("error fetching residency:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export const deleteResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.residency.delete({
      where: { id },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const updateResidency = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const updatedResidency = await prisma.residency.update({
      where: { id },
      data,
    });
    res.status(200).json(updatedResidency);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUpdateResidency = async (req, res) => {
  const { id } = req.params; // 从请求参数中获取 ID
  try {
    const residency = await prisma.residency.findUnique({ where: { id } }); // 查找居住地
    if (!residency) {
      return res.status(404).json({ message: "Residency not found" }); // 如果未找到，返回404
    }
    res.status(200).json(residency); // 返回居住地数据
  } catch (err) {
    res.status(500).json({ message: err.message }); // 处理错误
  }
};
