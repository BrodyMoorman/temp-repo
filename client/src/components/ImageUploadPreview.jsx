import { HStack, Image, Text, Button } from '@chakra-ui/react'
import React from 'react'
import { useState, useEffect } from 'react'
import { FaTrashAlt } from "react-icons/fa";

export default function ImageUploadPreview(props) {
    const image = props.image
    const [preview, setPreview] = useState(null)

    useEffect(() => {
        const objectUrl = URL.createObjectURL(image)
        setPreview(objectUrl)
        return () => URL.revokeObjectURL(objectUrl)
    }
    , [image])

    const handleDelete = () => {
        props.callback(image)
    }

  return (
    <HStack w={"full"} alignItems={"center"} p={2} borderRadius={"lg"} bg={"gray.200"} justifyContent={"space-between"} >
        <HStack>
        <Image src={preview} alt="preview" h={"40px"} />
        <Text w={"60%"} h={"20px"} noOfLines={1} textOverflow={"clip"}  >{image.name}</Text>
        </HStack>
        <Button colorScheme='red' p={0} size={"sm"}>
         <FaTrashAlt fontSize={"xl"} onClick={handleDelete}/>
        </Button>
        
    </HStack>
  )
}
