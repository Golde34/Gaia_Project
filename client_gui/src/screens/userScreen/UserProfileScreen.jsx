import { Button, Card, Col, Flex, Grid, Subtitle, Text, Title } from "@tremor/react";

const UserProfileInfoScreen = (props) => {
    const user = props.user;
    return (
        <Card>
            <Flex>
                <Title>Your profile</Title>
            </Flex>
            <Grid className="mt-4" numItems={5}>
                <Col numColSpan={1}>
                    <Subtitle>Username</Subtitle>

                </Col>
                <Col numColSpan={4}>
                    <Text className="text-white text-md">{user.name}</Text>
                </Col>

                <Col numColSpan={1}>
                    <Subtitle>Email</Subtitle>
                </Col>
                <Col numColSpan={4}>
                    <Text className="text-white text-md">{user.email}</Text>
                </Col>

                <Col numColSpan={1}>
                    <Subtitle>Last Login</Subtitle>
                </Col>
                <Col numColSpan={4}>
                    <Text className="text-white text-md">{user.lastLogin}</Text>
                </Col>

                <Col numColSpan={1}>
                    <Subtitle>Is Using 2FA</Subtitle>
                </Col>
                <Col numColSpan={4}>
                    <Text className="text-white text-md">Coming soon</Text>
                </Col>

                <Col numColSpan={1}>
                    <Subtitle>Role</Subtitle>
                </Col>
                <Col numColSpan={4}>
                    <Text>{user.roles[0].name}</Text>
                </Col>

            </Grid>
            <div className="flex justify-end p-2 rounded-lg mb-4">
                <Button
                    className="flex justify-end"
                    variant="primary"
                    color="indigo"
                    onClick={() => {
                        navigate('/privilege-role-dashboard');
                    }}
                > Privilege And Role Dashboard</Button>
            </div>
        </Card>
    )
}

export default UserProfileInfoScreen;
