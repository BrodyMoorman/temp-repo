import { VStack, Text, FormControl, FormLabel, FormHelperText, FormErrorMessage, Input, HStack, Button, useToast } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useSignIn, useAuthUser } from 'react-auth-kit'
import { useNavigate } from 'react-router-dom'



export default function LoginForm(props) {
    const axiosInstance = axios.create({baseURL: process.env.REACT_APP_API_URL});
    const toast = useToast()
    const navigate = useNavigate()
    const [isErrorEmail, setIsErrorEmail] = useState(false)
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    })
    const signIn = useSignIn()
    const handleInputChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    const loginUser = async (e) => {
        e.preventDefault();
        const {email, password} = inputs;
        try {
            const {data} = await axiosInstance.post('/login', {
                email: email,
                password: password,
            })
            if (data.error) {
                toast({
                    title: 'Login Error!',
                    description: data.error,
                    position: 'top',
                    status: 'error',
                    duration: 1500,
                    isClosable: false,
                  })
            } else {
                signIn({
                    token: data.token,
                    expiresIn: 3600,
                    tokenType: 'Bearer',
                    authState: data.user,
                  });
                  toast({
                    title: 'Login Successful!',
                    description: "Redirecting...",
                    position: 'top',
                    status: 'success',
                    duration: 750,
                    isClosable: false,
                  })
                setTimeout(() => {
                    navigate('/home')
                }, 775
                    )
                
            }
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <VStack w={"75%"} justifyContent={"center"} alignItems={"center"}>
        <Text fontSize={"3xl"} fontWeight={"semibold"} mb={6}>Log In</Text>
        <FormControl isInvalid={isErrorEmail}>
            <FormLabel>Email</FormLabel>
            <Input type='email' name='email' placeholder='john@example.com' value={inputs.email} onChange={handleInputChange} />
            {isErrorEmail && <FormErrorMessage>Email is required.</FormErrorMessage>}
        </FormControl>
        <FormControl isInvalid={isErrorEmail}>
            <FormLabel>Password</FormLabel>
            <Input type='password' name='password' placeholder='password' value={inputs.password} onChange={handleInputChange} />
        </FormControl>
        <Button colorScheme='purple' w={"full"} mt={4} onClick={loginUser}>Log In</Button>
    </VStack>
  )
}
