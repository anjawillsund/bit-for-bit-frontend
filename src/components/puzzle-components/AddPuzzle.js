import { useState, useContext } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'  // Styles for the date picker
import { TokenContext } from '../contexts/TokenContext'

const AddPuzzle = () => {
  const fetchWithToken = useContext(TokenContext)
  const [formData, setFormData] = useState({
    image: '',
    title: '',
    piecesNumber: '',
    height: '',
    width: '',
    manufacturer: '',
    lastPlayed: new Date(),
    location: '',
    complete: true,
    missingPiecesNumber: '',
    privateNote: '',
    sharedNote: '',
    isLentOut: false,
    lentOutTo: ''
  })

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
    try {
      const response = await fetchWithToken('http://localhost:8090/my/puzzles', {
        method: 'POST',
        body: {
          ...formData
        }
      })
      if (response.ok) {
        console.log('Puzzle added')
      } else {
        console.log('Could not add puzzle')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form className="add-puzzle-form" onSubmit={handleSubmit}>
      <label>
        Image:
        <input type="file" name="image" onChange={handleChange} accept="image/*" />
      </label>
      <label>
        Title:
        <input type="text" name="title" value={formData.title} onChange={handleChange} />
      </label>
      <label>
        Number of Pieces:
        <input type="text" name="piecesNumber" value={formData.piecesNumber} onChange={handleChange} />
      </label>
      <label>
        Height (cm):
        <input type="text" name="height" value={formData.height} onChange={handleChange} />
      </label>
      <label>
        Width (cm):
        <input type="text" name="width" value={formData.width} onChange={handleChange} />
      </label>
      <label>
        Manufacturer:
        <input type="text" name="manufacturer" value={formData.manufacturer} onChange={handleChange} />
      </label>
      <label>
        Last Played:
        <DatePicker selected={formData.lastPlayed} onChange={handleDateChange} />
      </label>
      <label>
        Location:
        <input type="text" name="location" value={formData.location} onChange={handleChange} />
      </label>
      <label>
        Complete:
        <input type="checkbox" name="complete" checked={formData.complete} onChange={handleChange} />
      </label>
      {formData.complete && (
        <label>
          Number of Missing Pieces:
          <input type="text" name="missingPiecesNumber" value={formData.missingPiecesNumber} onChange={handleChange} />
        </label>
      )}
      <label>
        Private Note:
        <input type="text" name="privateNote" value={formData.privateNote} onChange={handleChange} />
      </label>
      <label>
        Shared Note:
        <input type="text" name="sharedNote" value={formData.sharedNote} onChange={handleChange} />
      </label>
      <label>
        Is Lent Out:
        <input type="checkbox" name="isLentOut" checked={formData.isLentOut} onChange={handleChange} />
      </label>
      {formData.isLentOut && (
        <label>
          Lent Out To:
          <input type="text" name="lentOutTo" value={formData.lentOutTo} onChange={handleChange} />
        </label>
      )}
      <button type="submit">Add Puzzle</button>
    </form>
  )
}

export default AddPuzzle
