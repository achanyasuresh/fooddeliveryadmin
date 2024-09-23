import React from 'react'
import  { useEffect, useState } from 'react'
import './ListFood.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const ListFood = ({url}) => {
    const [list,setList] = useState([])
    const fetchList = async () =>{
        const response = await axios.get(`${url}/api/food/list`);
        console.log(response.data)
        if(response.data.success){
            setList(response.data.data)
        }
        else{
            toast.error("Error")
        }

    }

    const removeFood =async (foodId) =>{
        const response = await axios.post(`${url}/api/food/delete`,{id:foodId})
        await fetchList();
        if(response.data.success){
            toast.success(response.data.message)
        }
        else{
            toast.error('Error')
        }
    }

useEffect(()=>{
    fetchList();
},[])

  return (
    <div className='list add flex-col'>
        <p>List All Foods</p>
        <div className="list-table">
            <div className="list-table-format titile">
                <b>Image</b>
                <b>Name</b>
                <b>Category</b>
                <b>Price</b>
                <b>Action</b>

            </div>
            {list.map((item,index)=>{
                return(
                    <div key={index} className='list-table-format'>
                        <img src={`${url}/images/`+item.image}></img>
                        <p>{item.name}</p>
                        <p>{item.category}</p>
                        <p>${item.price}</p>
                        <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>


                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default ListFood
