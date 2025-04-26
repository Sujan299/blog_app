import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchPosts = (category1) => {
    const [category, setCategory] = useState(category1);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); 
            try {
        const response = await axios.get(`https://blog-app-rdnu.onrender.com/${category}`);

                // const response = await axios.get(`http://localhost:3000/${category}`);
                setData(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [category]);

    return { data, loading, error };
};

export default useFetchPosts;
