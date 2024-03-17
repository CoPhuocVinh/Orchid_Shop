import Link from "next/link";
import React from "react";
import { Icons } from "../icons";

interface BreadCrumbProps {
  descriptionTitle?: string;
  title?: string;
  middlePath?: string;
  routeUrl?: string
}

const BreadCrumb = ({
  descriptionTitle,
  title,
  middlePath,
  routeUrl
}: BreadCrumbProps) => {
  return (
    <>
      <div className="bg-gray-200">
        <div className="container-fluid w-full h-[100px] 3xl:!px-12 mx-auto py-4">
          <div className="flex items-center">
            <div className="w-1/2">
              <div className="text-2xl font-bold">
                <h2>{descriptionTitle}</h2>
              </div>
            </div>
            <div className="w-1/2">
              <ol className="flex justify-end space-x-2">
                <li className="breadcrumb-item flex items-center">
                  <Link href="/" className="text-blue-500">
                    Trang chủ
                  </Link>
                  <Icons.breadCrumbArrowRinght />
                </li>
                <li className="flex items-center">
                  <Link href={`/${routeUrl}`} className="text-blue-500">
                    {middlePath}
                  </Link>
                 {title &&  <Icons.breadCrumbArrowRinght />}
                </li>
                <li className="flex items-center">
                  <span className="text-gray-500">{title}</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BreadCrumb;
