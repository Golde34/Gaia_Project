import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function GitHubCallback() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const code = params.get("code");
        const state = params.get("state");

        if (code) {
            // Gửi authorization code tới backend để xử lý
            axios
                .post("http://localhost:3003/contribution-tracker/user-commit/authorize", { code, state })
                .then((response) => {
                    console.log("GitHub Integration Success:", response.data);
                    navigate("/profile"); // Redirect về trang chính hoặc profile
                })
                .catch((error) => {
                    console.error("GitHub Integration Failed:", error);
                });
        }
    }, [location, navigate]);

    return (
        <div className="text-center">
            <p>Processing GitHub Integration...</p>
        </div>
    );
}

export default GitHubCallback;
