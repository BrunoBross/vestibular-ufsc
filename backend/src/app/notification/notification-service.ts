import { ClientError } from "@/errors/client-error";
import { expo } from "@/lib/expo";
import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
import { ExpoPushMessage } from "expo-server-sdk";
import { NotificationType } from "./notification-controller";

export const sendNotificationToDevice = async (
  notification: NotificationType
) => {
  const userList = await prisma.user.findMany();

  const messages: ExpoPushMessage[] = userList.map((user) => {
    if (!user.expoToken) {
      return;
    }
    return {
      to: user.expoToken,
      sound: "default",
      title: notification.title,
      body: notification.message,
      priority: "high",
    };
  });

  const chunks = expo.chunkPushNotifications(messages);

  chunks.map(async (chunk) => {
    await expo.sendPushNotificationsAsync(chunk);
  });

  await addNotificationToUsers(notification, userList);
};

const addNotificationToUsers = async (
  notification: NotificationType,
  userList: User[]
) => {
  userList.map(async (user) => {
    await prisma.notification.create({
      data: {
        userId: user.id,
        title: notification.title,
        message: notification.message,
      },
    });
  });
};

export const getUserNotificationsByCpf = async (cpf: string) => {
  const user = await prisma.user.findFirst({
    where: {
      cpf: {
        equals: cpf,
      },
    },
  });

  if (!user) {
    throw new ClientError("User not found");
  }

  const notifications = await prisma.notification.findMany({
    where: {
      userId: {
        equals: user.id,
      },
    },
  });

  return notifications;
};
