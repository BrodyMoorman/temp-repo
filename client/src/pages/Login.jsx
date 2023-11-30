import { Box, HStack, Center, Text, VStack, Link, Image } from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink} from '@chakra-ui/react'
import React from 'react'
import logInImage from '../assets/logInImage.jpg'
import LoginForm from '../components/LoginForm'
import logo from '../assets/PBDLogo.png'

export default function Login() {
  return (
    <Center w={"100vw"} h="100vh" bg={"#D7C0D0"}  >
        <VStack>
            <Image src={logo}/>
            <HStack w={["100vw","1200px"]} h={["full","650px"]} gap={0} borderRadius={["none","2xl"]} shadow={["none","2xl"]} flexDirection={["column", 'row']}>
                <Center w={["full","50%"]} h={["auto","full"]} bg="blue" backgroundImage={logInImage} backgroundPosition={"center"} backgroundSize={"cover"}  borderLeftRadius={"inherit"} display={["none","flex"]}>
                    <Center w={'full'} h={"full"} bg={"rgb(0,0,0,0.45)"} borderLeftRadius={"inherit"} flexDirection={"column"}>
                    <Text color={'white'} fontSize={["6xl","8xl"]} fontWeight={'bold'} textAlign={"center"} lineHeight={["60px","80px"]} >Welcome Back!</Text>
                    <Text fontSize={"lg"} color={'white'} textAlign={"center"} w={"80%"} pt={4}>Hope you're having a good day! Log back in to see what new pets are available for adoption in your area.</Text>
                    <HStack color={"white"} pt={4} pb={1}><Text>Don't have an account?</Text><ChakraLink as={ReactRouterLink} to='/register'>Sign Up</ChakraLink></HStack>
                    </Center>
                </Center>
                <Center w={["full","50%"]} h={"full"} bg={["none","white"]} p={4} borderRightRadius={"inherit"} alignItems={"center"} flexDirection={"column"}>
                    <LoginForm name="kevin" />
                    <HStack mt={1} display={["flex", "none"]}><Text>Don't have an account?</Text><ChakraLink as={ReactRouterLink} to='/register'>Sign Up</ChakraLink></HStack>
                </Center>
                
            </HStack>
        </VStack>

    </Center>
  )
}
