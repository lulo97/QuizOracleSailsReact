import { router } from "../src/config/routes.jsx";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./config/redux-store.js";
import { MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css';

function App() {
    return (
        <MantineProvider>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </MantineProvider>
    );
}

export default App;
