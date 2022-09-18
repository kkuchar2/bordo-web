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

interface UserSearchProps {
    onSelect: (option: UserSearchOption) => void;
}

export const UserSearch = (props: UserSearchProps) => {

    const { onSelect } = props;

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
        isMulti={false}
        noOptionsMessage={() => 'No users found'}
        onInputChange={onSelectInputChange}
        onChange={onSelect}
        placeholder={'Search...'}
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
                background: 'rgba(23,23,23,0.68)',
                borderRadius: '6px',
            }),
            indicatorsContainer: (base) => ({
                ...base,
                background: 'blue',
                borderRadius: '0',
                height: '100%'
            }),
        }}
    />;
};