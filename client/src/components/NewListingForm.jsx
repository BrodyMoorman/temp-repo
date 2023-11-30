import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    VStack,
    HStack,
    FormControl,
    FormLabel,
    Input,
    Switch,
    Select,
    InputGroup,
    InputLeftElement,
    Textarea,
    Button,

  } from '@chakra-ui/react'

  import { useState, useEffect } from 'react'
  import ImageUploadPreview from './ImageUploadPreview'
  import axios from 'axios'
  import { useAuthUser } from 'react-auth-kit'

export default function NewListingForm(props) {
  const auth = useAuthUser()
  const axiosInstance = axios.create({baseURL: process.env.REACT_APP_API_URL});

  const [values, setValues] = useState({
    owner_id: auth()._id,
    owner_email: '',
    owner_phone: '',
    pet_name: '',
    pet_species: '',
    gender:'',
    pet_breed: '',
    pet_color: '',
    pet_age: '',
    vaccinated: false,
    adoption_fee: 0,
    pet_description: '',
    images: [],
    zip_code: ''
  })
  const [images, setImages] = useState([])

  const handleChange = (e) => {
    if(e.target.files) {
      setImages(images.concat(e.target.files[0]))
      e.target.value = null
    }
    if(e.target.name === 'vaccinated') {
      setValues({ ...values, [e.target.name]: e.target.checked })
      return
    }
    if(e.target.name === 'adoption_fee') {
      setValues({ ...values, [e.target.name]: parseInt(e.target.value) })
      return
    }
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }
  const removeImage = (image) => {
    setImages(images.filter((img) => img !== image))
  }
  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const imageUrls = await Promise.all(images.map((image) => imageUpload(image)))
      let data = values;
      data.images = imageUrls
      setTimeout(() => {
        axiosInstance.post('/listing/new', data)
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
      }, 600)
      props.close()

    } catch (err) {
      console.log(err)
    }
    
    

  }

  const imageUpload = async (image) => {
    try {
    const formData = new FormData();
    formData.append('file', image)
    const res = await axios.post('/upload', formData)
    console.log(res.data)
    return res.data
    } catch (err) {
      console.log(err)
    }
  }

  

    
    return (
      <VStack>
        <FormControl isRequired>
          <FormLabel>Pet Name</FormLabel>
          <Input placeholder='Buddy' name='pet_name' onChange={handleChange}  />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Species</FormLabel>
          <Select placeholder='Select Species' name='pet_species' onChange={handleChange}>
            <option>dog</option>
            <option>cat</option>
            <option>bird</option>
            <option>fish</option>
            <option>reptile</option>
            <option>other</option>
          </Select>
        </FormControl>
        <HStack>
        <FormControl isRequired>
          <FormLabel>Breed</FormLabel>
          <Input placeholder='German Shepard' name='pet_breed' onChange={handleChange} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Color</FormLabel>
          <Input placeholder='Black' name='pet_color' onChange={handleChange} />
        </FormControl>
        </HStack>
        <HStack w={"full"}>
        <FormControl isRequired>
          <FormLabel>Gender</FormLabel>
          <Select placeholder='Select Gender' name='gender' onChange={handleChange}>
            <option>Male</option>
            <option>Female</option>
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Zip Code</FormLabel>
          <Input placeholder='11111' name='zip_code' onChange={handleChange} />
        </FormControl>
        </HStack>
        <HStack w={"full"}>
        <FormControl isRequired>
          <FormLabel>Age</FormLabel>
          <Select placeholder='Select Age' name='pet_age' onChange={handleChange}>
            <option>Baby</option>
            <option>Young</option>
            <option>Adult</option>
            <option>Senior</option>
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Updated Vaccinations</FormLabel>
          <Switch colorScheme='purple' size={"lg"} name='vaccinated' onChange={handleChange} />
        </FormControl>
        </HStack>
        <FormControl isRequired>
          <FormLabel>Adoption Fee</FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              color='gray.300'
              fontSize='1.2em'
              children='$'
            />
            <Input placeholder='Enter amount' type='number' name='adoption_fee' onChange={handleChange} />
          </InputGroup>
        </FormControl>
        <FormControl>
          <FormLabel>Phone</FormLabel>
          <Input type='text' name="owner_phone" onChange={handleChange} p={1} />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type='text' name='owner_email' onChange={handleChange} p={1} />
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea placeholder='Enter description' name='pet_description' onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Images</FormLabel>
          <Input type='file' accept="image/png, image/jpeg, image/jpg, image/webp" onChange={handleChange} p={1} />
        </FormControl>
        {images.map((image, index) => (
          <ImageUploadPreview key={index} image={image} callback={removeImage} />
        ))}
        <Button colorScheme='purple' size={"lg"} onClick={handleSubmit}>Create Listing</Button>
      </VStack>
    )
  }