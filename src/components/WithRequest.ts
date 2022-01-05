
export interface WithRequestProps {

}

export const WithRequest = (props : WithRequestProps, Component) => {

    const {...rest} = props;

    function wrapped (props : (BaseComponentProps & WrappedComponentProps)) {
        return <Component {...rest} />;
    }
}