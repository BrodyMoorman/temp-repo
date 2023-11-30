import { Flex, SimpleGrid, Text, Button } from '@chakra-ui/react'
import React from 'react'
import ListingWithApplications from './ListingWithApplications'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useAuthUser } from 'react-auth-kit'

export default function MyListings() {
    const [listings, setListings] = useState([])
    const auth = useAuthUser()
    const axiosInstance = axios.create({baseURL: process.env.REACT_APP_API_URL});


    const getUserListing = async () => {
        try {
            const {data} = await axiosInstance.get("/listings/user/" + auth()._id)
            setListings(data)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUserListing()
    }, [])


    
    
  return (
    <Flex gap={3} flexDir={"column"}>
        <Text fontSize={"4xl"}>My Listings</Text>
        <SimpleGrid columns={[1,3]} spacing={10}>
            {listings.map((listing, i) => (
                <ListingWithApplications name={listing.pet_name} applications={listing.applications} key={i} />
            ))}

        </SimpleGrid>
    </Flex>
  )
}
