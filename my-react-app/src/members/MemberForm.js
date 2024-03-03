import React, { useState } from 'react';
import '../assets/css/MemberForm.css';
import axios from '../component/Axios';
import Joi from "joi";

const MemberForm = ({ addMembers }) => {
  const [memberData, setMemberData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    address: '',
  });

  const [error, setError] = useState('');
console.log(Joi);
  const schema = Joi.object({
    first_name: Joi.string().max(20).required(),
    last_name: Joi.string().max(20).required(),
     email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    address: Joi.string().max(40).required(),
  });

  const validateMemberData = (data) => {
    const { error } = schema.validate(data);
    if (error) {
      throw new Error(error.details[0].message);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setMemberData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    try {

      validateMemberData(memberData);
      const response = await axios.post('/members', memberData);
      addMembers();
      console.log('Response from server:', response.data);



      setMemberData({
        first_name: '',
        last_name: '',
        email: '',
        address: '',
      });
    }
    catch (error) {
      if (error.name === 'ValidationError') {
       
        console.error('Error validating member data:', error.message);
        setError(`Validation Error: ${error.message}`);
      } else {
        console.error('Error adding member:', error);

        if (error.response) {
          setError(`Error: ${error.response.status} - ${error.response.data.message}`);
        } else if (error.request) {
          setError('No response from server');
        } else {
          setError(`Error: ${error.message}`);
        }
      }
    }
  };

  return (
    <div>
      <h1>הוספת חבר</h1>
      <form className="member-form" onSubmit={handleSubmit}>
        <label>
          שם:
          <input
            type="text"
            name="first_name"
            value={memberData.first_name}
            onChange={handleChange}
          />
        </label>
        <label>
          משפחה:
          <input
            type="text"
            name="last_name"
            value={memberData.last_name}
            onChange={handleChange}
          />
        </label>
        <label>
          אימייל:
          <input
            type="email"
            name="email"
            value={memberData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          כתובת:
          <input
            type="text"
            name="address"
            value={memberData.address}
            onChange={handleChange}
          />
        </label>
        <button type="submit">שלח</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>);
};

export default MemberForm;
