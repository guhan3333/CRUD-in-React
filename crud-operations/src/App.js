import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';






function App() {
  const [inputData, SetInputData] = useState({
    fname: '',
    lname: '',
    email: '',
    phone: '',
  });

  const [savedData, setSavedData] = useState([]);

  const [isEditing, setIsEditing] = useState(false);


  const [editIndex, SetEditIndex] = useState();

  const handleInputChange = (e) => {
    // console.log(e.target.name);
    const name = e.target.name;
    const value = e.target.value;
    SetInputData({ ...inputData, [name]: value });
  };

  const handleSubmit = () => {
    if (isEditing) {

      const tempArray = savedData.map((data, index) => {
        return index === editIndex ? inputData : data
      })
      
      setSavedData(tempArray);
      setIsEditing(false);
      SetEditIndex();

    }
    else {
      setSavedData([...savedData, inputData]);
      console.log(inputData);
    }

    SetInputData({
      fname: '',
      lname: '',
      email: '',
      phone: '',
    })


  };

  const handleDelete = (index) => {
    console.log(index);
    const tempArray = [...savedData];
    tempArray.splice(index, 1);
    setSavedData(tempArray);

  };

  const handleEdit = (index) => {
    setIsEditing(true);
    SetEditIndex(index);
    SetInputData(savedData[index])

  }


  return (
    <div className='container mt-5'>
      <div className='row'>

        {/* form */}
        <div className='col-6'>
          <div className='mb-3'>
            <input type="text" placeholder='First name' value={inputData.fname} name='fname' class='form-control' onChange={handleInputChange} />
          </div>

          <div className='mb-3'>
            <input type="text" placeholder='last name'value={inputData.lname} name='lname' class='form-control' onChange={handleInputChange} />
          </div>

          <div className='mb-3'>
            <input type="text" placeholder='Email' value={inputData.email} name='email' class='form-control' onChange={handleInputChange} />
          </div>

          <div className='mb-3'>
            <input type="Number" placeholder='Phone'  value={inputData.phone} name='phone' class='form-control' onChange={handleInputChange} />
          </div>

          <div class='mb-3'>
            <button type='submit' className='btn btn-primary' onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>


        {/* Table  */}

        <div className='col-6'>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
              </tr>
            </thead>
            <tbody>
              {savedData.map((data, index) => {
                return <tr>
                  <th>{index + 1}</th>
                  <td>{data.fname}</td>
                  <td>{data.lname}</td>
                  <td>{data.email}</td>
                  <td>{data.phone}</td>
                  <td><button type='submit' className='btn btn-primary' onClick={() => handleEdit(index)}>Edit</button></td>
                  <td><button type='submit' className='btn btn-danger' onClick={() => handleDelete(index)}>Delete</button></td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
