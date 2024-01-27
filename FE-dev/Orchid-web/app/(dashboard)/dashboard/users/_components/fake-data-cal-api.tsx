import { Customer } from "./customer-column";
import { User } from "./staff-columns";
import axios from 'axios'


// test run server fake //
// npx json-server -w data/data.json -p 3001

export async function getData(): Promise<User[]> {
    
    return [
      {
        id: "1",
        name: "Vinh",
        location: "USSA",
        email: "vinh@example.com",
        role: "admin",
        spent: 500,
      },
      {
        id: "2",
        name: "Fuzzy",
        location: "USSA",
        email: "fuzzy@example.com",
        role: "staff",
        spent: 300,
      },
      {
        id: "3",
        name: "Alice",
        location: "Canada",
        email: "alice@example.com",
        role: "staff",
        spent: 250,
      },
      {
        id: "4",
        name: "Bob",
        location: "UK",
        email: "bob@example.com",
        role: "staff",
        spent: 200,
      },
      {
        id: "5",
        name: "Charlie",
        location: "Australia",
        email: "charlie@example.com",
        role: "staff",
        spent: 400,
      },
      {
        id: "6",
        name: "David",
        location: "Germany",
        email: "david@example.com",
        role: "staff",
        spent: 350,
      },
      {
        id: "7",
        name: "Eve",
        location: "France",
        email: "eve@example.com",
        role: "staff",
        spent: 150,
      },
      {
        id: "8",
        name: "Grace",
        location: "Italy",
        email: "grace@example.com",
        role: "staff",
        spent: 450,
      },
      {
        id: "9",
        name: "Henry",
        location: "Spain",
        email: "henry@example.com",
        role: "staff",
        spent: 270,
      },
      {
        id: "10",
        name: "Ivy",
        location: "China",
        email: "ivy@example.com",
        role: "staff",
        spent: 320,
      },
      {
        id: "11",
        name: "Jack",
        location: "Japan",
        email: "jack@example.com",
        role: "staff",
        spent: 380,
      },
      {
        id: "12",
        name: "Karen",
        location: "Brazil",
        email: "karen@example.com",
        role: "staff",
        spent: 280,
      }
    ];
  }
  
  export async function getDataCustomer(): Promise<Customer[]> {

    try {
      const res = await axios.get("http://localhost:3001/customer")
      const data = await res.data;

      console.log("test oke")
      return data as Customer[]
    } catch (error) {
      console.log(error)
      return []
    }
  }
  