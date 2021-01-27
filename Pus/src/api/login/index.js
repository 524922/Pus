import axios from 'axios'

//注册
const postUser = form =>
    axios.post('/api/v2/admin/register', form).then(res => res.data)
//登录
const postLogin = form =>
    axios.post('/api/v2/admin/login', form).then(res => res.data)

export {
    postUser,
    postLogin,
}
