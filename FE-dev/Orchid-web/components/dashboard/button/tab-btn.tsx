'use client'

import React from 'react'
interface TabBtnProps {
    title: string,
    name: string,
    text: string,
    activeTab: string,
    children: React.ReactNode,
    handleTabActive : (name: string) => void
}
const TabBtn = ({ title, name, text, handleTabActive, activeTab, children }: TabBtnProps) => {
    return (
        <div
          className={`tab flex gap-x-4 p-4 rounded-lg transition-all ${
            activeTab === name && "active"
          }`}
          data-tab="tab1"
          onClick={() => handleTabActive(name)}
        >
          <div className="w-12 tab-icon transition-all h-12 shrink-0 rounded-full inline-flex items-center justify-center bg-bgray-100 dark:bg-darkblack-500">
            {children}
          </div>
          <div>
            <h4 className="text-base font-bold text-bgray-900 dark:text-white">
              {title}
            </h4>
            <p className="text-sm font-medium text-bgray-700 dark:text-darkblack-300 mt-0.5">
              {text}
            </p>
          </div>
        </div>
      );
}

export default TabBtn