"use client";

import { MessageDto } from "@/types";
import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import { Avatar } from "@heroui/avatar";
import { transformImageUrl } from "@/lib/util";

type Props = {
  message: MessageDto;
  currentUserId: string;
};

export default function MessageBox({ message, currentUserId }: Props) {
  const isCurrentUserSender = message.senderId === currentUserId;
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageEndRef.current)
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  const renderAvatar = () => {
    return (
      <Avatar
        name={message.senderName}
        className="self-end"
        src={transformImageUrl(message.senderImage) || "images/user.png"}
      />
    );
  };

  const messageContentClasses = clsx("flex flex-col w-[50%] px-2 py-1", {
    "rounded-l-xl rounded-tr-xl text-white bg-blue-100": isCurrentUserSender,
    "rounded-r-xl rounded-tl-xl border-gray-200 bg-green-100":
      !isCurrentUserSender,
  });

  const renderMessageHeader = () => {
    return (
      <div
        className={clsx("flex items-center w-full", {
          "justify-between": isCurrentUserSender,
        })}
      >
        {message.dateRead && message.recipientId !== currentUserId ? (
          <span className="text-xs text-black italic">(Read 4 mins ago)</span>
        ) : (
          <div></div>
        )}
        <div className="flex">
          <span className="text-sm font-semibold text-gray-900">
            {message.senderName}
          </span>
          <span className="text-sm text-gray-500 ml-2">{message.created}</span>
        </div>
      </div>
    );
  };

  const renderMessageContent = () => {
    return (
      <div className={messageContentClasses}>
        {renderMessageHeader()}
        <p className="text-sm py-3 text-gray-900">{message.text}</p>
      </div>
    );
  };

  return (
    <div className="grid grid-rows-1">
      <div
        className={clsx("flex gap-2 mb-3", {
          "justify-end text-right": isCurrentUserSender,
          "justify-start": !isCurrentUserSender,
        })}
      >
        {!isCurrentUserSender && renderAvatar()}
        {renderMessageContent()}
        {isCurrentUserSender && renderAvatar()}
      </div>
      <div ref={messageEndRef} />
    </div>
  );
}
