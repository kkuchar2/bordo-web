import React, {Suspense, useMemo} from 'react';

import {Route, Routes, useLocation} from 'react-router-dom';

import {routes} from './routes';

const Content = () => {
    const location = useLocation();

    const mapRoutesToContent = useMemo(() => routes.map((p, k) => {
        const Component = p.element;
        return <Route key={k}
                      path={p.path}
                      element={<Component/>}/>;
    }), []);

    return <Suspense fallback={null}>
        <Routes location={location} key={location.pathname}>{mapRoutesToContent}</Routes>
    </Suspense>;
};

export default Content;