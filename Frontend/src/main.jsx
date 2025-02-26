import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './store/store.jsx'
import { Provider } from 'react-redux'
import { SocketProvider } from './SocketContext/Socket.jsx'
createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <SocketProvider >
        <App />
        </SocketProvider>
    </Provider>

)
