import React from 'react';

const Header = props => {
	return (
		<nav className="waves-light red">
			<div className="container">
				<a href="/" className="brand-logo">
					{props.title}
				</a>
			</div>
		</nav>
	);
};

export default Header;