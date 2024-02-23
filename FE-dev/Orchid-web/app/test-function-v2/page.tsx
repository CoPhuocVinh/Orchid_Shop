
'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const TESTFUCNV2 = () => {

    const [data, setData] = useState<any | []>([])

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("http://128.199.185.211:8099/api/v1/products")

            setData(res.data)
        }


        fetchData()
    },[])
console.log(data)
  return (
    <div>TESTFUCNV2</div>
  )
}

export default TESTFUCNV2