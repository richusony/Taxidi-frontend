import React from 'react';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Rating = ({ label, value }) => {
    // Calculate the width based on the value
    const getWidth = (value) => {
        const rounded = Math.floor(value);
        switch (rounded) {
            case 1: return 20;
            case 2: return 30;
            case 3: return 50;
            case 4: return 70;
            case 5: return 100;
            default: return 0;
        }
    };

    const width = getWidth(value);

    return (
        <div className='pr-20'>
            <div className='my-1 grid grid-cols-3 gap-x-0 text-center items-center'>
                <span className='text-gray-600 text-start w-32'>{label}</span>
                <div
                    className={`transition-all delay-150 text-transparent ease-in ${width === 0 ? "bg-gray-500" : "bg-[#593CFB]"} h-2 rounded-xl`}
                    style={{ width: `${width}%` }}
                >
                    -
                </div>
                <span className='text-gray-800'>
                    {value ? value.toFixed(1) : 0} <FontAwesomeIcon className='text-[#593CFB]' icon={faStar} />
                </span>
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

    return (
        <div className='mt-5'>
            {ratings.map(rate => (
                <Rating key={rate.label} label={rate.label} value={rate.value} />
            ))}
        </div>
    );
};

export default RatingList;