import React from 'react';

import {Badge, Center, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text} from '@chakra-ui/react';
import {MagnifyingGlassIcon} from '@heroicons/react/24/outline';

import WithAuth from '../../hoc/WithAuth';
import {getFriends, getReceivedFriendRequests, getSentFriendRequests} from '../../queries/people';

import FindFriends from './FindFriends';
import {FriendshipRequestsLists} from './FriendshipRequestsLists';
import {FriendsList} from './FriendsList';

const CustomTab = ({ children, ...props }) => (
    <Tab {...props} display={'flex'} gap={'10px'} color={'whiteAlpha.500'} fontSize={'14px'}
         _selected={{ fontWeight: 'semibold', color: 'white', bg: 'whiteAlpha.200' }}>
        {children}
    </Tab>
);

const Friends = () => {

    const { data: receivedFriendRequests } = getReceivedFriendRequests();
    const { data: sentFriendRequests } = getSentFriendRequests();
    const { data: friendsResponse } = getFriends();

    if (!receivedFriendRequests || !sentFriendRequests || !friendsResponse) {
        return <Center h={'100%'}><Text>{'Loading...'}</Text></Center>;
    }

    return <Flex justify={'center'} w={'100%'} h={'100%'}>
        <Tabs w={'100%'} h={'100vh'} variant={'unstyled'} defaultIndex={2} isLazy={true}>
            <TabList p={3} gap={'15px'} bg={'rgba(255,255,255,0.03)'}>
                <CustomTab>
                    <Text>{'Friends'}</Text>
                    <Badge bg={'rgba(255,255,255,0.13)'} h={'18px'} color={'white'} fontSize={'12px'} pl={2}
                           pr={2}
                           lineHeight={'18px'}>{friendsResponse?.length}</Badge>
                </CustomTab>
                <CustomTab>
                    <MagnifyingGlassIcon width={'15px'} height={'15px'}/>
                    <Text>{'Search'}</Text>
                </CustomTab>
                <CustomTab>
                    <Text>{'Requests'}</Text>
                    {receivedFriendRequests?.length > 0 && <Badge bg={'red'} h={'18px'} color={'white'}
                                                                  fontSize={'12px'} pl={2}
                                                                  pr={2}
                                                                  lineHeight={'18px'}>{receivedFriendRequests.length}</Badge>}

                </CustomTab>
            </TabList>

            <TabPanels>
                <TabPanel p={0} h={'100vh'}>
                    <FriendsList/>
                </TabPanel>
                <TabPanel p={0} h={'100vh'}>
                    <Center w={'100%'} h={'100vh'} p={3}>
                        <FindFriends/>
                    </Center>
                </TabPanel>
                <TabPanel p={0} h={'100vh'}>
                    <FriendshipRequestsLists
                        receivedRequestsTitleFunc={(count: number) => `Received friend requests - ${count}`}
                        sentRequestsTitleFunc={(count: number) => `Sent friend requests - ${count}`}
                        receivedRequests={receivedFriendRequests}
                        sentRequests={sentFriendRequests}/>
                </TabPanel>
            </TabPanels>
        </Tabs>
    </Flex>;
};

export default WithAuth(Friends, {
    redirectToHomeOnAutologin: false,
    redirectToLoginPageOnUnauthenticated: true
}) as React.FC;
