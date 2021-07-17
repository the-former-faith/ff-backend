import React from 'react' 
import { Card, Flex, Box, Avatar, Text } from '@sanity/ui'

const Option = (props) => {
    return (
        <Card as="button">
        <Flex align="center">
            <Box paddingLeft={3} paddingY={2}>
            <Avatar
                size={[0, 0, 1]}
                src={props.option.payload.imageUrl}
            />
            </Box>
            <Box flex={1} padding={3}>
                <Text size={[2, 2, 3]}>
                    {props.option.payload.name}
                </Text>
                <Text size={[1, 1, 2]}>
                    {props.option.payload.description}
                </Text>
            </Box>
        </Flex>
        </Card>
    )
}

export default Option