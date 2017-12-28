<template>
    <Modal
            v-model="model"
            @on-ok="deleteUser"
            @on-cancel="cancel"
            width="170">
       <p>是否确认删除该用户?</p>
    </Modal>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "modal-delete",
        data(){
            return{
                model:false,
                name: ''
            }
        },
        methods:{
            mChange(name){
                this.model = true
                this.name = name
            },
            cancel () {
                this.$Message.info('Clicked cancel');
            },
            deleteUser(){
                var params = new URLSearchParams();
                params.append("name", this.name);
                axios.post("http://192.4.7.247:3000/deleteUser", params).then( (response) => {
                    //发起一个自定义事件
                    this.$emit("success")
                }).catch(function (error) {
                    console.log(error);
                });
            }
        }
    }
</script>

<style scoped>

</style>