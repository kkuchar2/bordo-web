import {FlexProps} from '@chakra-ui/react';

export interface IconProps {
    component?: (props: any) => JSX.Element;
    color?: string;
    size?: number;
    flexProps?: FlexProps;
}