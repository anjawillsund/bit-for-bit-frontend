/**
 * Button component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.className - The class name for the button.
 * @param {Function} props.onClick - The click event handler for the button.
 * @param {string} props.buttonText - The text content of the button.
 * @param {boolean} [props.disabled] - Whether the button is disabled.
 * @param {string} [props.imageSrc] - The image source for the button.
 * @param {string} [props.alt] - The alt text for the image.
 * @returns {JSX.Element} The JSX element representing the Button component.
 */
const Button = ({ id, className, onClick, buttonText, disabled, imageSrc, alt }) => {

  return (
    <button onClick={onClick} id={id} className={className} disabled={disabled}>
      {imageSrc && <img src={imageSrc} alt={alt} style={{ marginRight: buttonText ? '10px' : '0' }} />}
      {buttonText}
    </button>
  )
}

export default Button