import React from 'react'
import { Heading, Card, CardBody, HStack, Image, Stack, Text, Divider, CardFooter, Button, ButtonGroup, } from '@chakra-ui/react'
import { useState } from 'react'

export default function PetCard(props) {

    const handleClick = () => {
        window.location.href= `/pets/${props.id}`
    }

    return (
    // props.petImage, props.desc, props.species, props.cost, props.name, props.id id = 
        <Card maxW='xs' onClick={handleClick} cursor= "pointer" h={"400px"} >
    <CardBody shadow= "md" _hover={{shadow:"2xl"}} transition={".3s"}>
        <Image 
        src={`/uploads/${props.image}`}
        alt={props.desc}
        borderRadius='lg'
        h={"200px"}
        />
        <Stack mt='6' spacing='3'>
        <Heading size='md'>{props.name}</Heading>
        <HStack>
            <Text>{props.breed}</Text>
            <Text>|</Text>
            <Text>{props.age}</Text>
        </HStack>
        <Text color='blue.600' fontSize='2xl'>
            {
            (props.cost > 0 ) ? 
            <Text color='purple.500' fontSize='2xl'> ${props.cost} </Text> 
            : <Text color='purple.500' fontSize='2xl'> FREE </Text>
            }
        </Text>
        </Stack>
    </CardBody>
    </Card>

  )
}
