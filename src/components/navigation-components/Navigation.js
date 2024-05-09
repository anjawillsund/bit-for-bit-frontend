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
        <p id='navigation-title'><span className='jigsaw'><span className='green'>B</span><span className='yellow'>i</span><span className='coral'>t</span></span> <span className='handwriting'>För</span> <span className='jigsaw'><span className='green'>B</span><span className='yellow'>i</span><span className='coral'>t</span></span></p>
      </div>
			<LogOut />
		</div>
	)
}

export default Navigation