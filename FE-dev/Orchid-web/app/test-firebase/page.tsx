// // components/AuctionPage.tsx

// 'use client'
// import { useState, useEffect } from 'react'
// import { ref, onValue, off, update, push, child } from 'firebase/database'
// import { rtdb } from '@/firebase/firebase'

// interface Bid {
//   biddingPrice: number
//   timestamp: number
// }

// const AuctionPage = () => {
//   const [auctionData, setAuctionData] = useState<any>(null)
//   const [newBidPrice, setNewBidPrice] = useState('')

//   useEffect(() => {
//     const auctionRef = ref(rtdb, `auctions/68`)
//     onValue(auctionRef, (snapshot) => {
//       setAuctionData(snapshot.val())
//     })

//     return () => {
//       off(auctionRef, 'value')
//     }
//   }, [])

//   console.log(auctionData)

//   const placeBid = () => {
//     const auctionRef = ref(rtdb, `auctions/68`)
//     const newBid: Bid = {
//       biddingPrice: parseInt(newBidPrice, 10),
//       timestamp: Date.now(),
//     }

//     push(child(auctionRef, 'bidList'), newBid)
//     update(auctionRef, {
//       biddingPrice: newBidPrice,
//     })

//     setNewBidPrice('')
//   }

//   return (
//     <div>
//       {auctionData ? (
//         <div>
//           <h2>{auctionData.productName}</h2>
//           <p>{auctionData.description}</p>
//           <p>Giá đấu giá cao nhất: {auctionData.biddingPrice}</p>
//           <input
//             type="number"
//             value={newBidPrice}
//             onChange={(e) => setNewBidPrice(e.target.value)}
//           />
//           <button onClick={placeBid}>Đấu giá</button>
//           <h3>Lịch sử đấu giá</h3>
//           <ul>
//             {auctionData.bidList &&
//               auctionData.bidList.map((bid: Bid) => (
//                 <li key={bid.timestamp}>
//                   Giá: {bid.biddingPrice}
//                 </li>
//               ))}
//           </ul>
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   )
// }

// export default AuctionPage



'use client'
// components/AuctionPage.tsx
import { useState, useEffect } from 'react'
import { doc, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore'
import { db } from '@/firebase/firebase'
import { IAuction } from '@/types/dashboard'

interface Bid {
  biddingPrice: number
  timestamp: number
}

const AuctionPage = () => {
  const [auctionData, setAuctionData] = useState<IAuction| null>(null)
  const [newBidPrice, setNewBidPrice] = useState('')

  //add 
  useEffect(() => {
    const auctionRef = doc(db, 'auctions', '1')
    const unsubscribe = onSnapshot(auctionRef, (snapshot) => {
      setAuctionData(snapshot.data() as IAuction)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const placeBid = async () => {
    const auctionRef = doc(db, 'auctions', '1')
    const newBid: Bid = {
      biddingPrice: parseInt(newBidPrice, 10),
      timestamp: Date.now(),
    }

    try {
      await updateDoc(auctionRef, {
        biddingPrice: newBidPrice,
        bidList: arrayUnion(newBid),
      })
      setNewBidPrice('')
    } catch (error) {
      console.error('Error placing bid:', error)
    }
  }

  return (
    <div>
      {auctionData ? (
        <div>
          <h2>{auctionData.productName}</h2>
          <p>{auctionData.description}</p>
          <p>Giá đấu giá cao nhất: {auctionData.biddingPrice}</p>
          <input
            type="number"
            value={newBidPrice}
            onChange={(e) => setNewBidPrice(e.target.value)}
          />
          <button onClick={placeBid}>Đấu giá</button>
          <h3>Lịch sử đấu giá</h3>
          <ul>
            {auctionData.bidList &&
              auctionData.bidList.map((bid: any) => (
                <li key={bid.timestamp}>
                  Giá: {bid.biddingPrice}
                </li>
              ))}
          </ul>
          <p>{auctionData.productID}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default AuctionPage