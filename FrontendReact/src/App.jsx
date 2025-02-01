import { router } from "../src/config/routes.jsx";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./config/redux-store.js";
import { AppLayout } from "./layouts/AppLayout.jsx";

function App() {
    return (
        <Provider store={store}>
            <AppLayout>
                <RouterProvider router={router} />
            </AppLayout>
        </Provider>
    );
}

export default App;
