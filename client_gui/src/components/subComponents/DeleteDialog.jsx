import { Dialog, DialogPanel, TextInput } from "@tremor/react";
import { useState } from "react";

export const DeleteDialog = ({ open, handleClose, handleDelete }) => {

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(open);  

    return (
        <>
            <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                onClick={() => {
                    setIsDeleteModalOpen(true);
                }
                }
            >
                Delete
            </button>
            <Dialog
                open={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                static={true}
                className="z-[100]"
            >
                <DialogPanel className="sm:max-w-md">
                    <div className="absolute right-0 top-0 pr-3 pt-3">
                        <button
                            type="button"
                            className="rounded-tremor-small p-2 text-tremor-content-subtle hover:bg-tremor-background-subtle hover:text-tremor-content dark:text-dark-tremor-content-subtle hover:dark:bg-dark-tremor-background-subtle hover:dark:text-tremor-content"
                            onClick={() => setIsDeleteModalOpen(false)}
                            aria-label="Close"
                        >
                            {/* <RiCloseLine className="size-5 shrink-0" aria-hidden={true} /> */}
                        </button>
                    </div>
                    <form>
                        <h4 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            Delete task
                        </h4>
                        <p className="mt-2 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
                            All task data will be permanently deleted. There is no
                            coming back after you press delete.
                        </p>
                        <label
                            htmlFor="delete-workspace"
                            className="mt-6 block text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                        >
                            Confirm second password
                        </label>
                        <TextInput
                            id="delete-workspace"
                            name="delete-workspace"
                            type="password"
                            placeholder="Password"
                            className="mt-2"
                        />
                        <button
                            type="submit"
                            className="mt-4 w-full whitespace-nowrap rounded-tremor-default bg-red-500 px-4 py-2 text-center text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-red-600 dark:bg-red-500 dark:text-tremor-brand-inverted dark:shadow-dark-tremor-input hover:dark:bg-red-600"
                            onClick={() => {
                                handleDelete(task.id);
                                handleClose();
                            }}
                        >
                            Delete task permanently
                        </button>
                    </form>
                </DialogPanel>
            </Dialog>
        </>
    );
}