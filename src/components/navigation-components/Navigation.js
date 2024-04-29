import LogOut from "../user-components/LogOut.js"

/**
 * Component for rendering the navigation bar.
 *
 * @returns {JSX.Element} The JSX element representing the Navigation component.
 */
const Navigation = () => {
	return (
		<div className='navigation-component'>
			<div className='navigation-title-container'>
        <p>Bit För Bit</p>
      </div>
			<LogOut />
		</div>
	)
}

export default Navigation