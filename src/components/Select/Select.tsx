import React, {Fragment, useEffect, useState} from 'react';

import {Listbox, Transition} from '@headlessui/react';
import {CheckIcon, SelectorIcon} from '@heroicons/react/solid';

export interface SelectProps {
    items: any[];
    onChange: (value: any) => void;
}

export const Select = (props: SelectProps) => {

    const { items, onChange } = props;

    const [selected, setSelected] = useState(items.length === 0 ? null : items[0]);

    useEffect(() => {
        onChange(selected);
    }, [selected]);

    if (items.length === 0) {
        return null;
    }

    return <div className="top-16 w-72 z-[1500]">
        <Listbox value={selected} onChange={setSelected}>
            <div className="relative mt-1">
                <Listbox.Button
                    className="relative w-full cursor-default rounded-[4px] text-white bg-[#7300A9] py-3 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">{selected.name}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
            </span>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options
                        className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {items?.map((item, idx) => (
                            <Listbox.Option
                                key={idx}
                                className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                        active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                    }`
                                }
                                value={item}
                            >
                                {({ selected }) => (
                                    <>
                      <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                        {item.name}
                      </span>
                                        {selected ? (<span
                                                className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                        </span>
                                        ) : null}
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    </div>;
};