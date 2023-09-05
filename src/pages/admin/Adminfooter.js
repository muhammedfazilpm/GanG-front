import React from 'react'

export default function Adminfooter() {
  return (
<footer style={{backgroundColor: "green",bottom:'0',right:'0',left:'0'}} className="bg-gray-800 text-white py-4">
    <div className="container mx-auto text-center">
      <p className="text-sm">
        © {new Date().getFullYear()} GanG Guest And Guide. All rights reserved.
      </p>
      <div className="mt-2">
        <a
          href="/privacy-policy"
          className="text-gray-300 hover:text-gray-100 mr-4"
        >
          Contact
        </a>
        <a
          href="/terms-of-service"
          className="text-gray-300 hover:text-gray-100"
        >
          Terms of Service
        </a>
      </div>
    </div>
  </footer>  )
}
