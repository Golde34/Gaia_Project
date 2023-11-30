import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import RadioButtonIcon from '../icons/RadioButtonIcon';
import { useUpdateColorDispatch } from '../../utils/dialog-api-requests';

export const ColorDialog = (props) => {

    let [isOpen, setIsOpen] = useState(false)
    let [color, setColor] = useState("");

    function closeModal() {
        setIsOpen(false)
    }
    function openModal() {
        setIsOpen(true)
    }

    const updateColorDispatch = useUpdateColorDispatch();
    const updateColor = (color) => {
        updateColorDispatch(props.elementId, color);
        window.location.reload();
    }

    return (
        <>
            <button
                className="text-black px-6 py-3"
                type="button"
                onClick={openModal}
            >
                {props.component}
            </button>

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
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Change Color
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        {/* Status Radio Button */}
                                        <div className="mt-4">
                                            <p className="block text-md font-medium text-gray-700 mb-3">Status</p>
                                            <div className="grid grid-cols-3 m-2">
                                                <div className="inline-flex items-center">
                                                    <label className="relative flex cursor-pointer items-center rounded-full p-3"
                                                        htmlFor="status-radio-red" data-ripple-dark="true">
                                                        <input
                                                            id="status-radio-red"
                                                            type="radio"
                                                            value="red"
                                                            checked={color === 'red'}
                                                            onChange={(e) => setColor(e.target.value)}
                                                            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-pink-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                                                        />
                                                        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-red-500 opacity-0 transition-opacity peer-checked:opacity-100">
                                                            <RadioButtonIcon />
                                                        </div>
                                                    </label>
                                                    <label className="text-sm text-gray-700" htmlFor="status-radio-red">
                                                        Red
                                                    </label>
                                                </div>
                                                <div className="inline-flex items-center">
                                                    <label className="relative flex cursor-pointer items-center rounded-full p-3"
                                                        htmlFor="status-radio-pink" data-ripple-dark="true">
                                                        <input
                                                            id="status-radio-pink"
                                                            type="radio"
                                                            value="pink"
                                                            checked={color === 'pink'}
                                                            onChange={(e) => setColor(e.target.value)}
                                                            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-pink-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"
                                                        />
                                                        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-pink-500 opacity-0 transition-opacity peer-checked:opacity-100">
                                                            <RadioButtonIcon />
                                                        </div>
                                                    </label>
                                                    <label className="text-sm text-gray-700" htmlFor="status-radio-pink">
                                                        Pink
                                                    </label>
                                                </div>
                                                <div className="inline-flex items-center">
                                                    <label className="relative flex cursor-pointer items-center rounded-full p-3"
                                                        htmlFor="status-radio-green" data-ripple-dark="true">
                                                        <input
                                                            id="status-radio-green"
                                                            type="radio"
                                                            value="green"
                                                            checked={color === 'green'}
                                                            onChange={(e) => setColor(e.target.value)}
                                                            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-pink-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-green-500 checked:before:bg-green-500 hover:before:opacity-10"
                                                        />
                                                        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-green-500 opacity-0 transition-opacity peer-checked:opacity-100">
                                                            <RadioButtonIcon />
                                                        </div>
                                                    </label>
                                                    <label className="text-sm text-gray-700" htmlFor="status-radio-green">
                                                        Green
                                                    </label>
                                                </div>
                                                <div className="inline-flex items-center">
                                                    <label className="relative flex cursor-pointer items-center rounded-full p-3"
                                                        htmlFor="status-radio-blue" data-ripple-dark="true">
                                                        <input
                                                            id="status-radio-blue"
                                                            type="radio"
                                                            value="blue"
                                                            checked={color === 'blue'}
                                                            onChange={(e) => setColor(e.target.value)}
                                                            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-pink-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
                                                        />
                                                        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-blue-500 opacity-0 transition-opacity peer-checked:opacity-100">
                                                            <RadioButtonIcon />
                                                        </div>
                                                    </label>
                                                    <label className="text-sm text-gray-700" htmlFor="status-radio-blue">
                                                        Blue
                                                    </label>
                                                </div>
                                                <div className="inline-flex items-center">
                                                    <label className="relative flex cursor-pointer items-center rounded-full p-3"
                                                        htmlFor="status-radio-yellow" data-ripple-dark="true">
                                                        <input
                                                            id="status-radio-yellow"
                                                            type="radio"
                                                            value="yellow"
                                                            checked={color === 'yellow'}
                                                            onChange={(e) => setColor(e.target.value)}
                                                            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-pink-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-yellow-500 checked:before:bg-yellow-500 hover:before:opacity-10"
                                                        />
                                                        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-yellow-500 opacity-0 transition-opacity peer-checked:opacity-100">
                                                            <RadioButtonIcon />
                                                        </div>
                                                    </label>
                                                    <label className="text-sm text-gray-700" htmlFor="status-radio-yellow">
                                                        Yellow
                                                    </label>
                                                </div>
                                                <div className="inline-flex items-center">
                                                    <label className="relative flex cursor-pointer items-center rounded-full p-3"
                                                        htmlFor="status-radio-white" data-ripple-dark="true">
                                                        <input
                                                            id="status-radio-white"
                                                            type="radio"
                                                            value="white"
                                                            checked={color === 'white'}
                                                            onChange={(e) => setColor(e.target.value)}
                                                            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-pink-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-black-500 checked:before:bg-black-500 hover:before:opacity-10"
                                                        />
                                                        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-black-500 opacity-0 transition-opacity peer-checked:opacity-100">
                                                            <RadioButtonIcon />
                                                        </div>
                                                    </label>
                                                    <label className="text-sm text-gray-700" htmlFor="status-radio-white">
                                                        White
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={() => {
                                                updateColor(color);
                                                closeModal();
                                            }}
                                        >
                                            OK
                                        </button>
                                        <button
                                            type="button"
                                            className='ml-2 inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2'
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
        </>
    )
}