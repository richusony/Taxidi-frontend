import React from 'react';

const Rating = ({ label, value }) => {
    return (
        <div className='my-1 flex items-center'>
            <span className='mr-4'>{label}</span>
            <div className='bg-[#593CFB] w-72 h-2 rounded-xl text-transparent'>-</div>
            <span className='ml-4'>{value.toFixed(1)}</span>
        </div>
    );
};

const RatingList = () => {
    const ratings = [
        { label: 'Cleanliness', value: 5.0 },
        { label: 'Maintenance', value: 5.0 },
        { label: 'Communication', value: 5.0 },
        { label: 'Convenience', value: 5.0 },
        { label: 'Accuracy', value: 5.0 },
    ];

    return (
        <div className='mt-5'>
            {ratings.map(rate => <Rating key={rate.label} label={rate.label} value={rate.value}/>)}
            {/* <div className='text-lg'>
            <h1 className='my-2'>Cleanliness</h1>
            <h1 className='my-2'>Maintenance</h1>
            <h1 className='my-2'>Communication</h1>
            <h1 className='my-2'>Convenience</h1>
            <h1 className='my-2'>Accuracy</h1>
        </div>

        <div>
            <div className='my-2 bg-[#593CFB] w-72 rounded-xl text-transparent h-3'>-</div>
            <div className='my-2 bg-[#593CFB] w-72 rounded-xl text-transparent h-3'>-</div>
            <div className='my-2 bg-[#593CFB] w-72 rounded-xl text-transparent h-3'>-</div>
            <div className='my-2 bg-[#593CFB] w-72 rounded-xl text-transparent h-3'>-</div>
        </div>
        
        <div>
            <div className='my-2 '>5.0</div>
            <div className='my-2 '>5.0</div>
            <div className='my-2 '>5.0</div>
            <div className='my-2 '>5.0</div>
        </div> */}
        </div>
    );
};

export default RatingList;
