import React, { useState } from "react";


const ApplyJob = () => {
    const title: string = 'FrontEnd Developer';
    const name: string = 'Prakriti Thapa';
    const email: string = 'tprakrity@gmail.com';
    const letter: string = name[0].toUpperCase();

    const [formData, setFormData] = useState<any>( {
      email: email,
      name: name, 
      phonenumber : ' ',

    } )

    const handleCloseClick = ()=> {}

    const handleFormValueChange = (e:React.ChangeEvent<HTMLInputElement>)=> {
      const {name,value} = e.target;
      setFormData((prev:any)=>({ ...prev, [name]: value }))
      console.log(formData)
    }

  return (
    <section className='sections absolute sm:w-1/2 bg-[#FAF9FB] gap-5 flex flex-col rounded-4xl p-1 '>
        <div className="container border-b-2 border-b-black/10 flex flex-row items-center justify-between pb-3  w-full">
            <h1 className=" md:text-xl font-semibold"> Apply for {title}</h1>
            <button className="cursor-pointer" onClick={handleCloseClick} ><img src="/Icons/close.png" /> </button>
        </div>
        
       
        <div>
          <form className="flex flex-col gap-2">
            <label className=" form-label"> Name</label>
          <input
            type="name"
            required
            name="name"
            className="input-box"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleFormValueChange}

          />
            <label className=" form-label"> Email</label>
          <input
            type="email"
            required
            name="email"
            className="input-box"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleFormValueChange}

          />
          <label className=" form-label"> Phone Number</label>
          <input
            type="phonenumber"
            required
            name="phonenumber"
            className="input-box"
            placeholder="Enter your phone number"
            value={formData.number}
            onChange={handleFormValueChange}

          />

          <label className="form-label"> Upload your CV here: </label>
          <input type= "file" name="cv" className=""  onChange={handleFormValueChange} />
          
         
          </form>
        </div>

    </section>
  )
}

export default ApplyJob