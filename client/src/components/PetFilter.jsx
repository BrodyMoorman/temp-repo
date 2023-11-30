import { VStack } from '@chakra-ui/react'
import React from 'react'
import { InputGroup, Input, InputRightElement, Button, Text, Flex, Tag, TagLabel, TagCloseButton, SimpleGrid, Slider, SliderMark, SliderTrack, SliderFilledTrack, SliderThumb } from "@chakra-ui/react"
import { Search2Icon } from '@chakra-ui/icons'
import FilterSelector from './FilterSelector'
import { useState } from 'react'

export default function PetFilter(props) {
    const addName = () => {
        console.log("Adding Name")
    }
    
    const [selected, setSelected] = useState([])
    const [sliderValue, setSliderValue] = useState(500)
    const [name, setName] = useState("")
    const [query, setQuery] = useState({
        animal : [],
        gender: [],
        age: [],
        fee: [],
        search: ""
    })
    const labelStyles = {
        mt: '2',
        ml: '-2.5',
        fontSize: 'sm',
      }
    

    const clearSelected = () => {
        setSelected([])
    }

    const isSelected = (option) => {
        return selected.includes(option)
    }

    const setAnimalCallback = (option) => {
        if(query.animal.includes(option)) {
            setQuery({...query, animal: query.animal.filter((item) => item !== option)})
        }else {
        setQuery({...query, animal: [...query.animal, option]})
        }
    }

    const setGenderCallback = (option) => {
        if(query.gender.includes(option)) {
            setQuery({...query, gender: query.gender.filter((item) => item !== option)})
        }else {
        setQuery({...query, gender: [...query.gender, option]})
        }

    }

    const setAgeCallback = (option) => {
        if(query.age.includes(option)) {
            setQuery({...query, age: query.age.filter((item) => item !== option)})
        } else {
            setQuery({...query, age: [...query.age, option]})
        }
        
            
    }

    const setFeeCallback = (option) => {
        if(query.fee.includes(option)) {
            setQuery({...query, fee: query.fee.filter((item) => item !== option)})
        } else {
        setQuery({...query, fee: [...query.fee, option]})
        }
    }

    const handleSearch = () => {
        let request = {

                animal: query.animal.map((item) => item.name),
                gender: query.gender.map((item) => item.name),
                age: query.age.map((item) => item.name),
                search: name,
                fee: sliderValue

        }
        props.callback(request)
    }
    const handleNameChange = (e) => {
        setName(e.target.value)
    }
        

  return (
    <VStack p={6} alignItems={"flex-start"} shadow={'2xl'} borderRadius={"2xl"} bg={"white"} h={"fit-content"} >
        <Text fontSize={"2xl"} fontWeight={"semibold"} pb={2}>Filters</Text>
        <Flex maxW="270px" flexWrap={"wrap"}>
        {selected.map((option) => {
            return <Tag size={"md"} key={option.id} m={"2px"} borderRadius={"full"} variant="solid" colorScheme="purple" >
                <TagLabel>{option.name}</TagLabel>
                <TagCloseButton onClick={()=>callback(option)} />
            </Tag>
        })}
        </Flex>

        <Text fontWeight={"semibold"}>Name:</Text>
        <InputGroup size='md'>
            <Input
                pr='4.5rem'
                type={'text'}
                onChange={handleNameChange}
                placeholder='Search'
            />
            
        </InputGroup>
        <Text fontWeight={"semibold"}>Animal:</Text>
        <FilterSelector callback={setAnimalCallback} category="animal" />
        <Text fontWeight={"semibold"}>Gender:</Text>
        <FilterSelector callback={setGenderCallback} category="gender" />
        <Text fontWeight={"semibold"}>Age:</Text>
        <FilterSelector callback={setAgeCallback} category="age" />
        <Text fontWeight={"semibold"}>Adoption Fee:</Text>
        <Slider aria-label='slider-ex-6' defaultValue={500} onChange={(val) => setSliderValue(val)} max={500} mt={6}>
        <SliderMark value={500} {...labelStyles}>
          $500
        </SliderMark>
        <SliderMark value={250} {...labelStyles}>
          $250
        </SliderMark>
        <SliderMark value={0} {...labelStyles}>
          Free
        </SliderMark>
        <SliderMark
          value={sliderValue}
          textAlign='center'
          bg='purple.400'
          color='white'
          mt='-10'
          ml='-5'
          w='12'
        >
          ${sliderValue}
        </SliderMark>
        <SliderTrack>
          <SliderFilledTrack bg={"purple.400"} />
        </SliderTrack>
        <SliderThumb />
      </Slider>
        <Button colorScheme='purple' w={"full"} mt={4} onClick={handleSearch}>Apply Filter</Button>
    </VStack>
  )
}
