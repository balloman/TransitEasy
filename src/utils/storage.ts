export const workAddress = storage.defineItem<string>("local:workAddress", {
	fallback: "Empire State Building",
});
