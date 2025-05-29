"use client";

import { Photo } from "@/generated/prisma";
import { Image } from "@heroui/image";
import { CldImage } from "next-cloudinary";
import React from "react";

type Props = {
  photo: Photo | null;
};

export default function MemberImage({ photo }: Props) {
  return (
    <div>
      {photo?.publicId ? (
        <CldImage
          alt="Image of member"
          src={photo.publicId}
          width={300}
          height={300}
          crop="fill"
          gravity="faces"
          className="rounded-2xl"
          priority
        />
      ) : (
        <Image
          width={220}
          src={photo?.url || "/images/user.png"}
          alt="Image of user"
        />
      )}
    </div>
  );
}
