import axios from 'axios'


// 读取商品列表
const listProducts = (category_id, start, limit) =>
    axios
        .get('/api/v2/products', {params: {category_id, start, limit}})
        .then(res => res.data)

const DeletePro = (id) =>
    axios.get(`/api/v2/products/${id}`).then(res => res.data)


export {
    listProducts,
    DeletePro
}
