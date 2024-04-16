/**
 * Button component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.className - The class name for the button.
 * @param {Function} props.onClick - The click event handler for the button.
 * @param {string} props.buttonText - The text content of the button.
 * @param {boolean} [props.disabled] - Whether the button is disabled.
 * @returns {JSX.Element} The JSX element representing the Button component.
 */
const Button = ({ className, onClick, buttonText, disabled }) => {

  return (
    <button onClick={onClick} className={className} disabled={disabled}>
      {buttonText}
    </button>
  )
}

export default Button