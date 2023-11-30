import { Card, CardBody, CardHeader, Text } from '@chakra-ui/react'
import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import ApplicationCard from './ApplicationCard'

export default function ListingWithApplications(props) {
    
  return (
    <Card w={"500px"}>
        <CardHeader>
            <Text fontSize={"2xl"}>{props.name}</Text>
        </CardHeader>
        <CardBody>
            <Text>Applications: {props.applications.length}</Text>
            {props.applications.map((application, i) => (
                <ApplicationCard id={application} key={i} />
            ))}
        </CardBody>


    </Card>
  )
}
