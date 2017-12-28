<template>
    <div>
        <Button type="success" :style="{'margin-bottom':'10px'}" @click="modal3=true">添加</Button>
        <Table border :columns="columns7" :data="data6"></Table>
        <Page :total="100" :style="{'float':'right'}" @on-change="getUserByLimit"></Page>
        <!--删除-->
        <modal-delete ref="modalDelete" @success="getUserByLimit(page)"></modal-delete>
        <!--修改-->
        <Modal
                v-model="modal2"
                @on-ok="okUpdateUser()"
                @on-cancel="cancel">
            <Form  :label-width="80">
                <FormItem label="用户名" >
                    <Input type="text" v-model="upUser.name" disabled></Input>
                </FormItem>
                <FormItem label="密码">
                    <Input type="password"  v-model="upUser.password"></Input>
                </FormItem>
                <FormItem label="电话">
                    <Input type="text" v-model="upUser.phone"></Input>
                </FormItem>
                <FormItem label="邮箱">
                    <Input type="text"  v-model="upUser.email"></Input>
                </FormItem>
                <FormItem label="年龄">
                    <Input type="text" v-model="upUser.age" ></Input>
                </FormItem>
                <FormItem label="性别">
                    <Input type="text"  v-model="upUser.sex"></Input>
                </FormItem>
                <FormItem label="地址">
                    <Input type="text" v-model="upUser.address" ></Input>
                </FormItem>
            </Form>
        </Modal>
        <!--添加-->
        <Modal
                v-model="modal3"
                @on-ok="okInsertUser()"
                @on-cancel="cancel">
            <Form  :label-width="80">
                <FormItem label="用户名" >
                    <Input type="text" v-model="newUser.name"></Input>
                </FormItem>
                <FormItem label="密码">
                    <Input type="password"  v-model="newUser.password"></Input>
                </FormItem>
                <FormItem label="电话">
                    <Input type="text" v-model="newUser.phone"></Input>
                </FormItem>
                <FormItem label="邮箱">
                    <Input type="text"  v-model="newUser.email"></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
    import axios from "axios"
    import modalDelete from './modalDelete'
    export default {
        data () {
            return {
                modal2: false,//修改按钮
                modal3: false,//添加按钮
                page: 1,//页码
                deleteName:'',//需要删除的用户的name
                //更新用户信息模型
                upUser:{
                    name: "",
                    password: '',
                    phone: '',
                    email: '',
                    age:'',
                    sex:'',
                    address:''
                },
                //添加用户模型
                newUser:{
                    name: "",
                    password: '',
                    phone: '',
                    email: ''
                },
                //表格框架
                columns7: [
                    {
                        title: '用户名',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.name)
                            ]);
                        }
                    },
                    {
                        title: '密码',
                        key: 'password'
                    },
                    {
                        title: '电话',
                        key: 'phone'
                    },
                    {
                        title: '邮箱',
                        key: 'email'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'info',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.upUser = this.data6[params.index];
                                            this.modal2 = true;
                                            // this.show(params.index)
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.deleteName = this.data6[params.index].name;
                                            //出发子组件的方法
                                            this.$refs.modalDelete.mChange(this.deleteName)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                //表格数据集合
                data6: []
            }
        },
        created(){
            this.getUserByLimit(this.page)
        },
        methods: {
            //查看按钮
            show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.data6[index].name}<br>Password：${this.data6[index].password}<br>Phone：${this.data6[index].phone}<br>Email：${this.data6[index].email}<br>Sex：${this.data6[index].sex}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
                })
            },
            //模态框-取消按钮
            cancel () {
                this.$Message.info('Clicked cancel');
            },
            //确认修改用户信息
            okUpdateUser(){
                var params = new URLSearchParams();
                params.append("name", this.upUser.name);
                params.append("password", this.upUser.password);
                params.append("phone", this.upUser.phone);
                params.append("email", this.upUser.email);
                params.append("age", this.upUser.age);
                params.append("sex", this.upUser.sex);
                params.append("address", this.upUser.address);
                axios.post("http://127.0.0.1:3000/updateUser", params).then((response) => {
                    this.getUserByLimit(this.page)
                }).catch(function (error) {
                    console.log(error);
                });
            },
            //确认添加用户
            okInsertUser(){
                var params = new URLSearchParams();
                params.append("name", this.newUser.name);
                params.append("password", this.newUser.password);
                params.append("phone", this.newUser.phone);
                params.append("email", this.newUser.email);
                axios.post("http://127.0.0.1:3000/insertUser", params).then((response) => {
                    console.log(response);
                    this.$Message.info('用户添加成功');
                    this.getUserByLimit(this.page)
                    //清空数据
                    this.newUser = {}

                }).catch(function (error) {
                    console.log(error);
                });
            },
            //分页查询用户,每次返回5条数据
            getUserByLimit(current){
                //更改页码
                this.page = current;
                axios.get("http://127.0.0.1:3000/getUserLimit", {
                    params: { 'page': current }
                }).then( (response) => {
                    this.data6 = response.data[2].result
                }).catch(function (error) {
                    console.log(error);
                });
            }
        },
        components:{
            modalDelete
        }
    }
</script>
