import React from 'react'
import {Box, SimpleGrid, Text} from '@chakra-ui/react'
import { useState } from 'react'
import FunctionalTopbar from '../components/FunctionalTopbar'
import PetGrid from '../components/PetGrid'

export default function Dashboard() {
  



  return (
    <FunctionalTopbar content = {
      <Box w={"full"} overflow={"hidden"} minH={"95vh"} display={"flex"} justifyContent={"flex-start"} flexDirection={"column"} alignItems={"center"}>
      <PetGrid />
      </Box>
    } />
    
  )
}
