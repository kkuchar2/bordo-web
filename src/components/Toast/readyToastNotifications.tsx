import React, {useRef} from 'react';

import {Flex, Text} from '@chakra-ui/react';
import {CheckIcon, XMarkIcon} from '@heroicons/react/24/solid';
import {ProfileAvatar} from 'components/chakra/Avatar/Avatar';
import {ButtonWithIcon} from 'components/chakra/ButtonWithIcon/ButtonWithIcon';
import toast from 'react-hot-toast';

import {getProfile} from '../../queries/people';

export const showFriendRequestReceived = (friendRequest: any) => {
    console.log(friendRequest);

    const from_user = friendRequest.from_user;
    toast((t) => {

        const { data: profile } = getProfile(from_user)({ staleTime: 1 });
        const audioPlayer = useRef(null);

        function playAudio() {
            audioPlayer.current.play();
        }

        return <Flex gap={'20px'} p={'10px'} align={'center'}>
            <ProfileAvatar profile={profile} width={'80px'} height={'80px'}/>
            <Flex direction={'column'} align={'flex-start'} gap={'5px'}>
                <Text fontSize={'md'} fontWeight={'semibold'} color={'white'}>
                    {'Incoming friend request'}
                </Text>
                <Text fontSize={'sm'} fontWeight={'medium'} color={'rgba(255,255,255,0.8)'}>
                    {`${from_user}`}
                </Text>
                <Flex gap={'20px'} color={'white'} mt={'10px'}>
                    <ButtonWithIcon title={'Accept'}
                                    iconSize={20}
                                    className={'flex gap-[20px]'}
                                    onClick={() => toast.dismiss(t.id)}
                                    iconColor={'rgba(255,255,255,0.48)'}
                                    iconColorHover={'white'}
                                    IconComponent={CheckIcon}>
                        <Text fontSize={'sm'} fontWeight={'medium'} color={'rgba(255,255,255,0.8)'}>
                            {'Accept'}
                        </Text>
                    </ButtonWithIcon>

                    <ButtonWithIcon
                        title={'Decline'}
                        iconSize={20}
                        className={'flex gap-4'}
                        onClick={() => {
                            toast.dismiss(t.id);
                        }}
                        iconColor={'rgba(255,255,255,0.48)'}
                        iconColorHover={'white'}
                        IconComponent={XMarkIcon}>
                        <Text fontSize={'sm'} fontWeight={'medium'} color={'rgba(255,255,255,0.8)'}>
                            {'Decline'}
                        </Text>
                    </ButtonWithIcon>
                </Flex>
            </Flex>
        </Flex>;
    }, {
        position: 'bottom-right',
        duration: 3000,
        style: {
            background: '#373737',
            padding: 0,
            borderRadius: 0,
            maxWidth: 'unset',
        }
    });
};

export const showResponseError = (code: number, url: string, message: string) => {
    if (code === 404) {
        showErrorToast(`Not found: ${url}`);
    }
    else if (code === 400) {
        showErrorToast(`${message}`);
    }
    else if (code === 500) {
        showErrorToast('Server error');
    }
    else if (code === 503) {
        showErrorToast('Service unavailable');
    }
    else if (code !== 401) {
        showErrorToast('Something went wrong');
    }
};

export const showErrorToast = (message: string) => {
    // dismiss all toasts
    toast.dismiss();

    toast(message, {
        duration: 3000,
        position: 'bottom-center',
        // Styling
        style: {
            background: '#ac0000',
            color: 'white',
            boxShadow: 'none'
        },
        className: '',
        // Custom Icon
        // icon: '',
        // Change colors of success/error/loading icon
        iconTheme: {
            primary: '#000',
            secondary: '#fff',
        },
        // Aria
        ariaProps: {
            role: 'status',
            'aria-live': 'polite',
        },
    });
};

export const showSuccessToast = (message: string) => {
    // dismiss all toasts
    toast.dismiss();

    toast(message, {
        duration: 3000,
        position: 'bottom-center',
        // Styling
        style: {
            background: '#00ac00',
            color: 'white',
            boxShadow: 'none'
        },
        className: '',
        // Custom Icon
        // icon: '',
        // Change colors of success/error/loading icon
        iconTheme: {
            primary: '#000',
            secondary: '#fff',
        },
        // Aria
        ariaProps: {
            role: 'status',
            'aria-live': 'polite',
        },
    });
};
