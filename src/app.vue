<style scoped>
    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }

    .layout-breadcrumb {
        padding: 10px 15px 0;
    }

    .layout-content {
        min-height: 200px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }

    .layout-content-main {
        padding: 10px;
    }

    .layout-copy {
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }

    .layout-menu-left {
        background: #464c5b;
    }

    .layout-header {
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
    }

    .layout-logo-left {
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }

    .layout-ceiling-main a {
        color: #9ba7b5;
    }

    .layout-hide-text .layout-text {
        display: none;
    }

    .ivu-col {
        transition: width .2s ease-in-out;
    }

    .ivu-menu-vertical .ivu-menu-item {
        padding: 0;
        height: 50px;
        line-height: 50px;
    }

    .ivu-menu-item a {
        display: block;
        color: #fff;
    }
</style>
<template>
    <div>
        <div class="layout" v-show="admin" :class="{'layout-hide-text': spanLeft < 5}">
            <Row type="flex">
                <Col :span="spanLeft" class="layout-menu-left">
                <Menu active-name="1" theme="dark" width="auto">
                    <div class="layout-logo-left"></div>
                    <MenuItem name="1">
                        <div @click="cTitle('用户管理','/user')">
                            <Icon type="ios-navigate" :size="iconSize" :style="{'margin-left':'15px'}"></Icon>
                            <span class="layout-text">
                        用户管理
                    </span>
                        </div>
                    </MenuItem>
                    <MenuItem name="2">
                        <div @click="cTitle('商品管理','/goods')">
                            <Icon type="ios-keypad" :size="iconSize" :style="{'margin-left':'15px'}"></Icon>
                            <span class="layout-text">
                        商品管理
                    </span>
                        </div>
                    </MenuItem>
                    <MenuItem name="3">
                        <router-link to="/user">
                            <Icon type="ios-analytics" :size="iconSize" :style="{'margin-left':'15px'}"></Icon>
                            <span class="layout-text">
                        订单管理
                    </span>
                        </router-link>
                    </MenuItem>
                </Menu>
                </Col>
                <Col :span="spanRight">
                <div class="layout-header">
                    <Button type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </Button>
                    <Button type="error" @click="signOut" style="float: right;margin-top: 10px;margin-right: 30px;">退出</Button>
                </div>
                <div class="layout-breadcrumb">
                    <h2>{{ title }}</h2>
                </div>
                <div class="layout-content">
                    <div class="layout-content-main">
                        <router-view></router-view>
                    </div>
                </div>
                <div class="layout-copy">
                    2011-2016 &copy; TalkingData
                </div>
                </Col>
            </Row>
        </div>
        <div class="login" v-show="!admin" style="text-align: center">
            <h1 style="margin-top: 50px;">管理员登陆界面</h1>
            <Form  :label-width="80" style="width: 500px;display: inline-block;margin-top: 100px;">
                <FormItem label="用户名" prop="text">
                    <Input type="text" v-model="user.name"></Input>
                </FormItem>
                <FormItem label="密码" prop="passwdCheck">
                    <Input type="password"  v-model="user.password"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="login">登陆</Button>
                    <Button type="ghost" @click="reset"  style="margin-left: 8px">重置</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>
<script>
    // import './js/canvas-bg'
    export default {
        data() {
            return {
                admin:false,//控制登陆界面
                spanLeft: 5,
                spanRight: 19,
                title: "用户管理",
                user:{
                    name:'',
                    password:''
                }
            }
        },
        created(){
            if(sessionStorage.getItem("admin") == "true"){
                this.admin = true
            }
        },
        computed: {
            iconSize() {
                return this.spanLeft === 5 ? 14 : 24;
            }
        },
        methods: {
            //导航菜单切换
            toggleClick() {
                if (this.spanLeft === 5) {
                    this.spanLeft = 2;
                    this.spanRight = 22;
                } else {
                    this.spanLeft = 5;
                    this.spanRight = 19;
                }
            },
            //路由跳转
            cTitle(titleName, mPath) {
                this.title = titleName
                this.$router.push({path: mPath})
            },
            //管理员登陆
            login(){
                if(this.user.name == "admin" && this.user.password == "admin"){
                    this.admin = true
                    sessionStorage.setItem("admin",true)
                }
            },
            //登陆后-退出按钮
            signOut(){
                this.admin = false
                sessionStorage.setItem("admin",false)
                this.user = {name:'', password:''}
            },
            //登陆-重置按钮
            reset(){
                this.user = {name:'', password:''}
            }
        }
    }
</script>
