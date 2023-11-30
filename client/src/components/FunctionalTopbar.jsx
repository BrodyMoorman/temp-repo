import React, { useState } from 'react';
import {
    Box,
    Flex,
    Avatar,
    HStack,
    Text,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    Image,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,

  } from '@chakra-ui/react'
  import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
  import { useSignOut } from 'react-auth-kit'
  import { useAuthUser } from 'react-auth-kit'
  import logo from '../assets/PBDLogoDark.png'
  import NewListingForm from './NewListingForm'
  
  

  const Links = [{name:'Home', link:"/home"}, {name:'My Listings', link:"/mylistings"}]
  
  const NavLink = (props) => {
    const { children } = props
  
    return (
      <Box
        as="a"
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
          textDecoration: 'none',
          bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        href={children.link}>
        {children.name}
      </Box>
    )
  }
  
  export default function FunctionalTopbar(props) {
    const signOut = useSignOut()
    const auth = useAuthUser();

    

    const [ishamOpen, setIsHamOpen] = useState(false);

    const onhamClose = () => setIsHamOpen(false);
    const onhamOpen = () => setIsHamOpen(true);

    const [isOpen, setIsOpen] = useState(false);
  
    const onClose = () => setIsOpen(false);
    const onOpen = () => setIsOpen(true);

    const handleLogout = () => {
      signOut()
    }
  
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay/>
          <ModalContent>
            <ModalHeader>Add New Listing</ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
              <NewListingForm close={onClose}/>
            </ModalBody>
          </ModalContent>
        </Modal>
{/*
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost">Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
  */}
        <Box bg={useColorModeValue('white', 'gray.900')} pr={4} w={["100vw","100vw"]} overflow={"hidden"}>
          <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <IconButton
              size={'md'}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={'Open Menu'}
              display={{ md: 'none' }}
              onClick={ishamOpen ? onhamClose : onhamOpen}
            />
            <HStack spacing={8} alignItems={'center'}>
              <Box><Image src={logo} h={16}></Image></Box>
              <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                {Links.map((link) => (
                  <NavLink key={link}>{link}</NavLink>
                ))}
                <Box
                  as="a"
                  px={2}
                  py={1}
                  rounded={'md'}
                  _hover={{
                    textDecoration: 'none',
                    bg: useColorModeValue('gray.200', 'gray.700'),
                  }}
                  cursor={'pointer'}
                  onClick={onOpen}>
                  Add Listing
                </Box>
              </HStack>
            </HStack>
            <Flex alignItems={'center'}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}
                  p={1}
                  display={"flex"}
                  alignItems={'center'}
                  >

                  
                  {auth().first_name + " " + auth().last_name}
                </MenuButton>
                <MenuList>
                  <MenuItem>Link 1</MenuItem>
                  <MenuItem>Link 2</MenuItem>
                  <MenuDivider />
                  <MenuItem color={"red.300"}onClick={handleLogout} >Log Out</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>
  
          {ishamOpen ? (
            <Box pb={4} display={{ md: 'none' }}>
              <Stack as={'nav'} spacing={4}>
                {Links.map((link) => (
                  <NavLink key={link.name}>{link}</NavLink>
                ))}
              </Stack>
              <Box pt={4} pl={2}  fontWeight="semibold" onClick={onOpen}>New Listing</Box>
            </Box>
          ) : null}
        </Box>
  
        <Box p={4} bg={"gray.100"} >{props.content}</Box>
      </>
    )
  }