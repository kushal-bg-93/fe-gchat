import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Body from './components/Body';
import Login from './components/Login';
import MainContainer from './components/MainContainer';
import Logout from './components/Logout';
import store from './utils/store';
import { Provider } from 'react-redux';
import AddGroup from './components/AddGroup';

const appRouter=createBrowserRouter([
  {
    path:'/',
    element:<Body/>,
    children:[
      {
        path:'/',
        element:<Login/>
      },
      {
        path:'/chat',
        element:<MainContainer/>
      },
      {
        path:'/addgroup',
        element:<AddGroup/>
      }
    ]
  },
  {
    path:'/logout',
    element:<Logout/>
  }
])

function App() {
  return (
    <Provider store={store}>
    <RouterProvider router={appRouter}>
    <div className="App">
      <h1 className="text-blue-500">
      Not Rendered

      </h1>
    </div>
    </RouterProvider>
    </Provider>
  );
}

export default App;
