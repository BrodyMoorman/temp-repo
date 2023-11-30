import { Flex, Text, Menu, MenuButton, MenuList, MenuItem, Button, Tag, TagLabel,TagCloseButton } from '@chakra-ui/react'
import React from 'react'
import { useState, useEffect  } from 'react'
import { ChevronDownIcon, CloseIcon, AddIcon } from '@chakra-ui/icons'

export default function FilterSelector(props) {
    const [selected, setSelected] = useState([])
    const [options, setOptions] = useState([{name: "Dog", id: 1}, {name: "Cat", id: 2}, {name: "Bird", id: 3}, {name: "Fish", id: 4}, {name: "Reptile", id: 5}, {name: "Other", id: 6}])
    const isSelected = (option) => {
        return selected.includes(option)
    }
    const handleClick = (option) => {
        if (isSelected(option)) {
            setSelected(selected.filter((item) => item !== option))
            
            
        } else {
            setSelected([...selected, option])
        }
        props.callback(option)
    }
    useEffect(() => {
    switch (props.category) {
        case "animal":
            setOptions([{name: "Dog", id: 1}, {name: "Cat", id: 2}, {name: "Bird", id: 3}, {name: "Fish", id: 4}, {name: "Reptile", id: 5}, {name: "Other", id: 6}])
            break;
        case "gender":
            setOptions([{name: "Male", id: 7}, {name: "Female", id: 8}])
            break;
        case "age":
            setOptions([{name: "Baby", id: 9}, {name: "Young", id: 10}, {name: "Adult", id: 11}, {name: "Senior", id: 12}])
            break;
        case "fee":
            setOptions([{name: "Free", id: 13}, {name: "$0 - $50", id: 14}, {name: "$50 - $100", id: 15}, {name: "$100 - $200", id: 16}, {name: "$200+", id: 17}])
            break;
        default:
            break;
    }
    }
    , ["props.category"])

  return (
    <>
    <Menu closeOnSelect={false}>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon fontSize={"xl"} />}  h={"2.5rem"} w={"full"} px={4}  bg="white" border={"1px"} borderColor={"gray.200"} borderRadius={"md"} >
        {(selected.length > 0) ? <Text> {selected.length}  Selected</Text> : <Text color={"gray.500"}>Any</Text>}
        
        </MenuButton>
        <MenuList >
            {options.map((option) => {
                return <MenuItem bg={(isSelected(option)) ? "purple.400": "white"}   key={option.id} onClick={()=>handleClick(option)} justifyContent={"space-between"}>
                    {option.name}
                    {(isSelected(option)) ?<CloseIcon color={"white"} fontSize={"sm"} /> : <AddIcon color={"gray.500"}  fontSize={"sm"} /> }
                    
                    </MenuItem>
            })}

        </MenuList>
    </Menu>
            <Flex maxW="270px" flexWrap={"wrap"}>
            {selected.map((option) => {
                return <Tag size={"md"} key={option.id} m={"2px"} borderRadius={"full"} variant="solid" colorScheme="purple" >
                    <TagLabel>{option.name}</TagLabel>
                    <TagCloseButton onClick={()=>handleClick(option)} />
                </Tag>
            })}
            </Flex>
        </>
  )
}
