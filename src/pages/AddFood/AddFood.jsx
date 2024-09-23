
import React, { useEffect, useState } from 'react';
import './AddFood.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddFood = ({ url }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Salad',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!data.name.trim()) newErrors.name = 'Product name is required';
    if (!data.description.trim()) newErrors.description = 'Product description is required';
    if (!data.price || data.price <= 0) newErrors.price = 'Price must be a positive number';
    if (!image) newErrors.image = 'Image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      toast.error('Please correct the errors in the form.');
      return;
    }

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', Number(data.price));
    formData.append('category', data.category);
    formData.append('image', image);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);
      if (response.data.success) {
        console.log('Data added');
        setData({
          name: '',
          description: '',
          price: '',
          category: 'Salad',
        });
        setImage(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
        console.log('No data added');
      }
    } catch (error) {
      toast.error('An error occurred while adding the food item.');
      console.error('Error adding food:', error);
    }
  };

  return (
    <div className='addfood-container'>
        <h2>Add Your Food Items</h2>
      <form className='addfood-form flex-col' onSubmit={onSubmitHandler}>
        <div className='image-upload flex-col'>
          <p>Upload Image</p>
          <label htmlFor='image'>
            <img src={image ? URL.createObjectURL(image) : assets.upload} alt='' />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type='file'
            id='image'
            data-testid="file-input" 
            style={{ display: 'none' }}
          />
          {errors.image && <p className='error-message'>{errors.image}</p>}
        </div>
        <div className='product-name flex-col'>
          <p>Product Name</p>
          <input onChange={onChangeHandler} value={data.name} type='text' name='name' placeholder='Type here' />
          {errors.name && <p className='error-message'>{errors.name}</p>}
        </div>
        <div className='product-description flex-col'>
          <p>Product Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name='description'
            rows='6'
            placeholder='Write description'
            required
          ></textarea>
          {errors.description && <p className='error-message'>{errors.description}</p>}
        </div>
        <div className='price'>
          <div className='category flex-col'>
            <p>Product Category</p>
            <select onChange={onChangeHandler} value={data.category} name='category'>
              <option value='Salad'>Salad</option>
              <option value='Rolls'>Rolls</option>
              <option value='Desert'>Desert</option>
              <option value='Burgers'>Burgers</option>
             
            </select>
          </div>

          <div className='add-price flex-col'>
            <p>Product Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type='number'
              name='price'
              placeholder='$20'
            ></input>
            {errors.price && <p className='error-message'>{errors.price}</p>}
          </div>
        </div>
        <button type='submit' className='addbutton'>
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddFood;
