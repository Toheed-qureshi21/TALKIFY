import React from 'react'

export const UserSkeletons = ({length}) => {
  return (
    <div className="overflow-y-auto w-full py-4">
              {    [...Array(length||8)].map((_, index) => (
            <div key={index} className="w-full p-2 flex items-center gap-2 animate-pulse  rounded-lg">
                <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-zinc-700"></div>
                    <span className="absolute bottom-0 right-0 size-3 bg-zinc-600 rounded-full ring-2 ring-zinc-900"></span>
                </div>
                <div className="text-left min-w-0 w-full">
                    <div className="h-4 bg-zinc-700 rounded w-3/4 mb-1"></div>
                    <div className="h-3 bg-zinc-700 rounded w-1/2"></div>
                </div>
            </div>
        ))}
            </div>
  )
}

