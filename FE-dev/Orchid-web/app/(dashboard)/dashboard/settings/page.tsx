"use client";
import React, { useState } from 'react'

import PersonalInfo from '@/components/dashboard/settings/personal-info';
import SettingsSidebar from '@/components/dashboard/settings/settings-sidebar';



const SettingPage = () => {
    const [activeTab, setActiveTab] = useState("personalInfo");
    return (
      <>
        {/* Sidebar  */}
        <SettingsSidebar activeTab={activeTab} handleActiveTab={setActiveTab} />
        {/* Tab Content  */}
        <div className="py-8 px-10 col-span-9 tab-content">
          {/* Personal Information */}
          <PersonalInfo name="personalInfo" activeTab={activeTab} />

        </div>
      </>
    )
}

export default SettingPage