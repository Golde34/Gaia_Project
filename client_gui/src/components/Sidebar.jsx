import React from "react";
import {
  ArrowUpIcon,
  BellIcon,
  ChartBarIcon,
  CreditCardIcon,
  DocumentSearchIcon,
  ExternalLinkIcon,
  HomeIcon,
  MailIcon,
} from "@heroicons/react/solid";
import { Button } from "@tremor/react";

const Sidebar = () => {
  return (
    <div className="bg-slate-800 flex-none w-14 sm:w-20 h-screen">
      <a href="/">
      <div className="h-20 items-center flex">
        <HomeIcon width={40} className="text-gray-300 left-3 sm:left-6 fixed" />
      </div>
      </a>
      <div className="fixed left-3 sm:left-6 top-[100px]">
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
        <a href="/client-gui/project">
          <Button variant="primary"
            className="p-2" color="indigo">
            <BellIcon width={20} />
          </Button>
        </a>
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
    </div>
  );
};

export default Sidebar;