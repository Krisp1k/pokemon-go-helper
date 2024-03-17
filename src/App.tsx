import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navigation from './Components/Navigation';

import config from './config.json';


function loadPage(pageName: string) {
    return React.lazy(() => import(`./Pages/${pageName}`));
}

function App() {

    const ConfigNav = config.Nav;

    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>} >
                <Navigation/>
                <main>
                    <Routes>
                        {ConfigNav.map((route) => {
                            const PageComponent = loadPage(route.Component);
                            return <Route key={route.Slug} path={route.Slug} element={<PageComponent />} />;
                        })}
                    </Routes>
                </main>
            </Suspense>
        </Router>
    )
}

export default App
