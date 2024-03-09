"use client";
import React, { useState } from 'react'

import Faq from '@/components/dashboard/settings/Faq';
import Notification from '@/components/dashboard/settings/Notification';
import Payment from '@/components/dashboard/settings/Payment';
import PersonalInfo from '@/components/dashboard/settings/PersonalInfo';
import ProgramAndResources from '@/components/dashboard/settings/ProgramAndResources';
import Security from '@/components/dashboard/settings/Security';
import SettingsSidebar from '@/components/dashboard/settings/SettingsSidebar';
import TermsAndCondition from '@/components/dashboard/settings/TermsAndCondition';


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
          {/* Notification  */}
          <Notification name="notification" activeTab={activeTab} />
          {/* Program & Resources  */}
          <ProgramAndResources name="programAndResources" activeTab={activeTab} />
          {/* Payments  */}
          <Payment name="payment" activeTab={activeTab} />
          {/* Faq  */}
          <Faq name="faq" activeTab={activeTab} />
          {/* Security Password  */}
          <Security name="security" activeTab={activeTab} />
          {/* Terms & Condition  */}
          <TermsAndCondition name="termsAndConditions" activeTab={activeTab} />
        </div>
      </>
    )
}

export default SettingPage