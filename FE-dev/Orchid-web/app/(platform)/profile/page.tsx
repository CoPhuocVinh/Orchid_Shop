import React from "react";
import NavMenu from "@/components/platform/profile/nav-profile";
import { SearchParams } from "@/types/table";
export interface IndexPageProps {
  searchParams: SearchParams;
}
function ProfilePage({ searchParams }: IndexPageProps) {
  return (
    <>
      <NavMenu searchParams={searchParams}/>
    </>
  );
}

export default ProfilePage;
