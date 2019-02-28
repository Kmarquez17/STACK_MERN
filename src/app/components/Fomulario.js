import React, { Component } from 'react';

class Fomulario extends Component {
	constructor() {
		super();
		this.state = {
			title: '',
			description: '',
		};
	}

	addTask = e => {
		e.preventDefault();

		//Creamos el objeto hacer mandado a la peticion
		const task = {
			title: this.state.title,
			description: this.state.description,
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
		return (
			<div className="card">
				<div className="card-content">
					<form onSubmit={this.addTask}>
						<div className="row">
							<div className="input-field col s12">
								<input onChange={this.handleChange} name="title" type="text" placeholder="Task Title" />
							</div>
						</div>
						<div className="row">
							<div className="input-field col s12">
								<textarea
									onChange={this.handleChange}
									name="description"
									placeholder="Task Description"
									className="materialize-textarea"
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

export default Fomulario;
