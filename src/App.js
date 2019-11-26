import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import { connect } from 'react-redux';
import * as actions from './actions/index';

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			id: '',
			name: '',
			status: false,
			sortBy: 'name',
			sortValue: 1
		}
	}

	onAddNewTask = () => {
		this.onClear();
		this.props.onOpenForm();
	}

	// onShowForm = () => {
	// 	this.setState({
	// 		isDisplayForm : true
	// 	})
	// }

	// onUpdate = (id) => {
	// 	var { tasks } = this.state;
	// 	var index = this.findIndex(id);
	// 	var taskEditting = tasks[index];

	// 	this.setState({
	// 		taskEditting: taskEditting
	// 	});

	// 	this.onShowForm();
	// }

	onClear = () =>{
		this.setState({
			id: '',
			name: '',
			status: false
		})
	}

	findIndex = (id) => {
		var { tasks } = this.state;
		var result = -1;
		tasks.forEach((task, index) => {
			if(task.id === id){
				result = index;
			}
		});
		return result;
	}

	onSearch = (keyword) => {
		this.setState({
			keyword: keyword
		})
	}

	onSort = async (sortBy, sortValue) => {
		await this.setState({
			sortBy: sortBy,
			sortValue: sortValue
		})
	}

	render(){
		var { sortBy, sortValue } = this.state;

		var { isDisplayForm } = this.props;

		// if(keyword){
		// 	// tasks = tasks.filter((task) => {
		// 	// 	return task.name.toLowerCase().indexOf(keyword) !== -1;
		// 	// })
		// 	tasks = filter(tasks, (task) => {
		// 		return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
		// 	})
		// }

		// if(sortBy === 'name'){
		// 	tasks.sort((a, b) => {
		// 		if(a.name > b.name) return sortValue;
		// 		else if(a.name < b.name) return -sortValue;
		// 		else return 0;
		// 	})
		// }else{
		// 	tasks.sort((a, b) => {
		// 		if(a.status > b.status) return -sortValue;
		// 		else if(a.status < b.status) return +sortValue;
		// 		else return 0;
		// 	})
		// }
		

		return (
			<div className="wrapper">
				<div className="container">
			        <div className="text-center">
			            <h1>Quản Lý Công Việc</h1>
			            <hr/>
			        </div>
			        <div className="row">
			            <div className={ isDisplayForm ? 'col-xs-4 col-sm-4' : '' }>
			            	{/* Form */}
			                <TaskForm />
			            </div>
			            <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12' }>
			                <button 
				                type="button" 
				                className="btn btn-primary"
				                onClick={ this.onAddNewTask }
			                >
			                    <span className="fa fa-plus mr-5"></span>Thêm Công Việc
			                </button>
			                {/* Search - Sort */}
			                <Control 
			                	onSearch={ this.onSearch }
			                	onSort={ this.onSort }
			                	sortBy={ sortBy }
			                	sortValue={ sortValue }
			                />
			            	{/* List */}
			                <TaskList
			                	// onUpdate={ this.onUpdate }
			                	onFilter={ this.onFilter }
			                	onUpdateKeyword={ this.state.keyword }
			                />
			            </div>
			        </div>
			    </div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isDisplayForm: state.isDisplayForm
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		onOpenForm: () => {
			dispatch(actions.openForm());
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
