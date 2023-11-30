import React from 'react'
import {Box} from '@chakra-ui/react'
import PetDisplay from '../components/PetDisplay'
import FunctionalTopbar from '../components/FunctionalTopbar'

export default function PetPage() {
  return (
    <FunctionalTopbar
        content = {
        <Box w={"100vw"} overflow={"hidden"} display={"flex"} justifyContent={"flex-start"} flexDirection={"column"} alignItems={"center"}>
             <PetDisplay />
        </Box>
        
    }
    />
  )
}
