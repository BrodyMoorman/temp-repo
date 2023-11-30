import { Center, Flex, Text, VStack, HStack, Button } from '@chakra-ui/react'
import React from 'react'
import heroBg from '../assets/herobg.jpg'
import Topbar from './Topbar'

export default function() {
  return (
    <VStack w="100vw" h="100vh" backgroundImage={heroBg} backgroundSize="cover">
        <VStack w="100vw" h="100vh" bg={"rgb(0,0,0,0.4)"} >
        <Topbar />
        <Center h={"90%"}>
            <VStack gap={0}>
                <Text fontWeight={"bold"} color={"#C86FC9"} fontSize={['4xl',"8xl"]} mb={[-2, -6]} pb={0}>Where Tails Begin.</Text>
                <Text  fontSize={["xl", "4xl"]} color={"white"} fontWeight={"semibold"}>Your New Best Friend Is a Click Away!</Text>
                <HStack mt={2}>
                    <Button colorScheme='purple'>Get Started</Button>
                    <Button variant={"outline"} colorScheme='white' color={'white'}>Learn More</Button>
                </HStack>
            </VStack>
            
        </Center>
        
        

        </VStack>
    </VStack>
  )
}
