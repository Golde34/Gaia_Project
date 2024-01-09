import { Flex, TextInput } from "@tremor/react"
import { SearchIcon } from "@heroicons/react/outline"
import { useSelector } from "react-redux"

const Navbar = () => {
    var auth = false;
    let gaiaStateActivated = localStorage.getItem("gaiaStateActivated");
    console.log("gaiaStateActivated", gaiaStateActivated)
    if (gaiaStateActivated === "true") {
        auth = true;
    } else {
        const userSignin = useSelector((state) => state.userSignin)
        const gaiaSignin = useSelector((state) => state.gaiaSignin)
        const { userInfo } = userSignin;
        const { bossInfo } = gaiaSignin;

        console.log("userInfo", userInfo);
        console.log("bossInfo", bossInfo);
        auth = false;
    }
    console.log("auth", auth)
    return (
        <div id="top"
            className="relative w-full sm:flex justify-between item-center p-2"
        >
            <h1 className="font-bold text-gray-300"> Dashboard </h1>
            <Flex justifyContent="end">
                <div className="py-2 me-3">
                    <TextInput icon={SearchIcon} placeholder="Search" />
                </div>
                {!auth ? (
                    <div className="flex">
                        <a href="/client-gui/auth">
                            <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded me-3">
                                Sign In
                            </button>
                        </a>
                        <a href="/client-gui/auth">
                            <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                                Sign Up
                            </button>
                        </a>
                    </div>
                ) : (
                    <div className="flex">
                        <a href="/client-gui/signin">
                            <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                                Sign Out
                            </button>
                        </a>
                    </div>
                )}

            </Flex>
        </div>
    )
}

export default Navbar;