import React, { useState } from "react";
import { Bell, BellIcon, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Bạn có một thông báo mới" },
    { id: 2, message: "Thông báo thứ hai" },
    { id: 3, message: "Thông báo thứ ba" },
  ]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <BellIcon className="h-6 w-6 text-gray-600 hover:text-gray-900" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 bg-white rounded-md shadow-lg">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <DropdownMenuItem key={notification.id}>
              <div className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 rounded-md">
                <span className="text-sm text-gray-700">
                  {notification.message}
                </span>
                <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              </div>
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem className="text-sm text-gray-700 px-4 py-2">
            Không có thông báo mới
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;
