import React from 'react'
import {Box, Flex, VStack, HStack, Text, Button, Divider
, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
useDisclosure, FormControl, FormLabel, Input, Textarea, useToast
} from '@chakra-ui/react'
import Carousel from './Carousel'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuthUser } from 'react-auth-kit'
import axios from 'axios'


export default function PetDisplay() {
    const auth = useAuthUser()
    const axiosInstance = axios.create({baseURL: process.env.REACT_APP_API_URL});

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [inputs, setInputs] = useState({
        contact_email: "",
        contact_phone: "",
        message: ""
    })

    const handleChange = (e) => {
        setInputs({
            ...inputs, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const query = inputs;
        query.listing_id = id
        query.user_id = auth()._id
        axiosInstance.post('http://localhost:8000/application/new', query)
            .then(res => {
                console.log(res.data)
                onClose()
            })
            .catch(err => console.log(err))
    }

    const {id} = useParams()
    console.log(id)
    const [pet, setPet] = React.useState({})
    const [images, setImages] = React.useState([])
    React.useEffect(() => {
        axiosInstance.get(`http://localhost:8000/listing/${id}`)
            .then(res => {
                setPet(res.data)
                setImages(res.data.image_url)
            })
            .catch(err => console.log(err))
    }, [id])

    
  return (
    <Flex w={"full"} justifyContent={"center"} overflowX={"hidden"} >
        <VStack w={"900px"} p={6} borderRadius={"xl"} shadow={"2xl"} bg={"white"}>
      
            <VStack gap={0} alignItems={"center"}>
                <Text fontSize={"4xl"}>{pet.pet_name}</Text>
                <Text>Zip Code: {pet.zip_code}</Text>
            </VStack>

        {images.length > 0 &&<Carousel images={images} />}
        <Text fontSize={"4xl"} fontWeight={"semibold"}>About</Text>
        <Divider  w={"50%"}/>
        <HStack flexDirection={["column", "row"]}>
            <VStack w={"250px"} p={2} >
                <HStack justifyContent={"space-between"} w={"full"}>
                    <Text fontWeight={"semibold"}>Species:</Text>
                    <Text>{pet.pet_species}</Text>
                </HStack>
                <Divider />
                <HStack justifyContent={"space-between"} w={"full"}>
                    <Text fontWeight={"semibold"}>Breed:</Text>
                    <Text>{pet.pet_breed}</Text>
                </HStack>
                <Divider />
                <HStack justifyContent={"space-between"} w={"full"}>
                    <Text fontWeight={"semibold"}>Age:</Text>
                    <Text>{pet.pet_birthday}</Text>
                </HStack>
                <Divider />

            </VStack>
            <Divider orientation="vertical" h={"80%"} />
            <VStack w={"250px"} p={2} >
            <HStack justifyContent={"space-between"} w={"full"}>
                    <Text fontWeight={"semibold"}>Color:</Text>
                    <Text>{pet.pet_color}</Text>
                </HStack>
                <Divider />
                <HStack justifyContent={"space-between"}  w={"full"}>
                    <Text fontWeight={"semibold"}>Vacinated:</Text>
                    <Text>{pet.vaccinated ? "Yes" : "No"}</Text>
                </HStack>
                <Divider />
                <HStack justifyContent={"space-between"} w={"full"}>
                    <Text fontWeight={"semibold"}>Adoption Fee:</Text>
                    <Text>${pet.adoption_fee}</Text>
                </HStack>
                <Divider />                
            </VStack>
        </HStack>
        <Text fontSize={"4xl"} fontWeight={"semibold"}>Description</Text>
        <Divider  w={"50%"}/>
        <Text w={"60%"} textAlign={"center"}>{pet.pet_description} </Text>
        <Text fontSize={"4xl"} fontWeight={"semibold"}>Contact</Text>
        <Divider  w={"50%"}/>
        <VStack>
            <HStack>
                <Text fontWeight={"semibold"}>Email:</Text>
                <Text> {pet.owner_email} </Text>
            </HStack>
            <Divider />
            <HStack>
                <Text fontWeight={"semibold"}>Phone:</Text>
                <Text> {pet.owner_phone} </Text>
            </HStack>

        </VStack>
        <Button colorScheme='purple' onClick={onOpen}>Apply Now!</Button>
        </VStack>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Apply for {pet.pet_name}!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack w={"full"}>
            <FormControl>
                <FormLabel>Contact Email</FormLabel>
                <Input name="contact_email" onChange={handleChange}/>
            </FormControl>
            <FormControl>
                <FormLabel>Contact Phone</FormLabel>
                <Input type='tel' name="contact_phone" onChange={handleChange}/>
            </FormControl>
            <FormControl>
                <FormLabel>Message</FormLabel>
                <Textarea name="message" onChange={handleChange}/>
            </FormControl>
            <Button colorScheme='purple' w={"full"} onClick={handleSubmit}>Submit</Button>
            </VStack>
          </ModalBody>

         
        </ModalContent>
      </Modal>
         
    </Flex>
  )
}
