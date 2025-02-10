import { useEffect, useState } from "react";
import Header_mobile from "../Header-mobile/Header_mobile";
import Header_desktop from "../Header_desktop/Header_desktop";

import "./App.scss";

function App() {
	const [sizeWindow, setSizeWindow] = useState(375);

	useEffect(() => {
		setSizeWindow(window.innerWidth);
	}, []);

	return <>{sizeWindow <= 375 ? <Header_mobile /> : <Header_desktop />}</>;
}

export default App;
