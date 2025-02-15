import axios from 'axios'

export const getPosts = async (category, setItems) => {
    try {
        const response = await axios.get(`http://localhost:3000/${category}`);
        console.log(response.data);
        setItems(response.data)
    } catch (err) {
        console.log("Getting error when fetching articles", err)
    }
}