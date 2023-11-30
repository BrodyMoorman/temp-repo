import React from 'react'
import {Box} from '@chakra-ui/react'
import MyListings from '../components/MyListings'
import FunctionalTopbar from '../components/FunctionalTopbar'

export default function MyListingsPage() {
  return (
    <FunctionalTopbar content = {
        <Box w={"full"} overflow={"hidden"} minH={"95vh"} display={"flex"} justifyContent={"flex-start"} flexDirection={"column"} alignItems={"center"}>
        <MyListings />
        </Box>
      } />
  )
}
