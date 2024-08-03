import { auth } from "@clerk/nextjs/server";
import { MAX_FREE_COUNT } from "@/const";
import prisma from "./index.prisma";

const increaseApiLimit = async () => {
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

  const checkApiLimit = await prisma.userApiLimit.findUnique({
    where: {
      userId,
    },
  });

  if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNT) {
    return true;
  } else {
    return false;
  }
};
