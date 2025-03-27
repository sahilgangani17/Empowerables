import React from 'react'

export const Card = ({ name, data }) => {
  return (
    <div class="item item-rounded mb-30">
      <div class="text-center service">
        <i class="fa fa-eye fa-2x service-icon"></i>
        <div class="mt-10">
          <h3>{name}</h3>
          <p>Empowering the visually impaired with real-time object recognition and alerts.</p>
          <a href="#" class="btn btn-block btn-primary">Learn More</a>
        </div>
      </div>
    </div>

    // <div className="bg-[#28FF64] text-[#0F092D] w-96 h-52 rounded-lg py-8 px-6 shadow-lg flex flex-col justify-around items-center">
    //   <h1 className='text-3xl font-semibold'>{name}</h1>
    //   <h1 className='text-lg'>{data}</h1>
    // </div>
  )
}
