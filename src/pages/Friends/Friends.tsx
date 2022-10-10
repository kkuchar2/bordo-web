import React from 'react';

import {Badge, Box, Center, Tab, TabList, TabPanel, TabPanels, Tabs, Text} from '@chakra-ui/react';
import {MagnifyingGlassIcon} from '@heroicons/react/24/outline';

import WithAuth from '../../hoc/WithAuth';
import {getFriends, getReceivedFriendRequests, getSentFriendRequests} from '../../queries/people';

import FindFriends from './FindFriends';
import {FriendshipRequestsLists} from './FriendshipRequestsLists';
import {FriendsList} from './FriendsList';

import { useTranslation } from 'react-i18next';

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

    const {t} = useTranslation();

    if (!receivedFriendRequests || !sentFriendRequests || !friendsResponse) {
        return null;
    }

    return <Box w={'100%'} h={'100%'}>
        <Tabs w={'100%'}
              h={'100%'}
              variant={'unstyled'}
              display={'flex'}
              flexDirection={'column'}
              defaultIndex={2}
              isLazy={true}>

            <TabList p={3} gap={'15px'} bg={'rgba(255,255,255,0.03)'}>
                <CustomTab>
                    <Text>{t('FRIENDS')}</Text>
                    <Badge bg={'rgba(255,255,255,0.13)'} h={'18px'} color={'white'} fontSize={'12px'} pl={2}
                           pr={2}
                           lineHeight={'18px'}>{friendsResponse?.length}</Badge>
                </CustomTab>
                <CustomTab>
                    <MagnifyingGlassIcon width={'15px'} height={'15px'}/>
                    <Text>{t('SEARCH')}</Text>
                </CustomTab>
                <CustomTab>
                    <Text>{t('FRIENDSHIP_REQUESTS')}</Text>
                    {receivedFriendRequests?.length > 0 && <Badge bg={'red'} h={'18px'} color={'white'}
                                                                  fontSize={'12px'} pl={2}
                                                                  pr={2}
                                                                  lineHeight={'18px'}>{receivedFriendRequests.length}</Badge>}

                </CustomTab>
            </TabList>

            <TabPanels flexGrow={1}>
                <TabPanel p={0} h={'100%'}>
                    <FriendsList/>
                </TabPanel>
                <TabPanel p={0} h={'100%'}>
                    <Center w={'100%'} h={'100%'} p={3}>
                        <FindFriends/>
                    </Center>
                </TabPanel>
                <TabPanel p={0} h={'100%'} overflow={'auto'}>
                    <FriendshipRequestsLists
                        receivedRequestsTitleFunc={(count: number) => `Received friend requests - ${count}`}
                        sentRequestsTitleFunc={(count: number) => `Sent friend requests - ${count}`}
                        receivedRequests={receivedFriendRequests}
                        sentRequests={sentFriendRequests}/>
                </TabPanel>
            </TabPanels>
        </Tabs>
    </Box>;
};

export default WithAuth(Friends, {
    redirectToHomeOnAutologin: false,
    redirectToLoginPageOnUnauthenticated: true
}) as React.FC;
