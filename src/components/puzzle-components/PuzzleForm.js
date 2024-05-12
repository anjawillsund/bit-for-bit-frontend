import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useLocation, useNavigate } from 'react-router-dom'

const PuzzleForm = ({ fetchUrl, method, navigateUrl, buttonText }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { puzzle } = location.state || {}
  const [errors, setErrors] = useState([])

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

  const createFormData = async () => {
    const data = new FormData()
    for (const key of Object.keys(formData)) {
      if (formData[key] != null) {
        if (key === 'image') {
          const file = document.querySelector('input[type="file"]').files[0]
          const resizedImage = await resizeImage(file)
          data.append(key, resizedImage)
        } else {
          data.append(key, formData[key])
        }
      }
    }
    return data
  }

  async function resizeImage(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (event) => {
        const imgElement = document.createElement("img")
        imgElement.src = event.target.result
        imgElement.onload = () => {
          const canvas = document.createElement("canvas")
          const maxWidth = 500
          const scaleSize = maxWidth / imgElement.width
          canvas.width = maxWidth
          canvas.height = imgElement.height * scaleSize
          const ctx = canvas.getContext("2d")
          ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height)
          ctx.canvas.toBlob(
            (blob) => {
              const resizedFile = new File([blob], file.name, {
                type: 'image/png'
              })
              resolve(resizedFile)
              console.log(resizedFile)
              // handle the uploading of resizedFile here
            },
            'image/png', 1)
        }
      }
      reader.onerror = reject
    })
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleDateChange = (date) => {
    setFormData(prevState => ({
      ...prevState,
      lastPlayed: date
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formDataInput = await createFormData()
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
        navigate(navigateUrl)
        console.log('Puzzle added')
      } else if (response.status === 401) {
        console.log('Unauthorized')
        navigate('/login')
      } else {
        const error = await response.json()
        const errorArray = error.message
        setErrors(errorArray)
        console.log('Could not add puzzle')
      }
    } catch (error) {
      console.log(error)
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
      {!formData.complete && (
        <label>
          Antal saknade bitar
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
      {formData.isLentOut && (
        <label>
          Utlånat till
          <input type="text" name="lentOutToString" value={formData.lentOutToString} onChange={handleChange} />
        </label>
      )}
      {errors.length > 0 && (
      <div className='error-list'>
        <ul>
          {errors.map((error, index) => (
            <li key={index}>
              &#x1F9E9;
              <span className='puzzle-point'>{error}</span>
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
