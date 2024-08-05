const HostInformation = ({data}) => {
    return (
        <>
            <div>
                <h1 className='text-gray-500 w-fit'>Fullname</h1>
                <h3 className='w-fit'>{data?.fullname}</h3>
            </div>
            <div>
                <h1 className='text-gray-500 w-fit'>Email ID</h1>
                <h3 className='w-fit'>{data?.email}</h3>
            </div>
            <div>
                <h1 className='text-gray-500 w-fit'>Phone Number</h1>
                <h3 className='w-fit'>{data?.phone}</h3>
            </div>
            <div>
                <h1 className='text-gray-500 w-fit'>City</h1>
                <h3 className='w-fit'>{data?.city}</h3>
            </div>
            <div>
                <h1 className='text-gray-500 w-fit'>Pincode</h1>
                <h3 className='w-fit'>{data?.pincode}</h3>
            </div>
        </>
    )
}

export default HostInformation