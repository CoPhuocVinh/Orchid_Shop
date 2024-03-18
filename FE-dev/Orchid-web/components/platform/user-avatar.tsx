"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";

const UserAvatar = () => {
  
  const { data: session } = useSession();

  const image = session?.user.image_url
    ? session?.user.image_url
    : "/images/avatar.jpg";

  return (
    <Avatar>
      <AvatarImage src={image} alt={session?.user.name ?? "name"} />
      <AvatarFallback>{session?.user.name}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;