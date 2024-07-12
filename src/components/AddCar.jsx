import { faCar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const AddCar = () => {
    return (
        <div className='absolute top-[20%] px-10 py-5 bg-white rounded-md shadow-md'>
            <div className='my-5 flex justify-between'>
                <h1 className='text-gray-500 font-bold text-2xl'>Add Car <FontAwesomeIcon icon={faCar} /></h1>
                <button className='border border-[#593CFB] px-2 py-1 rounded'>Cancel</button>
            </div>
            <form className='grid grid-cols-3 gap-5'>
                <div className='flex flex-col'>
                    <label htmlFor="model">Model</label>
                    <input type="text" id='model' name='model' className='border-2  px-2 py-1 rounded' />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="brand">Brand</label>
                    <input type="text" id='brand' name='brand' className='border-2  px-2 py-1 rounded' />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="color">Colour</label>
                    <input type="text" id='color' name='color' className='border-2  px-2 py-1 rounded' />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="bodyType">Body Type</label>
                    <input type="text" id='bodyType' name='bodyType' className='border-2  px-2 py-1 rounded' />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="fuel">Fuel</label>
                    <input type="text" id='fuel' name='fuel' className='border-2  px-2 py-1 rounded' />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="transmission">Transmission</label>
                    <input type="text" id='transmission' name='transmission' className='border-2  px-2 py-1 rounded' />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="seats">No.Seats</label>
                    <input type="text" id='seats' name='seats' className='border-2  px-2 py-1 rounded' />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="registerationNumber">Registeration Number</label>
                    <input type="text" id='registerationNumber' name='registerationNumber' className='border-2  px-2 py-1 rounded' />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="pickUpLocation">Pick Up Locaton</label>
                    <input type="text" id='pickUpLocation' name='pickUpLocation' value="TAXIDI SERVICE CENTER" disabled className='border-2  px-2 py-1 rounded' />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="mileage">Mileage</label>
                    <input type="tel" id='mileage' name='mileage' className='border-2  px-2 py-1 rounded' />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="host">Host</label>
                    <input type="text" id='host' name='host' value="TAXIDI" disabled className='border-2  px-2 py-1 rounded' />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="images">Images</label>
                    <input type="file" id='images' name='images' multiple className='border-2  bg-white px-2 py-1 rounded' />
                </div>
                {/* <div className='flex flex-col'>
                <label htmlFor="model">Brand</label>
                <input type="text" id='model' name='model' className='border-2  px-2 py-1 rounded' />
            </div>
            <div className='flex flex-col'>
                <label htmlFor="model">Brand</label>
                <input type="text" id='model' name='model' className='border-2  px-2 py-1 rounded' />
            </div>
            <div className='flex flex-col'>
                <label htmlFor="model">Brand</label>
                <input type="text" id='model' name='model' className='border-2  px-2 py-1 rounded' />
            </div>
            <div className='flex flex-col'>
                <label htmlFor="model">Brand</label>
                <input type="text" id='model' name='model' className='border-2  px-2 py-1 rounded' />
            </div> */}
            </form>
            <div className='mt-5 text-end'><button className='bg-[#593CFB] text-white text-xl px-6 py-1 rounded'>Add</button></div>
        </div>
    )
}

export default AddCar