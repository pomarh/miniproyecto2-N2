import { WeatherProvider } from "./context/WeatherContext";
import Aside from "./components/Aside";
import DataPronostic from "./components/DataPronostic";

function App() {
    return (
        <>
            <WeatherProvider>
                <div className="flex flex-col md:flex-row bg-[#100E1D]">
                    <Aside />
                    <DataPronostic />
                </div>
            </WeatherProvider>
        </>
    );
}

export default App;
