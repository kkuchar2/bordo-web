import React, {useCallback, Suspense} from "react";

import {AnimatePresence} from "framer-motion";
import {Route, Routes, useLocation} from "react-router-dom";

import {routes} from "./routes";

const Content = () => {
    const location = useLocation();

    const mapRoutesToContent = useCallback(() => routes.filter((v: any) => v.enabled)
        .map((p, k) => {
            return <Route key={k} path={p.path} element={p.element} />;
        }), []);

    return <AnimatePresence exitBeforeEnter>
        <Suspense fallback={null}>
            <Routes location={location} key={location.pathname}>{mapRoutesToContent()}</Routes>
        </Suspense>
    </AnimatePresence>;
};

export default Content;