<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../assets/logo.png" alt=""/>
        <span>电商后台管理系统</span>
      </div>
      <div class="btn">
        <el-button style="margin-right:12px;" type="info" @click="logout">退出</el-button>
        <el-dropdown @command="handleCommand">
          <el-button type="primary"> 更多<i class="el-icon-arrow-down el-icon--right"></i></el-button>
          <el-dropdown-menu slot="dropdown">
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <el-row class="tac">
        <el-col :span="12">
          <h5>LWGG专属</h5>
          <el-menu
                  :unique-opened="true"
                  :router="true"
          >
            <el-submenu index="/admin">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/admin/users">用户管理</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <el-menu-item index="/admin/goods">商品管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        // 左侧菜单数据
        menulist: [],
        iconsObj: {
          125: 'iconfont icon-user',
          103: 'iconfont icon-tijikongjian',
          101: 'iconfont icon-shangpin',
          102: 'iconfont icon-danju',
          145: 'iconfont icon-baobiao'
        },
        // 是否折叠
        isCollapse: false,
        // 被激活的链接地址
        activePath: ''
      }
    },
    created() {
      this.getMenuList()
      this.activePath = window.sessionStorage.getItem('activePath')
    },
    methods: {
      UserManger() {
        this.$router.push('admin/users')
      },
      ProductManger() {
        this.$router.push('admin/goods')
      },
      logout() {
        window.sessionStorage.clear()
        this.$router.push('admin/login')
      },
      // 跳转到我的GitHub
      handleCommand(command) {
        // command 是下拉菜单传递过来的参数;
        // eslint-disable-next-line eqeqeq
        if (command == 'github') {
          window.location.href = 'https://github.com/CocaineCong'
          // eslint-disable-next-line eqeqeq
        } else if (command == 'csdn') {
          window.location.href = 'https://blog.csdn.net/weixin_45304503'
        }
      },
      // 获取所有的菜单
      async getMenuList() {
        const {data: res} = await this.$http.get('menus')
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
        this.menulist = res.data
        console.log(res)
      },
      // 点击按钮，切换菜单的折叠与展开
      toggleCollapse() {
        this.isCollapse = !this.isCollapse
      },
      // 保存链接的激活状态
      saveNavState(activePath) {
        window.sessionStorage.setItem('activePath', activePath)
        this.activePath = activePath
      }
    }
  }
</script>

<style lang="less" scoped>
  .home-container {
    height: 100%;
  }

  .el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;
    // padding: 15px 0;
    height: 80px !important;

    > div {
      display: flex;
      align-items: center;

      span {
        margin-left: 15px;
      }
    }

    img {
      width: 60px;
      height: 60px;
      border-radius: 100%;
      margin: 15px 0px 15px 15px;
    }
  }

  .el-aside {
    background-color: #333744;

    .el-menu {
      border-right: none;
    }
  }

  .el-main {
    background-color: #eaedf1;
  }

  .iconfont {
    margin-right: 10px;
  }

  .toggle-button {
    background-color: #4a5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
</style>
