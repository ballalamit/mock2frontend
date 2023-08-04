import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Center, Heading, Stat } from '@chakra-ui/react'
import MainDashboard from './MainDashboard'
import Stats from './Stats'

function Dashboard() {
  return (
    <div>
        <Heading>Admin Dashboard</Heading>
        <br />
        <Center>
        <Tabs variant='soft-rounded' colorScheme='green' >
            <TabList>
                <Tab width={"500px"}>Dashboard</Tab>
                <Tab width={"500px"}>Stats</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <MainDashboard />
                </TabPanel>
                <TabPanel>
                    <Stats />
                </TabPanel>
            </TabPanels>
            </Tabs>
            </Center>
    </div>
  )
}

export default Dashboard