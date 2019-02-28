import React, { Component } from 'react';
import Header from './components/Header';
import Formulario from './components/Fomulario';
import Tabla from './components/Tabla';

class App extends Component {
	state = {
		tasks: [],
	};

	addTask = task => {
		fetch('/api/tasks', {
			method: 'POST',
			body: JSON.stringify(task),
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		})
			.then(res => res.json())
			.then(data => {
				M.toast({ html: data.message });
				this.fetchTasks();
			})
			.catch(err => console.log(err));
		//console.log(task)
	};
	deleteTask = id => {
		if (confirm('Estas seguro de eliminar esta tarea')) {
			fetch(`/api/tasks/${id}`, {
				method: 'DELETE',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			})
				.then(res => res.json())
				.then(data => {
					M.toast({ html: data.message });
					this.fetchTasks();
				})
				.catch(err => console.log(err));
		}
	};

	editTask = id => {
		// fetch(`/api/tasks/${id}`)
		console.log(id)
	};

	fetchTasks() {
		fetch('/api/tasks')
			.then(res => res.json())
			.then(data => {
				this.setState({
					tasks: data.data,
				});
			})
			.catch(err => console.log(err));
	}

	componentDidMount() {
		this.fetchTasks();
		// console.log('Compo' + this.state.tasks.length)
	}


	render() {		
		const vacio = Object.keys(this.state.tasks).length === 0 ? false : true;
		console.log('render' +this.state.tasks.length)
		
		return (
			<div className="container">
				<div className="row">
					<Header title="MERN STACK" />
					<div className="col s5">
						<Formulario addTask={this.addTask} />
					</div>
					<div className="col s7" style={{ overflow: 'scroll', height: '248px' }}>
						{/* <Tabla tasks={this.state.tasks} deleteTask={this.deleteTask} editTask={this.editTask} /> */}
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
