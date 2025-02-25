import axios from 'axios'

export const getPosts = async (category, setItems) => {
    try {
        const response = await axios.get(`https://blog-app-rdnu.onrender.com/${category}`);
        console.log(response.data);
        setItems(response.data)
    } catch (err) {
        console.log("Getting error when fetching articles", err)
    }
}