// MenuItem.tsx
'use client'
import Link from "next/link";
import { Icons } from "@/components/icons";

interface MenuItemProps {
  href: string;
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
}

function MenuItem({ href, icon, text, onClick }: MenuItemProps) {
    
  return (
    <li className="item py-[11px] text-bgray-900 dark:text-white" onClick={onClick}>
      <Link href={href} >
        <a className="cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <span className="item-ico">{icon}</span>
              <span className="item-text text-lg font-medium leading-none">{text}</span>
            </div>
          </div>
        </a>
      </Link>
    </li>
  );
}

export default MenuItem;
