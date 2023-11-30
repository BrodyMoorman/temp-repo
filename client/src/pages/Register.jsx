import { Box, HStack, Center, Text, VStack, Link, Image } from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink} from '@chakra-ui/react'
import React from 'react'
import SignUpForm from '../components/SignUpForm'
import signUpImage from '../assets/signUpImage.jpg'
import logo from '../assets/PBDLogo.png'

export default function Register() {
  return (
    <Center w={"100vw"} h="100vh" bg={"#D7C0D0"} >
        <VStack>
            <Image src={logo}/>
            <HStack w={["100vw","1200px"]} h={["full","650px"]} gap={0} borderRadius={["none","2xl"]} shadow={["none","2xl"]} flexDirection={["column", 'row']}>
                <Center w={["full","50%"]} h={"full"} bg={["none","white"]} p={4} borderLeftRadius={"inherit"} flexDirection={"column"}>
                    <SignUpForm />
                    <HStack mt={1} display={["flex", "none"]}><Text>Already have an account?</Text><ChakraLink as={ReactRouterLink} to='/login'>Log In</ChakraLink></HStack>
                </Center>
                <Center w={"50%"} h={"full"} bg="blue" backgroundImage={signUpImage} backgroundPosition={"center"} backgroundSize={"110%"}  borderRightRadius={"inherit"} display={["none","flex"]}>
                    <Center w={'full'} h={"full"} bg={"rgb(0,0,0,0.45)"} borderRightRadius={"inherit"} flexDirection={"column"}>
                    <Text color={'white'} fontSize={"8xl"} fontWeight={'bold'} textAlign={"center"} lineHeight={"80px"} >Almost There!</Text>
                    <Text fontSize={"lg"} color={'white'} textAlign={"center"} w={"80%"} pt={4}>You're one step closer to bringing home the newest member of your family. Sign up to get access to adoption listings for furry friends in your area.</Text>
                    <HStack color={"white"} pt={4}><Text>Already have an account?</Text><ChakraLink as={ReactRouterLink} to='/login'>Log In</ChakraLink></HStack>
                    </Center>
                </Center>
            </HStack>
        </VStack>
    </Center>
  )
}
