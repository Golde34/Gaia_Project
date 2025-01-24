import { Dialog, Transition } from "@headlessui/react";
import { Button, Card, Flex, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Title } from "@tremor/react";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectsAndRepos } from "../../api/store/actions/contribution_tracker/project-commit.actions";
import MessageBox from "../../components/subComponents/MessageBox";

const GithubSyncProjectScreen = (props) => {
    const user = props.user;

    const dispatch = useDispatch();

    let [isOpen, setIsOpen] = useState(false);
    function closeModal() {
        setIsOpen(false)
    }
    function openModal() {
        setIsOpen(true)
    }

    const projectsAndRepos = useSelector(state => state.projectsAndRepos);
    const { loading, error, projectAndRepo } = projectsAndRepos;
    const projectsAndReposDispatch = useCallback(() => {
        dispatch(getProjectsAndRepos(user.id));
    }, [dispatch, user.id]);
    const debounceRef = useRef(null);
    useEffect(() => {
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            projectsAndReposDispatch();
        }, 200);
    }, []);

    const [projects, setProjects] = useState([]);
    const [repos, setRepos] = useState([]);
    const [selectedProject, setSelectedProject] = useState('');
    const [selectedRepo, setSelectedRepo] = useState('');

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <MessageBox message={error}></MessageBox>
            ) : projectAndRepo ? (
                <>
                    <Card className="w-full">
                        <Flex justifyContent="center" alignItems="center" className="mb-4">
                            <Title className="text-white text-xl font-bold">Github Project Synchronization</Title>
                        </Flex>
                        <Table className="mt-8">
                            <TableHead>
                                <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
                                    <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                        Project
                                    </TableHeaderCell>
                                    <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                        Repository
                                    </TableHeaderCell>
                                    <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                        Action
                                    </TableHeaderCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow
                                    className="even:bg-tremor-background-muted even:dark:bg-dark-tremor-background-muted"
                                >
                                    <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                        Gaia
                                    </TableCell>
                                    <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                        Gaia Project
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            className="flex justify-end"
                                            variant="primary"
                                            color="indigo"
                                            onClick={openModal}
                                        >Delete Synchronize</Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                        
                                    </TableCell>
                                    <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                    </TableCell>
                                    <TableCell>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Card>

                    <Transition appear show={isOpen} as={Fragment}>
                        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                                    <Transition appear show={isOpen} as={Fragment}>
                                        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                                                            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                                                {props.component}
                                                            </Dialog.Title>
                                                            <div className="mt-2">
                                                                <p className="text-sm text-gray-500">
                                                                    Are you sure you want to {props.action} this {props.elementName}?
                                                                </p>
                                                            </div>

                                                            {/* Dropdown for Projects */}
                                                            <div className="mt-4">
                                                                <label className="block text-sm font-medium text-gray-700">Select Project:</label>
                                                                <select
                                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                                    value={selectedProject}
                                                                    onChange={(e) => setSelectedProject(e.target.value)}
                                                                >
                                                                    <option value="">-- Select Project --</option>
                                                                    {projectAndRepo.listAllProjectsByUserId.map((project) => (
                                                                        <option key={project.id} value={project.id}>
                                                                            {project.name}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>

                                                            {/* Dropdown for GitHub Repos */}
                                                            <div className="mt-4">
                                                                <label className="block text-sm font-medium text-gray-700">Select GitHub Repo:</label>
                                                                <select
                                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                                    value={selectedRepo}
                                                                    onChange={(e) => setSelectedRepo(e.target.value)}
                                                                >
                                                                    <option value="">-- Select Repo --</option>
                                                                    {projectAndRepo.getAllGithubRepos.map((repo) => (
                                                                        <option key={repo.htmlUrl} value={repo.htmlUrl}>
                                                                            {repo.name}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>

                                                            <div className="mt-4">
                                                                <button
                                                                    type="button"
                                                                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                                    onClick={() => {
                                                                        console.log('Selected Project:', selectedProject);
                                                                        console.log('Selected Repo:', selectedRepo);
                                                                        closeModal();
                                                                    }}
                                                                >
                                                                    OK
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="ml-2 inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                                                                    onClick={closeModal}
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
                                </div>
                            </div>
                        </Dialog>
                    </Transition>
                </>
            ) : (
                <></>
            )}
        </div>
    )
}

export default GithubSyncProjectScreen;