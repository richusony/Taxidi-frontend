import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Rating = ({ label, value }) => {
    let width = 0;
    if (value == 1) {
        width = 20  ;
    } else if (value == 2) {
        width = 30;
    } else if (value == 3) {
        width = 50;
    } else if (value == 4) {
        width = 70;
    } else if (value == 5) {
        width = 100;
    } else {
        width = 0;
    }
    return (
        <div className='pr-20'>
            <div className='my-1 grid grid-cols-3 gap-x-0 text-center items-center'>
                <span className='text-gray-600 text-start w-32'>{label}</span>
                <div className={`transition-all delay-150 ease-in ${width == 0? "bg-gray-500" : "bg-[#593CFB]"} w-[${width}%] h-2 rounded-xl text-transparent`}>-</div>
                <span className='text-gray-800'>{value? value.toFixed(1) : 0} <FontAwesomeIcon className='text-[#593CFB]' icon={faStar} /></span>
            </div>
        </div>
    );
};

const RatingList = ({ ratingsData }) => {
    const ratings = [
        { label: 'Cleanliness', value: parseFloat(ratingsData?.Cleanliness) },
        { label: 'Maintenance', value: parseFloat(ratingsData?.Maintenance) },
        { label: 'Convenience', value: parseFloat(ratingsData?.Convenience) },
        { label: 'Timing', value: parseFloat(ratingsData?.Timing) },
    ];
    console.log(ratingsData);

    return (
        <div className='mt-5'>
            {ratings.map(rate => <Rating key={rate.label} label={rate.label} value={rate.value} />)}
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
