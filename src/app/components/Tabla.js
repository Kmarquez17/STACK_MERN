import React, { Component } from 'react';
import ColumnTask from '../components/ColumnTask';
class Tabla extends Component {
	render() {
		return (
			<div>
				<table>
					<thead>
						<tr>
							<th>Title</th>
							<th>Description</th>
						</tr>
					</thead>
					{this.props.tasks.map(task => {
						return <ColumnTask key={task._id} task={task} deleteTask={this.props.deleteTask} editTask={this.props.Task}/>;
					})}
				</table>
			</div>
		);
	}
}

export default Tabla;
