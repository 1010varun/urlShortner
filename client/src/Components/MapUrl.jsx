import { useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios";

const MapUrlPage = () => {
    const params = useParams();
    const shortUrl = params.id;

    useEffect(() => {
        axios({
            method: "POST",
            url: import.meta.env.VITE_BASE_URL + "/mapUrl",
            data: {
                url: shortUrl
            }
        })
            .then((resp) => {
                window.location.href = resp.data.url;
            })
            .catch((err) => {
                console.log(err)
            });
     }, [])

    return (
        <h1>Redirecting to your url...</h1>
    )
};

export default MapUrlPage;