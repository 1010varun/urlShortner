import { useNavigate } from "react-router-dom";
import propTypes from "prop-types"
import { useEffect } from "react";


const Protected = ({ Component }) => {

    const navigate = useNavigate();

    useEffect(() => {
        const login = localStorage.getItem("login");
        // console.log("login details = ",login);
        if (!login) {
            navigate('login')
        }
    })

    return (
        <div>
            {Component}
        </div>
    );
}

Protected.propTypes = {
    Component: propTypes.object
}

export default Protected