import React, { Component } from 'react';
import TaskItem from './TaskItem';
import { connect } from 'react-redux';

class TaskList extends Component {
    constructor(props){
        super(props);
        this.state = {
            filterName: '',
            filterStatus: -1, // all : -1, active : 1, deactive : 0  
            keyword: ''
        }
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;

        this.setState({
            [name]: value
        });
    }

    render(){
        var { tasks, onUpdateKeyword } = this.props;
        var { filterName, filterStatus } = this.state;

        if(filterName){
            if(filterName !== ''){
                tasks = tasks.filter((task) => {
                    return task.name.toLowerCase().indexOf(filterName) !== -1;
                });
            }
        }

        filterStatus = +filterStatus;
        tasks = tasks.filter((task) => { 
            if(filterStatus === -1){
                return task;
            }else{
                return task.status === (filterStatus === 1) ? true : false;
            }
        })

        if(onUpdateKeyword){
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(onUpdateKeyword) !== -1;
            });
        }

        var elmTasks = tasks.map((task, index) => {
            return <TaskItem 
                    key={ task.id } 
                    index={ index }
                    task={ task }
                    onUpdate={ this.props.onUpdate }
                />
        });
        return (
            <div className="row mt-15">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th className="text-center">STT</th>
                                <th className="text-center">Tên</th>
                                <th className="text-center">Trạng Thái</th>
                                <th className="text-center">Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>
                                    <input 
                                        type="text" 
                                        name="filterName"
                                        value={ filterName }
                                        onChange={ this.onChange }
                                        className="form-control" 
                                    />
                                </td>
                                <td>
                                    <select 
                                        name="filterStatus" 
                                        className="form-control"
                                        value={ filterStatus }
                                        onChange={ this.onChange }
                                    >
                                        <option value="-1">Tất Cả</option>
                                        <option value="0">Ẩn</option>
                                        <option value="1">Kích Hoạt</option>
                                    </select>
                                </td>
                                <td></td>
                            </tr>
                            { elmTasks }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { tasks: state.tasks }
}

export default connect(mapStateToProps)(TaskList);
