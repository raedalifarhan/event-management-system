import PaddingContainer from './padding-container';
import NavBar from '../../features/navigation/nav-bar';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../home/homePage';
import { ToastContainer } from 'react-toastify';
import { useStore } from '../stores/store';
import { useEffect } from 'react';
import LoadingComponent from './loadingComponent';

function App() {
  
  const loadtion = useLocation();
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded())
    } else {
      commonStore.setAppLoaded()
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) return <LoadingComponent content='Loading app...' />

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
      {loadtion.pathname === '/' ? <HomePage /> : (
        <>
          <NavBar />
          <PaddingContainer>
            <main className='h-auto space-y-10 mt-3'>
              <Outlet />
            </main>
          </PaddingContainer>
        </>
      )}
    </>
  );
}

export default observer(App);
