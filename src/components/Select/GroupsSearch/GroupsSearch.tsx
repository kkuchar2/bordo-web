import React, { useCallback, useState } from 'react';

import { Flex } from '@chakra-ui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import Select, { components, IndicatorsContainerProps, MultiValueRemoveProps, OptionProps } from 'react-select';

import { queryClient } from '@/config';
import { QueryResponseError } from '@/queries/base';
import { searchGroup } from '@/queries/people';

const MultiValueRemove = (props: MultiValueRemoveProps<GroupSearchOption>) => {
    return <components.MultiValueRemove {...props}>
        <XMarkIcon width={'20px'} height={'20px'}/>
    </components.MultiValueRemove>;
};

const MultiValueLabel = (props: any) => {
    const data = props.data;
    return <components.MultiValueLabel {...props}>
        <Flex gap={'10px'} justify={'center'} align={'center'} h={'100%'}>
            {data.label}
        </Flex>
    </components.MultiValueLabel>;
};

const IndicatorsContainer = (props: IndicatorsContainerProps<GroupSearchOption, true>) => {
    return (
        <div style={{ background: '#202020' }}>
            <components.IndicatorsContainer {...props} />
        </div>
    );
};

const Option = (props: OptionProps<GroupSearchOption>) => {

    return <components.Option {...props}>
        <Flex gap={'10px'} justify={'flex-start'} align={'center'} h={'100%'}>
            {props.data.label}
        </Flex>
    </components.Option>;
};

export interface GroupSearchOption {
    readonly value: {
        groupName: string;
        groupID: string;
    },
    readonly label: string;
}

interface GroupsSearchProps {
    onSelect: (option: GroupSearchOption) => void;
}

export const GroupsSearch = (props: GroupsSearchProps) => {

    const { onSelect } = props;

    const [searchResult, setSearchResult] = useState<GroupSearchOption[]>([]);

    const { t } = useTranslation();

    const searchGroupMutation = searchGroup()({
        onSuccess: (data: any) => {
            console.log(data);
            setSearchResult(data.map((group) => {
                console.log(group);
                return {
                    value: {
                        groupName: group.name,
                        groupID: group.uuid,
                    },
                    label: group.name
                };
            }));
        },
        onError: (err: QueryResponseError) => {
            console.log(err);
        }
    });

    const onSelectInputChange = useCallback((value: string) => {
        if (value.length > 0) {
            queryClient.cancelQueries(['searchGroup']);
            searchGroupMutation.mutate({
                query: value
            });
        }
    }, []);

    return <Select
        closeMenuOnSelect={true}
        defaultValue={searchResult[0]}
        isMulti={false}
        noOptionsMessage={() => t('NO_SEARCH_RESULTS')}
        onInputChange={onSelectInputChange}
        onChange={onSelect}
        placeholder={t('SEARCH_GROUP')}
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
