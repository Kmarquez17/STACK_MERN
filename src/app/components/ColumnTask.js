import React, { Component } from 'react';

class ColumnTask extends Component {
	deleteTask = () => {
		this.props.deleteTask(this.props.task._id);
	};

	editTask = () => {
		this.props.editTask(this.props.task);
	};
	
	render() {
		const { title, description } = this.props.task;
		return (
			<tbody>
				<tr>
					<td>{title}</td>
					<td>{description}</td>
					<td>
						<button 
							onClick={this.deleteTask} 
							className="btn waves-effect waves-light red"
						>
							<i className="material-icons">delete</i>
						</button>
						<button
							onClick={this.editTask}
							className="btn waves-effect waves-light red"
							style={{ margin: '4px' }}
						>
							<i className="material-icons">edit</i>
						</button>
					</td>
				</tr>
			</tbody>
		);
	}
}

export default ColumnTask;
