<template>
    <div class="login_container">
        <vue-particles
                class="login-bg"
                color="#39AFFD"
                :particleOpacity="0.7"
                :particlesNumber="100"
                shapeType="circle"
                :particleSize="4"
                linesColor="#8DD1FE"
                :linesWidth="1"
                :lineLinked="true"
                :lineOpacity="0.4"
                :linesDistance="150"
                :moveSpeed="3"
                :hoverEffect="true"
                hoverMode="grab"
                :clickEffect="true"
                clickMode="push"
        >
        </vue-particles>
        <div class="login_box">
            <!-- 头像区 -->
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="avatar"/>
            </div>
            <!-- 登录表单 -->
            <div>
                <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="60px"
                         class="login_form">
                    <el-form-item label="账号" prop="username">
                        <el-input v-model="loginForm.user_name" prefix-icon="iconfont icon-user"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input
                                v-model="loginForm.password"
                                type="password"
                                prefix-icon="iconfont icon-3702mima"
                        ></el-input>
                    </el-form-item>
                    <el-form-item class="btns">
                        <el-button type="primary" @click="login">登录</el-button>
                        <el-button type="info" @click="resetLoginForm">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import * as userAPI from '../api/login'

    export default {
        data() {
            return {
                loginForm: {
                    user_name: 'admin',
                    password: ''
                },
                // 表单验证
                loginFormRules: {
                    user_name: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入用户密码', trigger: 'blur'},
                        {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            // 表单重置按钮
            ...mapActions(['setUser']),
            resetLoginForm() {
                this.$refs.loginFormRef.resetFields()
            },
            login() {
                this.$refs.loginFormRef.validate(async valid => {
                    if (!valid) return false
                    userAPI
                        .postLogin(this.loginForm)
                        .then(res => {
                            console.log(this.loginForm)
                            console.log("rrrr")
                            console.log(res)
                            if (res.status !== 200) {
                                this.notifyError('登陆失败', res.msg)
                            } else {
                                this.$message.success('登录成功')
                                // 1、将登陆成功之后的token, 保存到客户端的sessionStorage中; localStorage中是持久化的保存
                                //   1.1 项目中出现了登录之外的其他API接口，必须在登陆之后才能访问
                                //   1.2 token 只应在当前网站打开期间生效，所以将token保存在sessionStorage中
                                window.sessionStorage.setItem('token', res.data.token)
                                this.$router.push('/admin/home')
                            }
                        })
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    /* // lang="less" 支持less格式
    // scoped vue的指令，只在当前组件生效 */
    .login_container {
        background-color: #2b4b6b;
        height: 100%;
    }

    .login_box {
        width: 450px;
        height: 360px;
        background-color: #fff;
        border-radius: 3px;
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
        background-color: #fff;

        .avatar_box {
            width: 130px;
            height: 130px;
            border: 1px solid #eee;
            border-radius: 50%;
            padding: 10px;
            box-shadow: 0 0 10px #ddd;
            position: absolute;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #fff;

            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background-color: #eee;
            }
        }
    }

    .login_form {
        position: absolute;
        bottom: 60px;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
    }

    .btns {
        display: flex;
        justify-content: center;
    }

    .info {
        font-size: 13px;
        margin: 10px 15px;
    }
</style>
