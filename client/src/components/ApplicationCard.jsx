import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, Text, HStack } from '@chakra-ui/react'


export default function ApplicationCard(props) {

    const id = props.id
    const [application, setApplication] = useState({})
    const axiosInstance = axios.create({baseURL: process.env.REACT_APP_API_URL});

    useEffect(() => {
        getApplication()
    }, [])

    const getApplication = async () => {
        try {
            const {data} = await axiosInstance.get("/application/" + id)
            setApplication(data)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <Card p="2" bg={'purple.200'} maxH={"200px"} overflowY={"auto"}>
        <HStack><Text>Email:</Text> <Text fontWeight={"semibold"}>{application.contact_email}</Text></HStack>
        <HStack><Text>Phone:</Text><Text fontWeight={"semibold"}> {application.contact_phone}</Text></HStack>
        <Text>Message:</Text>
        <Text fontWeight={"semibold"}>{application.message}</Text>
    </Card>
  )
}
