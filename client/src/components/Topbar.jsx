import { Flex, Image, Box, Button, HStack } from '@chakra-ui/react'

import React from 'react'
import logo from '../assets/PBDLogo.png'

export default function Topbar() {

  return (
    <Flex w="100%" h="60px" justifyContent={"space-between"} pl={1} pr={[2,10]} >
        <Box  >
            <Image src={logo} h={"100%"} />
        </Box>

        <HStack>
            <Button variant={"outline"} color={"white"} _hover={{color:"black"}} onClick={()=>window.location.href = '/login'}>Login</Button>
            <Button colorScheme='purple' onClick={()=>window.location.href = '/register'}>Sign Up</Button>
        </HStack>
        

    </Flex>
  )
}
