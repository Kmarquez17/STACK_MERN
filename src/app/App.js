import React, { Component } from 'react';
import Header from './components/Header';
import Formulario from './components/Fomulario';
import Tabla from './components/Tabla';
import EditFormulario from './components/EditFormulario';
class App extends Component {
	state = {
		task: [],
		tasks: [],
		isEdit: false,
		id: '',
	};

	async petFetch(method, endpoint, body) {
		try {
			const query = await fetch(`${endpoint}`, {
				method,
				body: body && JSON.stringify(body),
				headers: {
					Accept: 'application/json',
					'content-type': 'application/json',
				},
			});
			const { data } = await query.json();
			return data;
		} catch (err) {
			console.log(err);
		}
	}

	async getTasks() {
		this.setState({ tasks: await this.petFetch('get', '/api/tasks') });
	}

	componentDidMount() {
		this.getTasks();
	}

	addTask = async task => {
		console.log(task);
		if (this.state.isEdit) {
			await this.petFetch('put', `/api/tasks/${this.state.id}`, task);			
		} else {
			await this.petFetch('post', '/api/tasks', task);
		}
		this.setState({
				isEdit: false,
				task:[]
			});
		this.getTasks();
	};

	deleteTask = async id => {
		if (confirm('Estas seguro de eliminar esta tarea')) {
			await this.petFetch('delete', `/api/tasks/${id}`);
			this.getTasks();
		}
	};

	editTask = task => {
		// fetch(`/api/tasks/${id}`)
		console.log(task);
		// this.setState({
		// 	task,
		// 	isEdit: true,
		// 	id: task._id,
		// });
	};

	render() {
		const vacio = Object.keys(this.state.tasks).length === 0 ? false : true;
		return (
			<div className="container">
				<div className="row">
					<Header title="MERN STACK" />
					<div className="col s5">
						{this.state.isEdit ? (
							<EditFormulario task={this.state.task} addTask={this.addTask} />
						) : (
							<Formulario addTask={this.addTask} />
						)}
					</div>
					<div className="col s7" style={{ overflow: 'scroll', height: '248px' }}>
						{vacio ? (
							<Tabla tasks={this.state.tasks} deleteTask={this.deleteTask} editTask={this.editTask} />
						) : (
							<h4>No hay tareas</h4>
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default App;
