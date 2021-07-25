import React from 'react' 
import { Card, Flex, Stack, Text, Avatar } from '@sanity/ui'

const Option = (props) => {
    return (
        <Card as="button" padding={2}>
            <Flex align="center">
                <Avatar
                size={[0, 0, 1]}
                src={props.option.payload.imageUrl}
                />
                <Stack space={[1, 1, 2]} padding={2}>
                    <Text size={[2, 2, 3]}>
                        {props.option.payload.name}
                    </Text>
                    <Text size={[1, 1, 2]}>
                        {props.option.payload.description}
                    </Text>
                </Stack>
            </Flex>
        </Card>
    )
}

export default Option