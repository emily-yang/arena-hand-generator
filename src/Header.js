import React from 'react';

const Header = (props) => (
	<header className="header">
		<p><strong>Hello!</strong> This tool reads your MtG Arena draft deck from a log file and simulates opening hand draws for your deck testing purposes. </p>
		<p>The default location of the files is:</p> 
		<p><strong>C:\Program Files (x86)\Wizards of the Coast\MTGA\MTGA_Data\Logs\Logs</strong></p>
	</header>
)

export default Header;