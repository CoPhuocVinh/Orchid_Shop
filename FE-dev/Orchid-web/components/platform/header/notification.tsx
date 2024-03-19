import { Bell } from "lucide-react";
import React, { useEffect, useState } from "react";

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [notifications, setNotifications] = useState([
    { id: 1, text: "Notification 1" },
    { id: 2, text: "Notification 2" },
    { id: 3, text: "Notification 3" },
    { id: 4, text: "Notification 4" },
  ]);

  const toggleNotification = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="relative">
      <button className="relative" onClick={toggleNotification}>
        <Bell className="h-10 w-10 text-gray-500 hover:text-gray-700 bg-white rounded-full ring-4 ring-gray-300" />
        <span className="absolute top-0 right-0 inline-block h-5 w-5 bg-red-500 rounded-full">
          {notifications.length}
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-12 right-0 mt-2 w-48 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg z-10">
          {notifications.map((notification) => (
            <div key={notification.id} className="p-2">
              <p className="text-sm text-gray-600">{notification.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notification;
