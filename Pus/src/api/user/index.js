import axios from "axios";

const userProducts = () =>
    axios.get('/api/v2/users').then(res => res.data)


export {
    userProducts,

}
