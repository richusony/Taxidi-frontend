import axiosInstance from "../axiosConfig.js";
import useOnline from '../hooks/useOnline.jsx';
import React, { useEffect, useState } from 'react';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddCar = ({ setError, setAddCar }) => {
    const isOnline = useOnline();
    const [body, setBody] = useState([]);
    const [brands, setBrands] = useState([]);
    const [formData, setFormData] = useState({
        model: '',
        brand: '',
        color: '',
        bodyType: '',
        fuel: '',
        transmission: '',
        seats: '',
        registerationNumber: '',
        mileage: '',
        pickUpLocation: 'TAXIDI SERVICE CENTER',
        host: 'TAXIDI',
        images: [],
    });

    useEffect(() => {
        getAllBrands();
        getAllBodys();
    }, [])

    const getAllBrands = async () => {
        try {
            const res = await axiosInstance.get("/admin/brands");
            setBrands(res.data);
        } catch (error) {
            setError(error?.response?.data?.error)
        }
    }

    const getAllBodys = async () => {
        try {
            const res = await axiosInstance.get("/admin/body-types");
            setBody(res.data);
        } catch (error) {
            setError(error?.response?.data?.error)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData({
            ...formData,
            images: files,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isOnline) {
            setError("You are offline");
            return;
        }

        if (!formData.model || !formData.brand || !formData.color || !formData.bodyType || !formData.registerationNumber ||
            !formData.fuel || !formData.transmission || !formData.mileage || !formData.host || !formData.pickUpLocation) {
            setError("Fill All the fields");
            return;
        }

        if (formData.registerationNumber.trim().length !== 12) {
            setError("Enter a valid RC number");
            return;
        }

        if (formData.images.length < 4) {
            setError("Upload atleast 4 images");
            return;
        }

        let res;
        try {
            // Prepare FormData for file upload
            const formDataForUpload = new FormData();
            formDataForUpload.append('model', formData.model);
            formDataForUpload.append('brand', formData.brand);
            formDataForUpload.append('color', formData.color);
            formDataForUpload.append('bodyType', formData.bodyType);
            formDataForUpload.append('fuel', formData.fuel);
            formDataForUpload.append('transmission', formData.transmission);
            formDataForUpload.append('seats', formData.seats);
            formDataForUpload.append('registerationNumber', formData.registerationNumber);
            formDataForUpload.append('pickUpLocation', formData.pickUpLocation);
            formDataForUpload.append('mileage', formData.mileage);
            formDataForUpload.append('host', formData.host);
            formData.images.forEach((file) => {
                formDataForUpload.append('images', file);
            });
            // console.log(formDataForUpload.getAll());

            res = await fetch(`${import.meta.env.VITE_BACKEND}/admin/add-vehicle`, {
                method: 'POST',
                credentials: 'include',
                body: formDataForUpload
            });
            // const res = await axiosInstance.post('/admin/add-vehicle',formDataForUpload)
            console.log('Car added:', res); // Handle success scenario
            if (res.status !== 201) {
                const data = await res.json()
                setError(data.error)
            }
            // Close the add car modal or perform other actions
            if (res.status == 201) {
                setAddCar(false);
                window.location.href = "/admin/cars"
            }
        } catch (error) {
            // const data = await res.json()
            console.log(data);
            // setError(error?.response?.data?.error);

        }
    }

    return (
        <div className='absolute top-[20%] px-10 py-5 bg-white rounded-md shadow-md'>
            <div className='my-5 flex justify-between'>
                <h1 className='text-gray-500 font-bold text-2xl'>Add Car <FontAwesomeIcon icon={faCar} /></h1>
                <button onClick={() => setAddCar(false)} className='border border-[#593CFB] px-2 py-1 rounded'>Cancel</button>
            </div>
            <form className='grid grid-cols-3 gap-5'>
                <div className='flex flex-col'>
                    <label htmlFor="model">Model</label>
                    <input onChange={handleInputChange} type="text" id='model' name='model' className='border-2  px-2 py-1 rounded' />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="brand">Brand</label>
                    <select onChange={handleInputChange} name="brand" id="brand" className='border-2  px-2 py-1 rounded'>
                        <option value="none">None</option>
                        {brands ? brands.map((brand) => (<>
                            <option key={brand._id} className='' value={brand._id}>{brand.brandName}</option>
                        </>
                        ))
                            : ""
                        }
                    </select>
                    {/* <input type="text" id='brand' name='brand' className='border-2  px-2 py-1 rounded' /> */}
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="color">Colour</label>
                    <input onChange={handleInputChange} type="text" id='color' placeholder='eg: Coffie-Brown' name='color' className='border-2  px-2 py-1 rounded' />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="bodyType">Body Type</label>
                    <select onChange={handleInputChange} name="bodyType" id="bodyType" className='border-2  px-2 py-1 rounded'>
                        <option value="none">None</option>
                        {body ? body.map((type) => (<>
                            <option key={type._id} className='' value={type._id}>{type.bodyType}</option>
                        </>
                        ))
                            : ""
                        }
                    </select>
                    {/* <input type="text" id='bodyType' name='bodyType' className='border-2  px-2 py-1 rounded' /> */}
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="fuel">Fuel</label>
                    <select onChange={handleInputChange} name="fuel" id="fuel" className='border-2  px-2 py-1 rounded'>
                        <option value="none">None</option>
                        <option className='' value="petrol">Petrol</option>
                        <option className='' value="diesel">Diesel</option>
                        <option className='' value="electric">Electric</option>
                        {/* <option className='' value="manual-transmission">Manual Transmission - MT</option> */}
                    </select>
                    {/* <input type="text" id='fuel' name='fuel' className='border-2  px-2 py-1 rounded' /> */}
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="transmission">Transmission</label>
                    <select onChange={handleInputChange} name="transmission" id="transmission" className='border-2  px-2 py-1 rounded'>
                        <option value="none">None</option>
                        <option className='' value="manual-transmission">Manual Transmission - MT</option>
                        <option className='' value="automatic-transmission">Automatic Transmission - AT</option>
                        <option className='' value="automatic-manual-transmission">Automated Manual Transmission - AMT</option>
                        {/* <option className='' value="manual-transmission">Manual Transmission - MT</option> */}
                    </select>
                    {/* <input type="text" id='transmission' name='transmission' className='border-2  px-2 py-1 rounded' /> */}
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="seats">No.Seats</label>
                    <select onChange={handleInputChange} name="seats" id="seats" className='border-2  px-2 py-1 rounded'>
                        <option value="seats">None</option>
                        <option className='' value="two-seater">Two-Seater</option>
                        <option className='' value="four-seater">Four-Seater</option>
                        <option className='' value="five-seater">Five-Seater</option>
                        <option className='' value="six-seater">Six-Seater</option>
                        <option className='' value="seven-seater">Seven-Seater</option>
                        <option className='' value="eight-seater">Eight-Seater</option>
                        <option className='' value="nine-seater">Nine-Seater</option>
                        {/* <option className='' value="manual-transmission">Manual Transmission - MT</option> */}
                    </select>
                    {/* <input type="text" id='seats' name='seats' className='border-2  px-2 py-1 rounded' /> */}
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="registerationNumber">Registeration Number</label>
                    <input onChange={handleInputChange} type="text" id='registerationNumber' name='registerationNumber' className='border-2  px-2 py-1 rounded' />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="pickUpLocation">Pick Up Locaton</label>
                    <input onChange={handleInputChange} type="text" id='pickUpLocation' name='pickUpLocation' value="TAXIDI SERVICE CENTER" disabled className='border-2  px-2 py-1 rounded' />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="mileage">Mileage</label>
                    <input onChange={handleInputChange} type="tel" id='mileage' placeholder='km/L' name='mileage' className='border-2  px-2 py-1 rounded' />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="host">Host</label>
                    <input onChange={handleInputChange} type="text" id='host' name='host' value="TAXIDI" disabled className='border-2  px-2 py-1 rounded' />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="images">Images</label>
                    <input onChange={handleFileChange} type="file" id='images' name='images' multiple className='border-2  bg-white px-2 py-1 rounded' />
                </div>
            </form>
            <div className='mt-5 text-end'><button onClick={handleSubmit} className='bg-[#593CFB] text-white text-xl px-6 py-1 rounded'>Add</button></div>
        </div>
    )
}

export default AddCar