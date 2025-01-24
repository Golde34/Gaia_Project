import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectsAndRepos, syncProjectAndRepo } from "../../api/store/actions/contribution_tracker/project-commit.actions";
import MessageBox from "../../components/subComponents/MessageBox";
import { Button, Card, Flex, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Title } from "@tremor/react";
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from "@headlessui/react";
import clsx from "clsx";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";

const GithubSyncProjectScreen = (props) => {
    const user = props.user;

    const dispatch = useDispatch();

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

    const [selectedProject, setSelectedProject] = useState('');
    const [queryProject, setQueryProject] = useState('');
    const [selectedRepo, setSelectedRepo] = useState('');
    const [queryRepo, setQueryRepo] = useState('');

    const filterProjects = queryProject === ''
        ? projectAndRepo?.listAllProjectsByUserId
        : projectAndRepo?.listAllProjectsByUserId.filter((project) => project.name.toLowerCase().includes(queryProject.toLowerCase()));
    const filteredRepos = queryRepo === ''
        ? projectAndRepo?.getAllGithubRepos
        : projectAndRepo?.getAllGithubRepos.filter((repo) => repo.name.toLowerCase().includes(queryRepo.toLowerCase()));

    const synchorizeProjectAndRepo = () => {
        dispatch(syncProjectAndRepo(selectedProject, selectedRepo));
    }
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
                                        Github Repository
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
                                            onClick={() => console.log('Delete action')}
                                        >Delete Synchronize</Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                        <Combobox value={selectedProject} onChange={(value) => setSelectedProject(value)} onClose={() => setQueryProject('')}>
                                            <div className="relative">
                                                <ComboboxInput
                                                    className={clsx(
                                                        'w-full rounded-lg border-none bg-white/5 py-1.5 pl-3 text-sm/6 text-white',
                                                        'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                                                    )}
                                                    displayValue={(project) => project?.name}
                                                    onChange={(event) => setQueryProject(event.target.value)}
                                                />
                                                <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                                                    <ChevronDownIcon className="size-4 fill-white/60 group-data-[hover]:fill-white" />
                                                </ComboboxButton>
                                            </div>
                                            <ComboboxOptions
                                                anchor="bottom"
                                                transition
                                                className={clsx(
                                                    'w-[var(--input-width)] rounded-xl border border-white/5 bg-white p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
                                                    'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
                                                )}
                                            >
                                                {filterProjects.map((project) => (
                                                    <ComboboxOption
                                                        key={project.id}
                                                        value={project}
                                                        className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
                                                    >
                                                        <CheckIcon className="invisible size-4 group-data-[selected]:visible" />
                                                        {project.name}
                                                    </ComboboxOption>
                                                ))}
                                            </ComboboxOptions>
                                        </Combobox>
                                    </TableCell>
                                    <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                        <Combobox value={selectedRepo} onChange={(value) => setSelectedRepo(value)} onClose={() => setQueryRepo('')}>
                                            <div className="relative">
                                                <ComboboxInput
                                                    className={clsx(
                                                        'w-full rounded-lg border-none bg-white/5 py-1.5 pl-3 text-sm/6 text-white',
                                                        'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                                                    )}
                                                    displayValue={(repo) => repo?.name}
                                                    onChange={(event) => setQueryRepo(event.target.value)}
                                                />
                                                <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                                                    <ChevronDownIcon className="size-4 fill-white/60 group-data-[hover]:fill-white" />
                                                </ComboboxButton>
                                            </div>
                                            <ComboboxOptions
                                                anchor="bottom"
                                                transition
                                                className={clsx(
                                                    'w-[var(--input-width)] rounded-xl border border-white/5 bg-white p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
                                                    'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
                                                )}
                                            >
                                                {filteredRepos.map((project) => (
                                                    <ComboboxOption
                                                        key={project.id}
                                                        value={project}
                                                        className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
                                                    >
                                                        <CheckIcon className="invisible size-4 group-data-[selected]:visible" />
                                                        {project.name}
                                                    </ComboboxOption>
                                                ))}
                                            </ComboboxOptions>
                                        </Combobox>
                                    </TableCell>
                                    <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                        <Button
                                            className="flex justify-end"
                                            variant="primary"
                                            color="indigo"
                                            onClick={synchorizeProjectAndRepo}
                                        >Synchronize</Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Card>
                </>
            ) : (
                <></>
            )}
        </div>
    )
}

export default GithubSyncProjectScreen;