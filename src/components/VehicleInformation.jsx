const VehicleInformation = ({data}) => {
    return (
        <>
            <div>
                <h1 className='text-gray-500 w-fit'>Registration Number</h1>
                <h3 className='w-fit'>{data?.vehicleRegistrationNumber}</h3>
            </div>
            <div>
                <h1 className='text-gray-500 w-fit'>Model</h1>
                <h3 className='w-fit'>{data?.model}</h3>
            </div>
            <div>
                <h1 className='text-gray-500 w-fit'>Seat Capacity</h1>
                <h3 className='w-fit'>{data?.seats}</h3>
            </div>
            <div>
                <h1 className='text-gray-500 w-fit'>Colour</h1>
                <h3 className='w-fit'>{data?.color}</h3>
            </div>
            <div>
                <h1 className='text-gray-500 w-fit'>Last Service Date</h1>
                <h3 className='w-fit'>Not Done</h3>
            </div>
            <div>
                <h1 className='text-gray-500 w-fit'>Pick-Up Location</h1>
                <h3 className='w-fit'>Not Done</h3>
            </div>
        </>
    )
}

export default VehicleInformation