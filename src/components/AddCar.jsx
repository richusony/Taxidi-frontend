import axiosInstance from "../axiosConfig.js";
import useOnline from '../hooks/useOnline.jsx';
import React, { useEffect, useState } from 'react';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isValidKeralaRegistrationNumber } from "../constants/index.js";

const AddCar = ({ setError, setAddCar }) => {
    const isOnline = useOnline();
    const [body, setBody] = useState([]);
    const [hosts, setHosts] = useState(null);
    const [brands, setBrands] = useState([]);
    const [taxidiHostData, setTaxidiHostData] = useState(null);
    const [formData, setFormData] = useState({
        model: "",
        brand: "",
        bodyType: "",
        transmission: "",
        fuel: "",
        mileage: "",
        seats: "",
        color: "",
        host: "TAXIDI",
        rent: null,
        city: "",
        pincode: "",
        pickUpLocation: "TAXIDI SERVICE CENTER",
        vehicleImages: null,
        vehicleRegistrationNumber: "",
        registrationCertificateFrontImage: null,
        registrationCertificateBackImage: null,
        insuranceCertificateImage: null,
        pollutionCertificateImage: null,
    });

    useEffect(() => {
        getAllBrands();
        getAllBodys();
        getAllHosts();
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
            setError(error?.response?.data?.error);
        }
    }

    const getAllHosts = async () => {
        try {
            const res = await axiosInstance.get('/admin/hosts');
            console.log(res.data);
            setHosts(res.data);
            const taxidiData = res.data.find((host) => host.email == "taxidi@gmail.com");
            setTaxidiHostData(taxidiData);
        } catch (error) {
            setError(error?.response?.data?.error);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCertificateFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({
            ...formData,
            [name]: files[0],
        });
    };

    const handleVehicleImageFileChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData({
            ...formData,
            vehicleImages: files,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isOnline) {
            setError("You are offline");
            return;
        }

        if (!formData.model || !formData.brand || !formData.color || !formData.bodyType || !formData.vehicleRegistrationNumber ||
            !formData.fuel || !formData.transmission || !formData.mileage || !formData.host || !formData.pickUpLocation) {
            setError("Fill All the fields");
            return;
        }

        if (!isValidKeralaRegistrationNumber(formData.vehicleRegistrationNumber.trim())) {
            setError("Enter a valid RC number");
            return;
        }

        if (formData.vehicleImages.length < 4) {
            setError("Upload atleast 4 images");
            return;
        }

        let res;
        try {
            // Prepare FormData for file upload
            const formDataForUpload = new FormData();
            formData.host = taxidiHostData._id;
            for (const key in formData) {
                if (key === 'vehicleImages' && formData[key]) {
                    formData[key].forEach((file) => {
                        formDataForUpload.append('vehicleImages', file);
                    });
                } else {
                    formDataForUpload.append(key, formData[key]);
                }
            }
            // console.log(formDataForUpload.getAll());
            console.log(formData);
            // return;q
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
            console.log(error);
            // setError(error?.response?.data?.error);

        }
    }

    return (
        <div className='absolute top-[5%] px-10 py-5 bg-white rounded-md shadow-md'>
            <div className='my-5 flex justify-between'>
                <h1 className='text-gray-500 font-bold text-2xl'>Add Car <FontAwesomeIcon icon={faCar} /></h1>
                <button onClick={() => setAddCar(false)} className='border border-[#593CFB] px-2 py-1 rounded'>Cancel</button>
            </div>
            <form className='grid grid-cols-3 gap-5'>
                <div key={"formInput#1"} className='flex flex-col'>
                    <label htmlFor="model">Model</label>
                    <input onChange={handleInputChange} type="text" id='model' name='model' className='border-2  px-2 py-1 rounded' />
                </div>
                <div key={"formInput#2"} className='flex flex-col'>
                    <label htmlFor="brand">Brand</label>
                    <select onChange={handleInputChange} name="brand" id="brand" className='border-2  px-2 py-1 rounded'>
                        <option key={"formInputValue#1"} value="none">None</option>
                        {brands ? brands.map((brand) => (<>
                            <option key={brand._id} className='' value={brand._id}>{brand.brandName}</option>
                        </>
                        ))
                            : ""
                        }
                    </select>
                    {/* <input type="text" id='brand' name='brand' className='border-2  px-2 py-1 rounded' /> */}
                </div>
                <div key={"formInput#3"} className='flex flex-col'>
                    <label htmlFor="color">Colour</label>
                    <input onChange={handleInputChange} type="text" id='color' placeholder='eg: Coffie-Brown' name='color' className='border-2  px-2 py-1 rounded' />
                </div>
                <div key={"formInput#4"} className='flex flex-col'>
                    <label htmlFor="bodyType">Body Type</label>
                    <select key={"formInputSelect#2"} onChange={handleInputChange} name="bodyType" id="bodyType" className='border-2  px-2 py-1 rounded'>
                        <option key={"formInputValue#2"} value="none">None</option>
                        {body ? body.map((type) => (<>
                            <option key={type._id} className='' value={type._id}>{type.bodyType}</option>
                        </>
                        ))
                            : ""
                        }
                    </select>
                    {/* <input type="text" id='bodyType' name='bodyType' className='border-2  px-2 py-1 rounded' /> */}
                </div>
                <div key={"formInput#5"} className='flex flex-col'>
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
                <div key={"formInput#6"} className='flex flex-col'>
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
                <div key={"formInput#7"} className='flex flex-col'>
                    <label htmlFor="seats">No.Seats</label>
                    <select onChange={handleInputChange} name="seats" id="seats" className='border-2  px-2 py-1 rounded'>
                        <option value="none">None</option>
                        <option className='' value="2">Two-Seater</option>
                        <option className='' value="4">Four-Seater</option>
                        <option className='' value="5">Five-Seater</option>
                        <option className='' value="6">Six-Seater</option>
                        <option className='' value="7">Seven-Seater</option>
                        <option className='' value="8">Eight-Seater</option>
                        <option className='' value="9">Nine-Seater</option>
                    </select>
                    {/* <input type="text" id='seats' name='seats' className='border-2  px-2 py-1 rounded' /> */}
                </div>
                <div key={"formInput#8"} className='flex flex-col'>
                    <label htmlFor="vehicleRegistrationNumber">Registeration Number</label>
                    <input onChange={handleInputChange} type="text" id='vehicleRegistrationNumber' name='vehicleRegistrationNumber' className='border-2  px-2 py-1 rounded' />
                </div>
                <div key={"formInput#9"} className='flex flex-col'>
                    <label htmlFor="city">City</label>
                    <input onChange={handleInputChange} type="text" id='city' name='city' className='border-2  px-2 py-1 rounded' />
                </div>
                <div key={"formInput#219"} className='flex flex-col'>
                    <label htmlFor="pincode">Pincode</label>
                    <input onChange={handleInputChange} type="tel" id='pincode' name='pincode' className='border-2  px-2 py-1 rounded' />
                </div>
                <div key={"formInput#239"} className='flex flex-col'>
                    <label htmlFor="pickUpLocation">Pick Up Locaton</label>
                    <input onChange={handleInputChange} type="text" id='pickUpLocation' name='pickUpLocation' value="TAXIDI SERVICE CENTER" disabled className='border-2  px-2 py-1 rounded' />
                </div>
                <div key={"formInput#10"} className='flex flex-col'>
                    <label htmlFor="mileage">Mileage</label>
                    <input onChange={handleInputChange} type="tel" id='mileage' placeholder='km/L' name='mileage' className='border-2  px-2 py-1 rounded' />
                </div>
                <div key={"formInput#11"} className='flex flex-col'>
                    <label htmlFor="host">Host</label>
                    <input onChange={handleInputChange} type="text" id='host' name='host' value="TAXIDI" disabled className='border-2  px-2 py-1 rounded' />
                </div>
                <div key={"formInput#12"} className='flex flex-col'>
                    <label htmlFor="rent">Rent</label>
                    <input onChange={handleInputChange} type="tel" id='rent' name='rent' className='border-2  px-2 py-1 rounded' />
                </div>
                <div key={"formInput#13"} className='flex flex-col'>
                    <label htmlFor="vehicleImages">Vehicle Images</label>
                    <input onChange={handleVehicleImageFileChange} type="file" id='vehicleImages' name='vehicleImages' multiple className='border-2  bg-white px-2 py-1 rounded' />
                </div>
                <div key={"formInput#14"} className='flex flex-col'>
                    <label htmlFor="registrationCertificateFrontImage">RC Front</label>
                    <input onChange={handleCertificateFileChange} type="file" id='registrationCertificateFrontImage' name='registrationCertificateFrontImage' className='border-2  bg-white px-2 py-1 rounded' />
                </div>
                <div key={"formInput#15"} className='flex flex-col'>
                    <label htmlFor="registrationCertificateBackImage">RC Back</label>
                    <input onChange={handleCertificateFileChange} type="file" id='registrationCertificateBackImage' name='registrationCertificateBackImage' className='border-2  bg-white px-2 py-1 rounded' />
                </div>
                <div key={"formInput#16"} className='flex flex-col'>
                    <label htmlFor="insuranceCertificateImage">Insurance Certificate</label>
                    <input onChange={handleCertificateFileChange} type="file" id='insuranceCertificateImage' name='insuranceCertificateImage' className='border-2  bg-white px-2 py-1 rounded' />
                </div>
                <div key={"formInput#17"} className='flex flex-col'>
                    <label htmlFor="pollutionCertificateImage">Pollution Certificate</label>
                    <input onChange={handleCertificateFileChange} type="file" id='pollutionCertificateImage' name='pollutionCertificateImage' className='border-2  bg-white px-2 py-1 rounded' />
                </div>
            </form>
            <div className='mt-5 text-end'><button onClick={handleSubmit} className='bg-[#593CFB] text-white text-xl px-6 py-1 rounded'>Add</button></div>
        </div>
    )
}

export default AddCar