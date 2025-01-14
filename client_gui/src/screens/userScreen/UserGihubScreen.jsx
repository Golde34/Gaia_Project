import { Button, Card, Col, Flex, Grid, Subtitle, Text, Title } from "@tremor/react";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserGithubInfo } from "../../api/store/actions/contribution_tracker/user-commit.actions";
import MessageBox from "../../components/subComponents/MessageBox";
import { Dialog, Transition } from "@headlessui/react";
import { generateUUID } from "../../kernels/utils/generate-uuid";

const UserGithubScreen = (props) => {
    const user = props.user;

    const dispatch = useDispatch();

    const userGithub = useSelector(state => state.userGithubInfo);
    const { loading, error, userGithubInfo } = userGithub;
    const findUserGithubInfo = useCallback(() => {
        dispatch(getUserGithubInfo(user.id));
    }, [dispatch, user.id]);
    const debounceRef = useRef(null);
    useEffect(() => {
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            findUserGithubInfo();
        }, 200);
        console.log("userGithubInfo: ", userGithubInfo);
    }, []);

    let [isOpen, setIsOpen] = useState(false);
    function closeModal() {
        setIsOpen(false)
    }
    function openModal() {
        setIsOpen(true)
    }

    let [isDeletedOpen, setIsDeletedOpen] = useState(false);
    function closeDeletedModal() {
        setIsDeletedOpen(false)
    }
    function openDeletedModal() {
        setIsDeletedOpen(true)
    }

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <MessageBox message={error}></MessageBox>
            ) : userGithubInfo.userGithubInfo && userGithubInfo.userGithubInfo.userConsent == 0 ? (
                <Card>
                    <Flex justifyContent="center" alignItems="center" className="mb-4">
                        <Title className="text-white text-xl font-bold">Your Github Information</Title>
                    </Flex>
                    <Flex justifyContent="space-between" alignItems="center" className="mt-4">
                        <p className="text-gray-400 font-medium">
                            Do you want to integrate your Github Commit to Gaia Contribution Tracking System?
                        </p>
                        <Button
                            className="flex justify-end"
                            variant="primary"
                            color="indigo"
                            // onClick={openModal}
                            onClick={() => {
                                const clientId = userGithubInfo.gaiaConfigurations.clientId;
                                const redirectUrl = userGithubInfo.gaiaConfigurations.redirectUrl;
                                const state = userGithubInfo.userGithubInfo.userState();
                                const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=user,repo&state=${state}`;
                                window.location.href = url;
                            }}
                        > Integrate</Button>
                    </Flex>
                </Card>
            ) : (
                <>
                    <Card>
                        <Flex justifyContent="center" alignItems="center" className="mb-4">
                            <Title className="text-white text-xl font-bold">Your Github Information</Title>
                        </Flex>
                        <Grid className="mt-4 gap-y-4" numItems={5}>
                            <Col numColSpan={1}>
                                <Subtitle className="text-gray-400 font-medium">Username</Subtitle>
                            </Col>
                            <Col numColSpan={4}>
                                <Text className="text-white text-md font-semibold">{user.username || "N/A"}</Text>
                            </Col>
                            <Col numColSpan={1}>
                                <Subtitle className="text-gray-400 font-medium">Github URL</Subtitle>
                            </Col>
                            <Col numColSpan={4}>
                                <Text className="text-blue-400 text-md font-semibold hover:underline">
                                    <a href={userGithubInfo.userGithubInfo.githubUrl} target="_blank" rel="noopener noreferrer">
                                        {userGithubInfo.userGithubInfo.githubUrl || "N/A"}
                                    </a>
                                </Text>
                            </Col>
                        </Grid>
                    </Card>
                    <Transition appear show={isDeletedOpen} as={Fragment}>
                        <Dialog as="div" className="relative z-10" onClose={closeDeletedModal}>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0 bg-black/25" />
                            </Transition.Child>

                            <div className="fixed inset-0 overflow-y-auto">
                                <div className="flex min-h-full items-center justify-center p-4 text-center">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                    >
                                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg font-medium leading-6 text-gray-900"
                                            >
                                                {props.component}
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Are you sure you want to {props.action} this {props.elementName}?
                                                </p>
                                            </div>

                                            <div className="mt-4">
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                    onClick={() => { }}
                                                >
                                                    OK
                                                </button>
                                                <button
                                                    type="button"
                                                    className='ml-2 inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2'
                                                    onClick={closeDeletedModal}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition>
                </>
            )
            }
        </div >
    )
}

export default UserGithubScreen;