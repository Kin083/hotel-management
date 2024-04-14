import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
import { Fragment } from 'react';
import {privateRoutes} from './routes'
import {DefaultLayout} from './Component/Layout';

function App1() {
    return (
        <Router>
            <div className="App1">
                <Routes>
                    {privateRoutes.map((route, index) => {
                        
                        const Page = route.component;
                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return <Route key={index} path={route.path} element={
                            <Layout>
                                <Page />
                            </Layout>
                        } />
                    })}
                </Routes>
            </div>
        </Router>
    )
}

export default App1