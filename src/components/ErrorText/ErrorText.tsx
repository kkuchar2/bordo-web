import { ReactElement, ReactNode } from 'react';

type ErrorTextProps = {
    children: ReactNode;
}

export const ErrorText = (props: ErrorTextProps): ReactElement => {

    const { children } = props;

    return <div className={'text-[#ff4949]'} key={Math.random()}>
        {children}
    </div>;
};