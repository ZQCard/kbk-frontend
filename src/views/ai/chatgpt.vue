<template>
    <div class="app-container">
        <el-container>
            <el-aside style="width: 40%;">
                <div class="system">SYSTEM</div>
                <div>
                    <textarea class="system-input" placeholder="请输入训练指导内容" v-model="systemInput"></textarea>
                </div>
            </el-aside>
            <el-container>
                <el-header>
                    <div>
                        <svg-icon icon-class="tip" />
                        <span>本情景模型为三个角色</span>
                    </div>
                    <div class="tips">
                        system: 输入训练内容以及材料，告诉chatgpt扮演什么角色，应该怎么做<br />
                        chatgpt: gpt模型，他将学习你的输入内容，以及你的要求，完成对用户的帮助<br />
                        user: 服务的对象,即普通的客户
                    </div>
                </el-header>
                <el-main>
                    <div class="message">
                        <div class="content" v-for="message in messages" :key="message.content">
                            <span><svg-icon :icon-class="message.icon" />（{{ message.role }}）</span>
                            <span class="massage-info" style="white-space: pre-wrap;">{{ message.content }}</span>
                        </div>
                    </div>
                </el-main>
                <el-footer>
                    <div>
                        <el-input class="user-input" type="textarea" resize="none" autosize input="checkUserContent"
                            placeholder="请输入查询内容" v-model="userInput" clearable>
                        </el-input>
                        <el-button class="user-submit" type="primary" @click="createMessage">提交</el-button>
                    </div>
                </el-footer>
            </el-container>
        </el-container>
    </div>
</template>
    
<script>
import waves from '@/directive/waves' // waves directive
import { createGptMessage } from '@/api/ai/chatgpt'
import axios from 'axios';
export default {
    name: 'chatgpt',
    directives: { waves },
    data() {
        return {
            chatUser: '你',
            chatGPT: 'chatGPT',
            loding: false,
            tmp: {
                messages: [

                ],
            },
            messages: [],
            userInput: "",
            systemInput: "",

        }
    },
    created() {

    },
    methods: {
        createMessage() {
            if (this.loding) {
                this.$message.error('正在查询中，如长时间无响应，请刷新页面')
                return
            }
            if (this.userInput.length == 0) {
                this.$message.error('请输入查询内容')
                return
            }


            this.messages.push({
                icon: 'panda',
                role: this.chatUser,
                content: this.userInput
            })
            this.messages.push({
                icon: 'beebot',
                role: this.chatGPT,
                content: ''
            })

            this.tmp.messages.push({
                role: 'user',
                content: this.userInput
            })
            if (this.systemInput != "") {
                if (this.tmp.messages[0].role !== 'system') {
                    this.tmp.messages.unshift({
                            role: 'system',
                            content: this.systemInput
                        })
                }
            }
            const socket = new WebSocket('ws://47.251.20.209:8888/ws');
            socket.onopen = () => {
                socket.send(JSON.stringify(this.tmp.messages));
            };

            socket.onmessage = (event) => {
                // 处理收到的响应
                this.messages[this.messages.length - 1].content += event.data
            };
            socket.onclose = () => {
                this.tmp.messages.push({
                    role: 'assistant',
                    content: this.messages[this.messages.length - 1].content
                })
                this.loding = false;
                this.userInput = '';
                // 连接断开时的处理
                console.log('连接已断开');
            };
            // createGptMessage(this.tmp).then(response => {
            //     this.loding = false
            //     this.messages.pop()
            //     this.messages.push({
            //         icon: 'beebot',
            //         role: this.chatGPT,
            //         content: response.choices[0].message.content
            //     })
            //     this.tmp.messages.push({
            //         role: 'assistant',
            //         content: response.choices[0].message.content
            //     })
            // })
        }
    }
}
</script>

<style>
.system {
    line-height: 60px;
    font-size: 30px;
    color: black;
}

.system-input {
    font-size: 16px;
    width: 100%;
    height: 600px;
    background-color: #fff;
    border: none;
    resize: none;
    outline: none;
}

.el-aside {
    background-color: #fff;
    height: 100%;
    border: solid 3px #eeeeee;

}

.tips {
    background-color: #fff;
    color: #B3C0D1;
}

.el-header {
    background-color: #fff;
    color: #B3C0D1;
    margin-bottom: 15px;
    transform: skew(-2deg, 0deg);
}

.el-main {
    font-size: 20px;
    background-color: #fff;
    color: #D3DCE6;
}


.el-container {
    height: 800px;
}

.message {
    background-color: #fff;
    line-height: 35px;
    font-size: 20px;
}

.content {
    margin-top: 10px;
    border-bottom: 3px solid #eee;
}

.content:hover {
    background-color: #eee;
}

.massage-info {
    color: black;
    margin-left: 50px;
}

.user-input {
    width: 70%;
    border: none;
    resize: none;
    outline: none;
}

.user-submit {
    width: 10%;
}
</style>