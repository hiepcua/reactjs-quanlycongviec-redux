import * as types from './../constants/ActionTypes';


var s4 = () => {
	return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

var randomID = () => {
	return s4() + s4() + '-' + s4()  + '-' + s4()  + '-' + s4()  + '-' + s4()  
	+ '-' + s4()  + '-' + s4();
}

var findIndex = (tasks, id) => {
		var result = -1;
		tasks.forEach((task, index) => {
			if(task.id === id){
				result = index;
			}
		});
		return result;
	}


var data = JSON.parse(localStorage.getItem('tasks'));
var initialState = data	? data : [];

var myReducer = (state = initialState, action) => {
	switch(action.type){
		case types.LIST_ALL:
			return state;

		case types.ADD_TASK:
			var newTask = {
				id: randomID(),
				name: action.task.name,
				status: action.task.status
			}

			state.push(newTask);
			localStorage.setItem('tasks', JSON.stringify(state));

			return [...state];

		case types.UPDATE_STATUS_TASK:
			var id = action.id;
			var index = findIndex(state, id);
			
			// state[index].status = !state[index].status;
			// Cách 1 : Bị thay đổi vị trí các phần tử
			// var cloneTask = {...state[index]};
			// cloneTask.status = !cloneTask.status;

			// state.splice(index, 1);
			// state.push(cloneTask);

			// Cách 2: 
			// var cloneTask = {...state[index]};
			// cloneTask.status = !cloneTask.status;

			// state[index] = cloneTask;

			// localStorage.setItem('tasks', JSON.stringify(state));

			// Cách 3:
			state[index] = {
				...state[index],
				status: !state[index].status
			}

			return [...state];

		case types.DELETE_TASK:
			console.log(action);
			var id = action.id;
			var index = findIndex(state, id);

			state.splice(index, 1);
			localStorage.setItem('tasks', JSON.stringify(state));

			return state;

		default: return state;
	}
}

export default myReducer;