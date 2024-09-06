import useOnline from '../../hooks/useOnline';
import React, { useRef, useState } from 'react';
import ErrorToast from "../../components/ErrorToast.jsx";
import DefaultNavbar from '../../components/DefaultNavbar';
import SuccessToast from '../../components/SuccessToast.jsx';
import { isKannur, validateEmail, validateImageFile, validatePhoneNumber } from '../../utils/helper';
import { HOST_BG_IMAGE, isValidKeralaRegistrationNumber, isValidLicenseNumber } from '../../constants';

const BecomeHost = () => {
    const isOnline = useOnline();
    const errorMessageRef = useRef();
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        phone: "",
        city: "",
        pincode: "",
        licenseNumber: "",
        registrationNumber: "",
        model: "",
        brand: "",
        bodyType: "",
        transmission: "",
        fuel: "",
        mileage: "",
        seats: "",
        color: "",
        rent: "",
        vehicleImages: "",
        licenseFrontImage: "",
        licenseBackImage: "",
        registrationCertificateFrontImage: "",
        registrationCertificateBackImage: "",
        insuranceCertificateImage: "",
        pollutionCertificateImage: ""
    });




    const handleFileChange = (e) => {
        const { name, files } = e.target;

        const error = validateImageFile(files[0]);
        if (error) {
            errorMessageRef.current.scrollIntoView();
            setError(error);
            return;
        }

        setFormData({
            ...formData,
            [name]: files[0],
        });
    };

    const MAX_VEHICLE_IMAGES = 5;
    const handleVehicleFileChange = (e) => {
        const files = Array.from(e.target.files);

        if (files.length < MAX_VEHICLE_IMAGES) {
            setError(`minimum ${MAX_VEHICLE_IMAGES} images required.`);
            return;
        }

        for (const file of files) {
            const error = validateImageFile(file);
            if (error) {
                errorMessageRef.current.scrollIntoView();
                setError(error);
                return;
            }
        }

        setFormData({
            ...formData,
            vehicleImages: files,
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isOnline) {
            setError("You are offline");
            return;
        }

        if (!formData.fullname ||
            !formData.email ||
            !formData.phone ||
            !formData.city ||
            !formData.pincode ||
            !formData.licenseNumber ||
            !formData.registrationNumber ||
            !formData.model ||
            !formData.brand ||
            !formData.bodyType ||
            !formData.transmission ||
            !formData.fuel ||
            !formData.mileage ||
            !formData.seats ||
            !formData.color ||
            !formData.rent
        ) {
            errorMessageRef.current.scrollIntoView();
            setError("Fill all the forms");
            return;
        }

        if (!validateEmail(formData.email)) {
            errorMessageRef.current.scrollIntoView();
            setError("Enter valid email");
            return;
        }

        if (!validatePhoneNumber(formData.phone)) {
            errorMessageRef.current.scrollIntoView();
            setError("Enter valid Phone Number");
            return;
        }

        if (!isKannur(Number(formData.pincode.trim()))) {
            errorMessageRef.current.scrollIntoView();
            setError("Currently Booking is only available in Kannur");
            return;
        }

        if (!isValidLicenseNumber(formData.licenseNumber.trim())) {
            errorMessageRef.current.scrollIntoView();
            setError("Please Enter a valid license number");
            return;
        }

        if (!isValidKeralaRegistrationNumber(formData.registrationNumber.trim())) {
            errorMessageRef.current.scrollIntoView();
            setError("Currently we are only accepting Kerala Registered Vehicles.");
            return;
        }

        if (formData.vehicleImages.length < 5) {
            errorMessageRef.current.scrollIntoView();
            setError("minimum 5 images required");
            return;
        }

        if (!formData.licenseFrontImage || !formData.licenseBackImage) {
            errorMessageRef.current.scrollIntoView();
            setError("Upload both front & back image of license");
            return;
        }

        if (!formData.registrationCertificateFrontImage || !formData.registrationCertificateBackImage) {
            errorMessageRef.current.scrollIntoView();
            setError("Upload both front & back image of RC");
            return;
        }

        if (!formData.insuranceCertificateImage) {
            errorMessageRef.current.scrollIntoView();
            setError("Upload Insurance Certificate");
            return;
        }

        if (!formData.pollutionCertificateImage) {
            errorMessageRef.current.scrollIntoView();
            setError("Upload Pollution Certificate");
            return;
        }

        const formDataToSubmit = new FormData();
        for (const key in formData) {
            if (key === 'vehicleImages' && formData[key]) {
                formData[key].forEach((file) => {
                    formDataToSubmit.append('vehicleImages', file);
                });
            } else {
                formDataToSubmit.append(key, formData[key]);
            }
        }

        try {
            // console.log(formData);
            // console.log(formDataToSubmit.get("vehicleImages"));
            const res = await fetch(`${import.meta.env.VITE_BACKEND}/host/host-request`, {
                method: 'POST',
                credentials: 'include',
                body: formDataToSubmit
            });
            if (res.status === 400) {
                const data = await res.json();
                errorMessageRef.current.scrollIntoView();
                setError(data?.error);
            }

            if (res.status === 201) {
                errorMessageRef.current.scrollIntoView();
                setSuccessMsg("request sent successfully");
            }
        } catch (error) {
            errorMessageRef.current.scrollIntoView();
            setError(error.message);
        }
    };

    return (
        <div className='pb-20'>
            <DefaultNavbar />

            <div className='mt-10 px-5 md:px-20'>
                <h3 className='font-bold'>FIND YOUR DRIVE</h3>
                <h1 className='mt-5 w-2/3 text-4xl md:text-7xl font-bold font-serif'>Start a car sharing business on Taxidi</h1>
                <button className='mt-5 px-4 py-2 bg-[#593CFB] text-white text-xl rounded-md'>Get Started</button>
            </div>

            <div className='mt-20 py-10 h-[38rem]'>
                <img className='w-full h-full object-cover' src={HOST_BG_IMAGE} alt="car-image" />
            </div>

            <div className='mt-10 px-5 md:px-20'>
                <div className='mx-auto md:w-2/3'>
                    <p>Take control of your financial future while cultivating your entrepreneurial fire with Taxidi, the world’s largest car sharing marketplace.</p>
                    <p className='mt-4'>Taxidi gives budding entrepreneurs the tools and resources they need to build a small, successful portfolio of cars to share on the marketplace, and the opportunity to add thousands to their annual income.</p>
                    <p className='mt-4'>List your first car now to get started, then build your business plan and scale how you want!</p>
                </div>
            </div>

            <div className='mt-20 px-5 md:px-60'>
                <div ref={errorMessageRef} className='relative'>
                    <ErrorToast error={error} setError={setError} />
                    <SuccessToast msg={successMsg} setSuccessMsg={setSuccessMsg} />
                </div>
                <h1 className='text-xl md:text-2xl font-semibold capitalize'>Send request to become a host</h1>
                <form onSubmit={handleSubmit} encType="multipart/form-data" className='mt-2 mx-auto border px-5 py-4 border-[#593CFB] rounded-md shadow-md'>
                    <div className='grid md:grid-cols-3 gap-3'>
                        <div className='flex flex-col'>
                            <label htmlFor="fullname">Full Name</label>
                            <input type="text" id='fullname' name='fullname' value={formData.fullname} onChange={handleInputChange} className='outline-none py-2 px-2 border-2 border-[#593CFB] rounded' />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="email">Email</label>
                            <input type="email" id='email' name='email' value={formData.email} onChange={handleInputChange} className='outline-none py-2 px-2 border-2 border-[#593CFB] rounded' />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="phone">Phone Number</label>
                            <div className='py-2 px-2 border-2 border-[#593CFB] rounded flex'>
                                <span className='px-1 border-r'>+91</span><input type="tel" id='phone' name='phone' value={formData.phone} onChange={handleInputChange} className='outline-none w-full' />
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="city">City</label>
                            <input type="text" id='city' name='city' value={formData.city} onChange={handleInputChange} className='outline-none py-2 px-2 border-2 border-[#593CFB] rounded' />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="pincode">Pincode</label>
                            <input type="tel" id='pincode' name='pincode' value={formData.pincode} onChange={handleInputChange} className='outline-none py-2 px-2 border-2 border-[#593CFB] rounded' />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="licenseNumber">License Number</label>
                            <input type="tel" id='licenseNumber' name='licenseNumber' value={formData.licenseNumber} onChange={handleInputChange} className='outline-none py-2 px-2 border-2 border-[#593CFB] rounded' />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="registrationNumber">Registration Number</label>
                            <input type="text" id='registrationNumber' name='registrationNumber' value={formData.registrationNumber} onChange={handleInputChange} className='outline-none py-2 px-2 border-2 border-[#593CFB] rounded' />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="model">Vehicle (Model)</label>
                            <input type="text" id='model' name='model' value={formData.model} onChange={handleInputChange} className='outline-none py-2 px-2 border-2 border-[#593CFB] rounded' />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="brand">Brand</label>
                            <input type="text" id='brand' name='brand' value={formData.brand} onChange={handleInputChange} className='outline-none py-2 px-2 border-2 border-[#593CFB] rounded' />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="bodyType">Body Type</label>
                            <input type="text" id='bodyType' name='bodyType' value={formData.bodyType} onChange={handleInputChange} className='outline-none py-2 px-2 border-2 border-[#593CFB] rounded' />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="transmission">Transmission</label>
                            <input type="text" id='transmission' name='transmission' value={formData.transmission} onChange={handleInputChange} className='outline-none py-2 px-2 border-2 border-[#593CFB] rounded' />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="fuel">Fuel</label>
                            <input type="text" id='fuel' name='fuel' value={formData.fuel} onChange={handleInputChange} className='outline-none py-2 px-2 border-2 border-[#593CFB] rounded' />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="mileage">Mileage</label>
                            <input type="text" id='mileage' name='mileage' value={formData.mileage} onChange={handleInputChange} className='outline-none py-2 px-2 border-2 border-[#593CFB] rounded' />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="seats">Seat Capcity</label>
                            <select onChange={handleInputChange} name="seats" id="seats" className='outline-none py-2 px-2 border-2 border-[#593CFB] rounded'>
                                <option value="none">None</option>
                                <option className='' value="2">Two-Seater</option>
                                <option className='' value="4">Four-Seater</option>
                                <option className='' value="5">Five-Seater</option>
                                <option className='' value="6">Six-Seater</option>
                                <option className='' value="7">Seven-Seater</option>
                                <option className='' value="8">Eight-Seater</option>
                                <option className='' value="9">Nine-Seater</option>
                            </select>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="color">Colour</label>
                            <input type="text" id='color' name='color' value={formData.color} onChange={handleInputChange} className='outline-none py-2 px-2 border-2 border-[#593CFB] rounded' />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="rent">Rent (per hour)</label>
                            <input type="tel" id='rent' name='rent' value={formData.rent} onChange={handleInputChange} className='outline-none py-2 px-2 border-2 border-[#593CFB] rounded' />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="vehicleImages">Vehicle Images</label>
                            <input type="file" id='vehicleImages' multiple name='vehicleImages' onChange={handleVehicleFileChange} className='outline-none py-1 px-2 border-2 border-[#593CFB] rounded' />
                        </div>
                    </div>
                    <h1 className='md:hidden my-10 text-center text-gray-500'>------------ Documents ------------</h1>
                    <h1 className='hidden md:block my-10 text-center text-gray-500'>---------------------- Documents ----------------------</h1>
                    <div>
                        <h1 className='text-xl font-semibold'>License</h1>
                        <div className='flex flex-col md:flex-row justify-between'>
                            <div className='flex flex-col'>
                                <label htmlFor="licenseFrontImage">License Front</label>
                                <input type="file" id='licenseFrontImage' name='licenseFrontImage' onChange={handleFileChange} className='outline-none py-2 px-2 border-2 border-[#593CFB] rounded' />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="licenseBackImage">License Back</label>
                                <input type="file" id='licenseBackImage' name='licenseBackImage' onChange={handleFileChange} className='outline-none py-2 px-2 border-2 border-[#593CFB] rounded' />
                            </div>
                        </div>

                        <h1 className='mt-5 text-xl font-semibold'>Registration Certificate</h1>
                        <div className='flex flex-col md:flex-row justify-between'>
                            <div className='flex flex-col'>
                                <label htmlFor="registrationCertificateFrontImage">Certificate Front</label>
                                <input type="file" id='registrationCertificateFrontImage' name='registrationCertificateFrontImage' onChange={handleFileChange} className='outline-none py-2 px-2 border-2 border-[#593CFB] rounded' />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="registrationCertificateBackImage">Certificate Back</label>
                                <input type="file" id='registrationCertificateBackImage' name='registrationCertificateBackImage' onChange={handleFileChange} className='outline-none py-2 px-2 border-2 border-[#593CFB] rounded' />
                            </div>
                        </div>

                        <div className='flex flex-col md:flex-row justify-between'>
                            <div>
                                <h1 className='mt-5 text-xl font-semibold'>Insurance Certificate</h1>
                                <div className='flex flex-col md:flex-row justify-between'>
                                    <div className='flex flex-col'>
                                        <label htmlFor="insuranceCertificateImage">Certificate Front</label>
                                        <input type="file" id='insuranceCertificateImage' name='insuranceCertificateImage' onChange={handleFileChange} className='outline-none py-2 px-2 border-2 border-[#593CFB] rounded' />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h1 className='mt-5 text-xl font-semibold'>Pollution Certificate</h1>
                                <div className='flex flex-col md:flex-row justify-between'>
                                    <div className='flex flex-col'>
                                        <label htmlFor="pollutionCertificateImage">Certificate Front</label>
                                        <input type="file" id='pollutionCertificateImage' name='pollutionCertificateImage' onChange={handleFileChange} className='outline-none py-2 px-2 border-2 border-[#593CFB] rounded' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-5 md:mt-10 text-center'>
                        <button type='submit' className='px-4 md:px-6 py-2 bg-[#593CFB] text-white rounded shadow-md'>Request</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default BecomeHost;
