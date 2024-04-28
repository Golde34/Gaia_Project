import React from "react";
import {
	ArrowUpIcon,
	BellIcon,
	CalendarIcon,
	ChartBarIcon,
	ClipboardCheckIcon,
	DocumentSearchIcon,
	ExternalLinkIcon,
	HomeIcon,
	MailIcon,
	ServerIcon,
	ShieldCheckIcon,
	UserIcon,
} from "@heroicons/react/solid";
import { Button, Col, Grid } from "@tremor/react";

const Sidebar = () => {
	return (
		<>
			<div className="h-20 flex">
				<a href="/client-gui/dashboard">
					<HomeIcon width={40} className="text-gray-300 left-3 sm:left-6 fixed" />
				</a>
			</div>
			<div className="fixed left-3 sm:left-6 top-[100px]">
				<Grid numItems={1}>
					<Col numColSpan={1}>
						<a href="/client-gui/schedule">
							<Button variant="primary" color="indigo"
								className="p-2 rounded-lg mb-4">
								<CalendarIcon width={20} />
							</Button>
						</a>
					</Col>				
					<Col numColSpan={1}>
						<a href="/client-gui/project">
							<Button variant="primary" color="indigo"
								className="p-2 rounded-lg mb-4">
								<ClipboardCheckIcon width={20} />
							</Button>
						</a>
					</Col>
					<Col numColSpan={1}>
						<a href="/client-gui/profile">
							<Button variant="primary" color="indigo"
								className="p-2 rounded-lg mb-4">
								<UserIcon width={20} />
							</Button>
						</a>
					</Col>
					<Col numColSpan={1}>
						<a href="/client-gui/auth-manager">
							<Button variant="primary" color="indigo"
								className="p-2 rounded-lg mb-4">
								<ShieldCheckIcon width={20} />
							</Button>
						</a>
					</Col>
					<Col numColSpan={1}>
						<a href="/client-gui/microservices">
							<Button variant="primary" color="indigo"
								className="p-2 rounded-lg mb-4">
								{/* Instance(IP) Port  */}
								<ServerIcon width={20} />
							</Button>
						</a>
					</Col>
				</Grid>
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