import React, {ComponentType, LazyExoticComponent} from 'react';

/**
 * Wraps the React Component with React.Suspense and FallbackComponent while loading.
 * @param {React.Component} WrappedComponent - lazy loading component to wrap.
 */
export const withSuspense = (WrappedComponent : LazyExoticComponent<ComponentType<any>>) => {
    return function Component(props : any) {

        return (
            <React.Suspense fallback={null}>
                <div className={"page"}>
                    <WrappedComponent {...props} />
                </div>
            </React.Suspense>
        );
    };
};