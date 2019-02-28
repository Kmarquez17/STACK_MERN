import React, { Component } from 'react';

class EditFormulario extends Component {
	constructor() {
		super();
		this.state = {
			title: '',
			description: '',
			id: ''
		};
	}

	componentWillMount() {
		console.log('Component WILL MOUNT!')
	 }
  
	 componentDidMount() {
		this.setState({
			title: this.props.task.title,
			description: this.props.task.description,
		})
	 }

	 componentWillReceiveProps(newProps){
		 console.log(newProps.task)
	 }
	addTask = e => {
		e.preventDefault();
		//Creamos el objeto hacer mandado a la peticion
		const task = {
			title: this.state.title,
			description: this.state.description
		};
		this.props.addTask(task);
		e.currentTarget.reset();
	};
	//Actulizamos nuestos estados que corresponde a los input del form
	handleChange = e => {
		const { name, value } = e.target;
		this.setState({
			[name]: value,
		});
	};
	
	render() {
		console.log('Aqui render')
		return (
			<div className="card">
				<div className="card-content">
					<form onSubmit={this.addTask}>
						<div className="row">
							<div className="input-field col s12">
								<input onChange={this.handleChange} 
									name="title" 
									type="text" 
									placeholder="Task Title" 
									value={this.state.title}
								/>
							</div>
						</div>
						<div className="row">
							<div className="input-field col s12">
								<textarea
									onChange={this.handleChange}
									name="description"
									placeholder="Task Description"
									className="materialize-textarea"
									value={this.state.description}
								/>
							</div>
						</div>
						<button className="btn waves-effect waves-light red">SEND</button>
					</form>
				</div>
			</div>
		);
	}
}

export default EditFormulario;
