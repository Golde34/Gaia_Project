import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, Col, Flex, Grid, Metric, Title } from "@tremor/react";
import "../../assets/husky.scss";
import CheckBoxIcon from "../../components/icons/CheckboxIcon";
import { signin } from "../../api/store/actions/auth_service/userActions";
import MessageBox from "../../components/subComponents/MessageBox";

const Signin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo, loading, error } = userSignin;

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(username, password));
    };
    useEffect(() => {
        if (userInfo) {
            if (userInfo['data'] !== null) {
                navigate('/dashboard');
            } else {
                setErrorMessage(userInfo['errors'][0]['message']);
            }
        }
    }, [navigate, userInfo]);

    const navigateToSignupScreen = () => {
        navigate('/signup');
    }

    return (
        <>
            <Grid numItems={12} className="w-full mt-20">
                <Col numColSpan={12} className="mb-10">
                    <Metric>Welcome, I'm Golde. And youre in my AI System.</Metric>
                </Col>
                <Col numColSpan={1}></Col>
                <Col numColSpan={4} className="me-7">
                    <div className="husky">
                        <div className="mane">
                            <div className="coat"></div>
                        </div>
                        <div className="body">
                            <div className="head">
                                <div className="ear"></div>
                                <div className="ear"></div>
                                <div className="face">
                                    <div className="eye"></div>
                                    <div className="eye"></div>
                                    <div className="nose"></div>
                                    <div className="mouth">
                                        <div className="lips"></div>
                                        <div className="tongue"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="torso"></div>
                        </div>
                        <div className="legs">
                            <div className="front-legs">
                                <div className="leg"></div>
                                <div className="leg"></div>
                            </div>
                            <div className="hind-leg">
                            </div>
                        </div>
                        <div className="tail">
                            <div className="tail">
                                <div className="tail">
                                    <div className="tail">
                                        <div className="tail">
                                            <div className="tail">
                                                <div className="tail"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12">
                        <Title>This is Gaia. My Virtual Dog. I will train him step by step.</Title>
                    </div>
                </Col>
                <Col numColSpan={7}>
                    <Flex justifyContent="end">
                        <Card className="max-w-lg mx-auto">
                            <form onSubmit={submitHandler}>
                                <Metric level={3} className="text-center">Sign In</Metric>
                                {loading && <div>Loading...</div>}
                                {error &&
                                    <div>
                                        <MessageBox message={error} />
                                    </div>
                                }

                                <div className="mt-2">
                                    <label htmlFor="username" className="block text-md font-medium text-gray-700 mb-3">
                                        <Title>Username</Title>
                                    </label>
                                    <input
                                        id="username"
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="mt-1 block w-full h-10 p-4 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        placeholder="Username"
                                    />
                                </div>

                                <div className="mt-4 mb-4">
                                    <label htmlFor="password" className="block text-md font-medium text-gray-700 mb-3">
                                        <Title>Password</Title>
                                    </label>
                                    <input
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="mt-1 block w-full rounded-md h-10 p-4 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        placeholder="Password"
                                        type="password"
                                    />
                                </div>

                                {errorMessage === '' || errorMessage === null ? '' :
                                    <div>
                                        <MessageBox message={errorMessage} />
                                    </div>
                                }

                                <div className="mt-4">
                                    <div className="inline-flex items-center">
                                        <label className="relative flex items-center p-3 rounded-full cursor-pointer"
                                            htmlFor="remember-me-checkbox" data-ripple-dark="true">
                                            <input
                                                id="remember-me-checkbox"
                                                type="checkbox"
                                                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:bg-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                                            />
                                            <div className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                                <CheckBoxIcon />
                                            </div>
                                        </label>
                                        <label className="text-sm text-gray-700"><Title>Remember your password</Title></label>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-4 flex justify-center">
                                    <button
                                        type="button"
                                        className="mr-2 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onChange={() => navigateToSignupScreen()}
                                    >
                                        Signup
                                    </button>
                                    <button
                                        type="submit"
                                        className="ml-2 inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                    >
                                        Signin
                                    </button>
                                </div>
                            </form>
                        </Card>
                    </Flex>
                </Col>
            </Grid>
        </>
    )
}

export default Signin;