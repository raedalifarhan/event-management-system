import PaddingContainer from '../layout/padding-container'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useStore } from '../stores/store'

const HomePage = () => {
  const { userStore } = useStore();
  return (
    <PaddingContainer>
      <div className="grid place-items-center h-screen">
        <div className='font-bold text-orange-400'>
          <div className='text-4xl mb-5'>Home Page</div>
          <div className='flex flex-row gap-2'>
            {userStore.isLoggedIn ? (
              <>
              <Link
                  to="/departments"
                  className="border-sky-200 text-red-900 border-2 rounded-md px-4 py-2 hover:bg-sky-300 hover:border-primary hover:text-white transition-colors duration-300"
                >
                  Departments
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="border-sky-200 text-red-900 border-2 rounded-md px-4 py-2 hover:bg-sky-300 hover:border-primary hover:text-white transition-colors duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="border-sky-200 text-red-900 border-2 rounded-md px-4 py-2 hover:bg-sky-300 hover:border-primary hover:text-white transition-colors duration-300"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </PaddingContainer>
  )
}

export default observer(HomePage)