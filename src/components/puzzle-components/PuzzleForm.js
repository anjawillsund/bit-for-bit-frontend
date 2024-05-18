import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useLocation, useNavigate } from 'react-router-dom'

const PuzzleForm = ({ fetchUrl, method, navigateUrl, buttonText }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { puzzle } = location.state || {}
  const [errors, setErrors] = useState([])

  /**
   * The initial form data before any changes are made.
   */
  const initialFormData = {
    title: puzzle?.title || '',
    piecesNumber: puzzle?.piecesNumber || '',
    sizeWidth: puzzle?.sizeWidth || '',
    sizeHeight: puzzle?.sizeHeight || '',
    manufacturer: puzzle?.manufacturer || '',
    lastPlayed: puzzle?.lastPlayed || '',
    location: puzzle?.location || '',
    complete: puzzle?.complete === false ? false : true,
    missingPiecesNumber: puzzle?.missingPiecesNumber || '',
    privateNote: puzzle?.privateNote || '',
    sharedNote: puzzle?.sharedNote || '',
    isLentOut: puzzle?.isLentOut || false,
    lentOutToString: puzzle?.lentOutToString || '',
    isPrivate: puzzle?.isPrivate === false ? false : true
  }
  const [formData, setFormData] = useState(initialFormData)

  /**
   * Creates a FormData object from the form data.
   * @returns {FormData} The FormData object.
   */
  const createFormData = async () => {
    const data = new FormData()
    // Loop through the form data and append each key-value pair to the FormData object
    for (const key of Object.keys(formData)) {
      if (formData[key] != null) {
        if (key === 'image') {
          const file = document.querySelector('input[type="file"]').files[0]
          // Resize the image before uploading it
          const resizedImage = await resizeImage(file)
          data.append(key, resizedImage)
        } else {
          data.append(key, formData[key])
        }
      }
    }
    return data
  }

  /**
   * Resizes an image before uploading it.
   * @param {File} file - The image file to resize.
   * @returns {Promise<File>} The resized image file.
   */
  async function resizeImage(file) {
    // Returns a Promise that will eventually resolve to the resized image file.
    return new Promise((resolve, reject) => {
      // FileReader is used to read the contents of the file.
      const reader = new FileReader()
      // Reads the image file as a Data URL, encoding the file as a base64 string.
      reader.readAsDataURL(file)

      // Event handler that is triggered once the image data has been loaded.
      reader.onload = (event) => {
        // Creates a new HTMLImageElement.
        const imgElement = document.createElement("img")
        // Sets the source of the image element to the result from FileReader.
        imgElement.src = event.target.result

        // This event is triggered when the image source has been loaded and the image is ready to be manipulated.
        imgElement.onload = () => {
          // Creates a canvas element to perform the resizing
          const canvas = document.createElement("canvas")
          const maxWidth = 500
          const scaleSize = maxWidth / imgElement.width
          canvas.width = maxWidth
          canvas.height = imgElement.height * scaleSize
          // Get the 2D rendering context for the canvas.
          const ctx = canvas.getContext("2d")
          // Draw the image onto the canvas with the new dimensions.
          ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height)
          // Convert the contents of the canvas to a Blob object.
          ctx.canvas.toBlob(
            (blob) => {
              // Create a new file from the Blob, setting the type to PNG.
              const resizedFile = new File([blob], file.name, {
                type: 'image/png'
              })
              // Resolve the Promise with the new resized File object.
              resolve(resizedFile)
            },
            'image/png', 1)
        }
      }
      // Error handler for FileReader; rejects the Promise if reading the file fails.
      reader.onerror = reject
    })
  }

  /**
   * Updates the form data when the input fields change.
   * @param {Event} e - The event object. 
   */
  const handleChange = (e) => {
    // Destructure the name, value, type, and checked properties from the target of the event.
    const { name, value, type, checked } = e.target
    // Update the form data based on the type of input field.
    setFormData(prevState => ({
      // Spread the previous state to keep the existing form data.
      ...prevState,
      // If the input field is a checkbox, use the checked property; otherwise, use the value property.
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  /**
   * Updates the form data when the date changes.
   * @param {Date} date - The new date value.
   */
  const handleDateChange = (date) => {
    setFormData(prevState => ({
      ...prevState,
      // Update the lastPlayed property with the new date value.
      lastPlayed: date
    }))
  }

  /**
   * Handles the form submission.
   * @param {Event} event - The event object.
   */
  const handleSubmit = async (event) => {
    event.preventDefault()
    // Asynchronously generate the form data from the form fields.
    const formDataInput = await createFormData()
    // The method to use for the fetch request (POST or PUT), is passed as a prop to PuzzleForm.
    const fetchMethod = method
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${process.env.REACT_APP_API_URL}/${fetchUrl}`, {
        method: fetchMethod,
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formDataInput
      })
      if (response.ok) {
        // Redirect the user to the specified URL after the puzzle has been added or updated.
        navigate(navigateUrl)
      } else if (response.status === 401) {
        // If the user is not authenticated, redirect them to the start page.
        navigate('/')
      } else {
        // If the response is not OK, set the errors state with the error message.
        const error = await response.json()
        const errorArray = error.message
        setErrors(errorArray)
      }
    } catch (error) {
      console.error('Error adding puzzle: ', error)
    }
  }

  return (
    <form className="puzzle-form" onSubmit={handleSubmit}>
      <label>
        Bild
        <input type="file" name="image" onChange={handleChange} accept="image/*" className="styled-file-input" />
      </label>
      <label>
        Titel<span className='red'>*</span>
        <input type="text" name="title" value={formData.title} onChange={handleChange} />
      </label>
      <label>
        Antal bitar
        <input type="text" name="piecesNumber" value={formData.piecesNumber} onChange={handleChange} />
      </label>
      {formData.piecesNumber && (
        <label>
          Komplett
          <input type="checkbox" name="complete" checked={formData.complete} onChange={handleChange} />
        </label>
      )}
      {!formData.complete && ( // If the puzzle is not complete, show the missing pieces input field.
        <label>
          Antal saknade bitar<span className='red'>*</span>
          <input type="text" name="missingPiecesNumber" value={formData.missingPiecesNumber} onChange={handleChange} />
        </label>
      )}
      <label>
        Bredd (cm)
        <input type="text" name="sizeWidth" value={formData.sizeWidth} onChange={handleChange} />
      </label>
      <label>
        Höjd (cm)
        <input type="text" name="sizeHeight" value={formData.sizeHeight} onChange={handleChange} />
      </label>
      <label>
        Tillverkare
        <input type="text" name="manufacturer" value={formData.manufacturer} onChange={handleChange} />
      </label>
      <label>
        Senast lagt
        <DatePicker selected={formData.lastPlayed} onChange={handleDateChange} />
      </label>
      <label>
        Förvaras i/på
        <input type="text" name="location" value={formData.location} onChange={handleChange} />
      </label>
      <label>
        Privat anteckning
        <textarea name="privateNote" value={formData.privateNote} onChange={handleChange} />
      </label>
      <label>
        Delad anteckning
        <textarea name="sharedNote" value={formData.sharedNote} onChange={handleChange} />
      </label>
      <label>
        Är utlånat
        <input type="checkbox" name="isLentOut" checked={formData.isLentOut} onChange={handleChange} />
      </label>
      {formData.isLentOut && ( // If the puzzle is lent out, show the lent out to input field.
        <label>
          Utlånat till<span className='red'>*</span>
          <input type="text" name="lentOutToString" value={formData.lentOutToString} onChange={handleChange} />
        </label>
      )}
      {errors.length > 0 && ( // If there are errors, display them in a list.
        <div className='error-list'>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>
                <span className='bullet-point red'>*</span>
                <span className='error-message'>{error}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button type="submit">{buttonText}</button>
    </form>
  )
}

export default PuzzleForm
