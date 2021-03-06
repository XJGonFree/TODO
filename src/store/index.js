import * as Vuex from "vuex";
const store = Vuex.createStore({
    state(){//定义状态，任务有未完成状态和完成状态
        return{
            Task_list : [],
            FinshTask_list : [],
        }
    },
    mutations:{//修改状态要执行的业务,,,,,在处理中状态是共享的
        addTask(state,task){//添加任务，，存入的是task对象
            state.Task_list.unshift(task)
        },
        deleteTask(state,index){//删除对应序列的task
            state.Task_list.splice(index,1)
        },
        updateTask(state,task){
            state.Task_list[task.index] = task.task
        },
        finishTask(state,task){
            state.FinshTask_list.unshift(task.task)
            state.Task_list.splice(task.index,1)
        },
        backToNormal(state,task){
            state.Task_list.unshift(task.task)
            state.FinshTask_list.splice(task.index,1)
        }
    }
});
export default store;//默认return store