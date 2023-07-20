import { ReactNode } from 'react';

import { FlexProps } from '@chakra-ui/react';

export interface IconProps {
    component?: (props: any) => ReactNode;
    color?: string;
    size?: number;
    flexProps?: FlexProps;
}