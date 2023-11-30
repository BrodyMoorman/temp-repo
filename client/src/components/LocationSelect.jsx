import { VStack, FormControl, Input, FormLabel, Slider, SliderMark, SliderTrack, SliderFilledTrack, SliderThumb, Button } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'

export default function LocationSelect(props) {
    const labelStyles = {
        mt: '2',
        ml: '-2.5',
        fontSize: 'sm',
      }
      const [sliderValue, setSliderValue] = useState(props.distance)
      const [zipCode, setZipCode] = useState(props.zipCode)

      const handleInputChange = (e) => {
        setZipCode(e.target.value)
      }
      const handleSubmit = (e) => {
        e.preventDefault()
        props.callback(zipCode, sliderValue)

      }
  return (
    <VStack pb={8}>
        <FormControl>
            <FormLabel>Zip Code:</FormLabel>
            <Input type='text' value={zipCode} onChange={handleInputChange} />
        </FormControl>
        <FormControl>
            <FormLabel>Distance:</FormLabel>
            <Slider defaultValue={props.distance} aria-label='slider-ex-6' onChange={(val) => setSliderValue(val)} min={5} max={100} step={5}>
                
                <SliderMark value={25} {...labelStyles}>
                25mi
                </SliderMark>
                <SliderMark value={50} {...labelStyles}>
                50mi
                </SliderMark>
                <SliderMark value={75} {...labelStyles}>
                75mi
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
                {sliderValue}mi
                </SliderMark>
                <SliderTrack>
                <SliderFilledTrack bg={"purple.400"}  />
                </SliderTrack>
                <SliderThumb />
            </Slider>
        </FormControl>
        <Button colorScheme='purple' w={"full"} mt={4} onClick={handleSubmit}>Apply</Button>
    </VStack>
  )
}
