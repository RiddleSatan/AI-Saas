import { auth } from "@clerk/nextjs/server";
import { MAX_FREE_COUNT } from "@/const";
import prisma from "./index.prisma";

export const increaseApiLimit = async () => {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  const userApiLimit = await prisma.userApiLimit.findUnique({
    where: {
      userId,
    },
  });

  if (userApiLimit) {
    await prisma.userApiLimit.update({
      where: {
        userId: userId,
      },
      data: { count: userApiLimit.count + 1 },
    });
  } else {
    await prisma.userApiLimit.create({
      data: {
        userId: userId,
        count: 1,
      },
    });
  }
};

export const checkApiLimit = async () => {
  const { userId } =auth();

  if (!userId) {
    return;
  }

  const userApiLimit = await prisma.userApiLimit.findUnique({
    where: {
      userId: userId,
    },
  });

  if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNT) {
    return true;
  } else return false;
};

export const getApiLimitCount = async () => {
  const { userId } = auth();

  if (!userId) {
    return 0;
  }

  const apilimit = await prisma.userApiLimit.findUnique({
    where: {
      userId,
    },
  });

  if (!apilimit) {
    return 0;
  }

  return apilimit.count;
};
