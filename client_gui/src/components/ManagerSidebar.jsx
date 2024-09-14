
import React from "react";
import {
    ArrowUpIcon,
    BellIcon,
    ChartBarIcon,
    ClipboardCheckIcon,
    DocumentSearchIcon,
    ExternalLinkIcon,
    HeartIcon,
    HomeIcon,
    MailIcon,
    UserIcon,
} from "@heroicons/react/solid";
import { Button, Col, Grid } from "@tremor/react";
import styled from "styled-components";
import { ScaleIcon, UserGroupIcon, UsersIcon } from "@heroicons/react/outline";

const Description = styled.div`
  display: none;
  position: absolute;
  background-color: #111827;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  border-radius: 8px;
  top: -20px;
  left: 50px;
  color: white;
`;

const LinkWrapper = styled.a`
  &:hover ${Description} {
    display: block;
  }
`;

const ManagerSidebar = () => {
    return (
        <>
            <div className="fixed left-3 sm:left-6 top-[100px]">
                <Grid numItems={1}>
                    <Col numColSpan={1}>
                        <LinkWrapper href="/client-gui/dashboard">
                            <Button variant="primary" color="red"
                                className="p-2 rounded-lg mb-4">
                                <HomeIcon width={20} />
                            </Button>
                            <Description>Schedule Calendar</Description>
                        </LinkWrapper>
                    </Col>
                    <Col numColSpan={1}>
                        <LinkWrapper href="/client-gui/user-manager">
                            <Button variant="primary" color="indigo"
                                className="p-2 rounded-lg mb-4">
                                <UsersIcon width={20} />
                            </Button>
                            <Description>User Dashboard</Description>
                        </LinkWrapper>
                    </Col>
                    <Col numColSpan={1}>
                        <LinkWrapper href="/client-gui/privilege-role-dashboard">
                            <Button variant="primary" color="indigo"
                                className="p-2 rounded-lg mb-4">
                                <UserGroupIcon width={20} />
                            </Button>
                            <Description>Privilege and Role Dashboard</Description>
                        </LinkWrapper>
                    </Col>
                    <Col numColSpan={1}>
                        <LinkWrapper href="/client-gui/privilege-url-settings">
                            <Button variant="primary" color="indigo"
                                className="p-2 rounded-lg mb-4">
                                <ScaleIcon width={20} />
                            </Button>
                            <Description>Privilege Url Settings</Description>
                        </LinkWrapper>
                    </Col>
                    <Col numColSpan={1}>
                        <LinkWrapper href="/client-gui/gaia-health">
                            <Button variant="primary" color="indigo"
                                className="p-2 rounded-lg mb-4">
                                <HeartIcon width={20} />
                            </Button>
                            <Description>Gaia Health</Description>
                        </LinkWrapper>
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
                <LinkWrapper href="/client-gui/">
                    <Button variant="primary" color="green"
                        className="p-2 rounded-lg mb-4">
                        <UserIcon width={20} />
                    </Button>
                    <Description>User</Description>
                </LinkWrapper>
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

export default ManagerSidebar;