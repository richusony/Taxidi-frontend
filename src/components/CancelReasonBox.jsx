import React from 'react'

const CancelReasonBox = () => {
  return (
    <div className='absolute top-0 min-h-screen min-w-full bg-gradient-to-tr bg-black flex justify-between items-center'>
        <div>
            <textarea name="cancelReason" placeholder='Reason for cancelling' id="cancelReason" cols="30" rows="10"></textarea>
            <div>
                <button>Go Back</button><button>Cancel Booking</button>
            </div>
        </div>
    </div>
  )
}

export default CancelReasonBox