import React from 'react'
import Navbarguest from './Navbarguest'
import { useEffect } from 'react'
import {guestRequest} from '../../axios'

export default function Chatlists() {

    useEffect(()=>{
        // getchatLIst()

    },[])

  return (
    <div>
         <Navbarguest/>
         
<div className="w-full text-center mx-auto my-auto max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
    <div className="flex items-center justify-between mb-4 text-center">
        <h5 className="text-xl  font-bold leading-none text-gray-900 dark:text-white">Chatlists</h5>
        <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
            
        </a>
   </div>
   <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
        <li className="pt-3 pb-0 sm:pt-4">
                <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-5.jpg" alt="Thomas image"/>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Thomes Lean
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            email@windster.com
                        </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        $2367
                    </div>
                </div>
                
            </li>
            
        </ul>
   </div>
</div>


        
        </div>
  )
}
