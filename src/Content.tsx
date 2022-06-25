import React, {Suspense, useMemo} from "react";

import {Route, Routes, useLocation} from "react-router-dom";

import {routes} from "./routes";

const Content = () => {
    const location = useLocation();

    const mapRoutesToContent = useMemo(() => routes.filter((v: any) => v.enabled)
        .map((p, k) => <Route key={k} path={p.path} element={p.element}/>), []);

    return <Suspense fallback={null}>
        <Routes location={location} key={location.pathname}>{mapRoutesToContent}</Routes>
    </Suspense>;
};

export default Content;