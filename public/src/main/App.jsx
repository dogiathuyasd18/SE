//GA
import ReactGA from 'react-ga';
//utils
import {lazy,Suspense} from 'react';
//styles
import '@styles/index.css';
import ThemeStyles from '@styles/ThemeStyles';

//fonts

//contexts
import {SidebarProvider} from '@contexts/SidebarContext';
import {ThemeProvider} from 'styled-components';

//hooks
import {useTheme} from '@contexts/ThemeContext';
import {useEffect,useRef} from 'react';
import {useWindowSize} from 'react-use';

//components
import ScrollToTop from '@components/ScrollToTop';
import Loader from '@components/Loader';
import {Route,Routes,useLocation,Navigate}  from 'react-router-dom';
import Sidebar from '@layouts/Sidebar';
import Copyright from '@components/Copyright';
import AppBar from '@layouts/AppBar';
import {ToastContainer} from 'react-toastify';

//pages


//authentications
require('dotenv').config();

const App=()=>{
    const {width}=useWindowSize();
    const appRef=useRef(null);
    const {theme}=useTheme();
    const path=useLocation().pathname;
    const withSidebar= path !== 'login' && path !='/404';
    //GA init
    const gaKey=import.meta.env.VITE_GA;
    gaKey&&ReactGA.initialize(gaKey);
    useEffect(()=>{
        appRef.current && appRef.current.scrollTo(0,0);
    },[]);
    return (
        <SidebarProvider>
            <ThemeProvider theme={{theme: theme}}>
                <ThemeStyles/>
                <ToastContainer theme={theme} autoClose={3000} style={{padding: '20px'}} />
                {width <1280&& withSidebar && <AppBar/>}
            <div className={`app ${!withSidebar ? 'fluid' : ''}`} ref={appRef}>
                <ScrollToTop/>
                {withSidebar && <Sidebar/>}
                <div className='app_content'>
                    {width>=1280 && withSidebar && <AppBar/>}
                    <Suspense fallback={<Loader />}>
                        <div className="main">
                        <Routes>
                            <Route path='/' element={<Navigate to='/dashboard' />} />
                            <Route path='dashboard' element={<Dashboard />} />
                            <Route path='*' element={<Navigate to='/404' />} />
                        </Routes>
                </div>
                {width>=1280 && <Copyright />}
                </Suspense>
            </div>
            </div>
            </ThemeProvider>
        </SidebarProvider>
    );
}
export default App;