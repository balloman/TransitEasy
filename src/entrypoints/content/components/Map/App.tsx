/**
 * Represents a latitude and longitude coordinate pair.
 */
interface LatLng {
	lat: number;
	lng: number;
}

const googleMapsApiKey = import.meta.env.WXT_GOOGLE_MAPS_API_KEY;

if (!googleMapsApiKey) {
	throw new Error("Missing WXT_GOOGLE_MAPS_API_KEY");
}

function waitForElm(selector: string): Promise<HTMLMetaElement | null> {
	return new Promise((resolve) => {
		const existing = document.querySelector<HTMLMetaElement>(selector);
		if (existing) {
			return resolve(existing);
		}

		const observer = new MutationObserver(() => {
			const match = document.querySelector<HTMLMetaElement>(selector);
			if (match) {
				observer.disconnect();
				resolve(match);
			}
		});

		const cleanup = () => observer.disconnect();
		onCleanup(cleanup);

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});
	});
}

const App = () => {
	const [work, { refetch }] = createResource(workAddress.getValue);
	const unwatch = workAddress.watch(() => {
		refetch();
	});
	const [building, setBuilding] = createSignal<LatLng>({
		lat: 40.7127,
		lng: -74.0134,
	});

	onCleanup(() => {
		unwatch();
	});

	waitForElm("meta[name='ICBM']").then((elm) => {
		const coordinates = elm?.content;
		if (!coordinates) {
			console.log("The TransitEasy extension couldn't find the location of this building...");
			return;
		}
		const latlng = coordinates.trim().split(";");
		const lat = parseFloat(latlng[0]);
		const lng = parseFloat(latlng[1]);
		setBuilding({ lat, lng });
	});

	const source = () => {
		if (work()) {
			const parsed = encodeURIComponent(work()!);
			// Gets the address by getting the string starting with the first numeric character
			const parsedBuilding = building().lat + "," + building().lng;
			return `https://www.google.com/maps/embed/v1/directions?key=${googleMapsApiKey}&mode=transit&destination=${parsed}&origin=${parsedBuilding}`;
		}
		return `https://www.google.com/maps/embed/v1/directions?key=${googleMapsApiKey}&origin=One+World+Tradedestination=Empire+State+Building`;
	};

	return (
		<Show when={work()} fallback={<div />}>
			<iframe
				title="Transit directions"
				width="100%"
				height="500"
				style={{ border: "0" }}
				referrerpolicy="no-referrer-when-downgrade"
				src={source()}
				allowfullscreen
			/>
		</Show>
	);
};

export default App;
