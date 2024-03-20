import { IAuction } from '@/types/dashboard'
import React from 'react'

interface BiddingHistoryProps {
    auction: IAuction
}

const BiddingHistory = ({auction}: BiddingHistoryProps) => {
  return (
    <div>
    <h2 className="text-lg font-bold mb-2">
      Top 3 People Bidding
    </h2>
    <ul>
      {auction.bidList.sort((a,b) => b.ratings - a.ratings).slice(0, 3).map((bidder, index) => (
        <li
          key={index}
          className={`flex items-center bg-white border-2 shadow-md rounded-md p-4 mb-4 space-y-3 ${
            bidder.top1 ? "border-2 border-yellow-500" : ""
          }`}
        >
          <div className="relative">
            {bidder.top1 && (
              <div className="absolute top-0 left-0 w-8 h-8  text-2xl  flex items-center justify-center text-gray-700 font-bold">
                👑
              </div>
            )}
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-bold mr-4">
              {bidder.top1 ? "" : index + 1}
            </div>
          </div>
          <div className="flex-grow flex justify-between">
            <div className="flex flex-col">
              <span className="font-semibold">
                User Name: {bidder.userName}
              </span>
              <span className="text-gray-600">
                Ratings: {bidder.ratings}
              </span>
            </div>
            <span className="text-gray-600 flex items-center">
              Bidding Price: {bidder.biddingPrice}
            </span>
          </div>
        </li>
      ))}
    </ul>
  </div>
  )
}

export default BiddingHistory
