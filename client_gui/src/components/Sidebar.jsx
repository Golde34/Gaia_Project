import React from "react";
import {
  ArrowUpIcon,
  BellIcon,
  ChartBarIcon,
  ClipboardCheckIcon,
  DocumentSearchIcon,
  ExternalLinkIcon,
  HomeIcon,
  MailIcon,
  ShieldCheckIcon,
} from "@heroicons/react/solid";
import { Button } from "@tremor/react";

const Sidebar = () => {
  return (
    <>
      <div className="h-20 flex">
        <a href="/">
          <HomeIcon width={40} className="text-gray-300 left-3 sm:left-6 fixed" />
        </a>
      </div>
      <div className="fixed left-3 sm:left-6 top-[100px]">
        <ShieldCheckIcon
          width={40}
          className="bg-gray-600 p-2 rounded-lg mb-4 text-gray-300"
        />
        <a href="/client-gui/project">
          <Button variant="primary" color="indigo"
            className="p-2 rounded-lg mb-4">
            <ClipboardCheckIcon width={20} />
          </Button>
        </a>
        <ChartBarIcon
          width={40}
          className="bg-gray-600 p-2 rounded-lg mb-4 text-gray-300"
        />
        <DocumentSearchIcon
          width={40}
          className="bg-gray-600 p-2 rounded-lg mb-4 text-gray-300"
        />
        <MailIcon
          width={40}
          className="bg-gray-600 p-2 rounded-lg mb-4 text-gray-300"
        />
        {/* <a href="/client-gui/scheduling-table">
          <CreditCardIcon
            width={40}
            className="bg-gray-600 p-2 rounded-lg mb-4 text-gray-300"
          />
        </a> */}
        <BellIcon
          width={40}
          className="bg-gray-600 p-2 rounded-lg mb-4 text-gray-300"
        />
      </div>
      <div className="fixed bottom-4 left-3 sm:left-6">
        <a href="#top">
          <ArrowUpIcon
            width={40}
            className="bg-gray-600 p-2 rounded-lg mb-4 text-gray-300"
          />
        </a>
        <Button variant="secondary" className="p-2" color="indigo" >
          <ExternalLinkIcon width={20} />
        </Button>
      </div>
    </>
  );
};

export default Sidebar;