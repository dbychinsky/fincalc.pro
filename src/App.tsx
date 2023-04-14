import React, {createContext} from 'react';
import {Server} from "./service/Service";
import {RoutersProject} from "./router/RouterList";
import Navigation from "./component/navigation/Navigation";
import "./App.scss";
import {RootStore} from "./store/RootStore";

export const server = new Server();

/**
 * Создаем экземпляр родительского Store и
 * контекст для него.
 */
export const rootStore = new RootStore();
export const StoreContext = createContext<RootStore>(rootStore);

function App() {
    return (
        <div className="App">
            <RoutersProject/>
            <Navigation/>
        </div>
    );
}

export default App;
