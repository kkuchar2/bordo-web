import React, {useCallback, useState} from 'react';

import {Avatar, Flex} from '@chakra-ui/react';
import {XMarkIcon} from '@heroicons/react/24/outline';
import Select, {components, IndicatorsContainerProps, MultiValueRemoveProps, OptionProps} from 'react-select';
import {getAvatarFromProfile} from 'util/util';

import {queryClient} from '../../../App';
import {UserSearchOption} from '../../../pages/Chats/ChatWindow';
import {QueryResponseError} from '../../../queries/base';
import {searchPeople} from '../../../queries/people';

const MultiValueRemove = (props: MultiValueRemoveProps<UserSearchOption>) => {
    return <components.MultiValueRemove {...props}>
        <XMarkIcon width={'20px'} height={'20px'}/>
    </components.MultiValueRemove>;
};

const MultiValueLabel = (props: any) => {

    const data = props.data;
    const avatar = getAvatarFromProfile(props.data.value.profile);
    return <components.MultiValueLabel {...props}>
        <Flex gap={'10px'} justify={'center'} align={'center'} h={'100%'}>
            <Avatar src={avatar}
                    name={data.label}
                    borderRadius={'100%'}
                    width={'30px'}
                    height={'30px'}
                    objectFit={'cover'}/>
            {data.label}
        </Flex>
    </components.MultiValueLabel>;
};

const IndicatorsContainer = (props: IndicatorsContainerProps<UserSearchOption, true>) => {
    return (
        <div style={{ background: '#202020' }}>
            <components.IndicatorsContainer {...props} />
        </div>
    );
};

const Option = (props: OptionProps<UserSearchOption>) => {

    const data = props.data;
    const avatar = getAvatarFromProfile(props.data.value.profile);

    return <components.Option {...props}>
        <Flex gap={'10px'} justify={'flex-start'} align={'center'} h={'100%'}>
            <Avatar src={avatar}
                    name={props.data.label}
                    borderRadius={'100%'}
                    width={'30px'}
                    height={'30px'}
                    objectFit={'cover'}/>
            {props.data.label}
        </Flex>
    </components.Option>;
};

interface MultiUserSelectProps {

}

export const MultiUserSelect = (props: MultiUserSelectProps) => {
    const [searchResult, setSearchResult] = useState<UserSearchOption[]>([]);

    const searchPeopleMutation = searchPeople()({
        onSuccess: (data: any) => {
            setSearchResult(data.map((user) => {
                return {
                    value: {
                        username: user.username,
                        profile: user.profile,
                    },
                    label: user.username,
                };
            }));
        },
        onError: (err: QueryResponseError) => {
            console.log(err);
        }
    });

    const onSelectInputChange = useCallback((value: string) => {
        if (value.length > 0) {
            queryClient.cancelQueries(['searchPeople']);
            searchPeopleMutation.mutate({
                query: value
            });
        }
    }, []);

    return <Select
        closeMenuOnSelect={true}
        defaultValue={searchResult[0]}
        isMulti
        noOptionsMessage={() => 'No users found'}
        onInputChange={onSelectInputChange}
        placeholder={'Select users'}
        options={searchResult}
        components={{
            DropdownIndicator: () => null,
            ClearIndicator: () => null,
            IndicatorSeparator: () => null,
            IndicatorsContainer: IndicatorsContainer,
            MultiValueRemove: MultiValueRemove,
            MultiValueLabel: MultiValueLabel,
            Option: Option,
        }}
        styles={{
            control: (base: any) => ({
                ...base,
                background: 'none',
                border: 'none',
                color: 'white',
                boxShadow: 'none', // remove focus border
            }),
            menu: base => ({
                ...base,
                // override border radius to match the box
                borderRadius: 0,
                // kill the gap
                marginTop: 0,
                background: '#2a2a2a',
            }),
            option: (provided, state) => ({
                ...provided,

                '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.09)',
                    cursor: 'pointer'
                },
                backgroundColor: state.isFocused ? 'rgba(255,255,255,0.08)' : 'transparent'
            }),
            menuList: base => ({
                ...base,
                // kill the white space on first and last option
                padding: 0
            }),
            input: (base: any) => ({
                ...base,
                color: 'white',
                height: '40px',

            }),
            container: (base) => ({
                ...base,
                width: '100%',
                borderRadius: '0',
            }),
            valueContainer: (base) => ({
                ...base,
                background: 'rgba(39,39,39,0.68)',
                borderRadius: '6px',
            }),
            multiValue: (base) => ({
                ...base,
                background: 'rgba(0,168,255,0.14)',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                padding: '2px',
                paddingLeft: '4px',
                paddingRight: '4px',
                marginRight: '5px'
            }),
            multiValueRemove: (base) => ({
                ...base,
                border: 'none',
                background: 'none',
                height: '30px',
                width: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '150px',
                '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    color: '#fff'
                }
            }),
            indicatorsContainer: (base) => ({
                ...base,
                background: 'blue',
                borderRadius: '0',
                height: '100%'
            }),
            multiValueLabel: (base) => ({
                ...base,
                backgroundColor: 'none',
                borderRadius: 0,
                border: 'none',
                boxShadow: 'none',
                color: 'white',
                fontWeight: 'bold',
            }),
        }}
    />;
};