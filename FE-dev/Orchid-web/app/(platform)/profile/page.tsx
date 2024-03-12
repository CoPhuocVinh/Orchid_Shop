import React from "react";
import Nav_Menu from "@/components/platform/profile/nav-profile";
import { SearchParams } from "@/types/table";
export interface IndexPageProps {
  searchParams: SearchParams;
}
function ProfilePage({ searchParams }: IndexPageProps) {
  return (
    <>
      <Nav_Menu searchParams={searchParams}/>
    </>
  );
}

export default ProfilePage;
