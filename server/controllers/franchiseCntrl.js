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
