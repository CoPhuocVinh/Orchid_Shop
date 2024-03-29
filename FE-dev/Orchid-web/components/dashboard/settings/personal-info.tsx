'use client'

import { useSession } from "next-auth/react";
import PersonalInfoFrom from "../../forms/personal-info-form";
import { format } from "date-fns";
import vi from 'date-fns/locale/vi'
import React from "react";

const PersonalInfo =  ({ name, activeTab }: any) => {
  const {data: session} = useSession()

  const formatUser = {
    id: session?.user.id,
    name: session?.user.name,
    email: session?.user.email,
    img: session?.user.img,
    dob: session?.user.dob ?format(session?.user.dob,'do-M-yyyy') : ''
  }

  console.log(formatUser)
  return (
    <div id="tab1" className={`tab-pane ${name === activeTab && "active"}`}>
      <div className="xl:grid grid-cols-12 gap-12 flex 2xl:flex-row flex-col-reverse">
        <PersonalInfoFrom user={formatUser}/>
      </div>
    </div>
  );
};

export default PersonalInfo;
