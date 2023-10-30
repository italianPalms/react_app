import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import React, {useState, useEffect} from "react";

// const logo = require ("../img/logo.png");

export function LoggedInHeaderII () {

    const navigate = useNavigate();
    const [userId, setUserId] = useState();
    const [loading, setLoading] = useState(false)
    const [cookies ] = useCookies(["access_token"]);
    const [, setCookie] = useCookies();

    useEffect(() => {
        const fetchUsername = async () => {
            await axios.get('http://localhost:4000/getUserDetails', {
                headers: {
                    Authorization: `Bearer ${cookies.access_token}`
                }
            })
            .then((response) => {
                setUserId(response.data.username);
                // console.log(response.data.username);
            })
            .catch(err => {
                console.log("Failed to fetch userId", err);
            })
        }
        fetchUsername();
    }, [])

    const logout = async () => {
        try {
            setLoading(true);
            await axios.get('http://localhost:4000/logout');
            console.log("Logout successful");

            setCookie("access_token", "", {expires: new Date(0)});
            localStorage.removeItem("access_token");            

            navigate('/home');

        } catch (error) {
            console.log("Logout failed" + error)
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="ml-auto flex items-center mt-4">
            <p className="p-1 m-3 font-semibold">Welcome <strong className="text-[#FF00FF] capitalize">{userId}</strong></p>
            
            <button className="p-1 m-3 mr-6"
            onClick={logout}
            >Logout</button>
        </div>
        </>
    )
}