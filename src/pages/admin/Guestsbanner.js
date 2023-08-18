import React from 'react'
import Navbaradmin from './Navbaradmin'

export default function Guestsbanner() {
  return (
    <div>
        <Navbaradmin/>
    
<div class="flex items-center justify-center p-12">

  <div class="mx-auto max-w-sm w-full max-w-[550px]">
    <form action="https://formbold.com/s/FORM_ID" method="POST">
      <div class="mb-5  text-center">
        <label
          for="name"
          class="mb-3 block text-base font-medium text-[#07074D]"
        >
          Banner head
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter the heading ....."
          class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      
      <div class="mb-5 text-center">
        <label
          for="subject"
          class="mb-3 block text-base font-medium text-[#07074D]"
        >
          Banner image
        </label>
        <input
          type="file"
          name="subject"
          id="subject"
          placeholder="Enter your subject"
          class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <div class="mb-5">
        <label
          for="message"
          class="mb-3 block text-base font-medium text-[#07074D]"
        >
          Banner description
        </label>
        <textarea
          rows="4"
          name="message"
          id="message"
          placeholder="enter your description.."
          class="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        ></textarea>
      </div>
      <div>
        <button style={{background:'#212937'}}
          class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
        >
          Add
        </button>
      </div>
    </form>
  </div>
</div>
    </div>
  )
}
