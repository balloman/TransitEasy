import { Button, FormControl, FormHelperText, FormLabel, HopeProvider, Input, VStack } from "@hope-ui/solid";

import "@src/styles/index.css";
import { createSignal } from "solid-js";

const Popup = () => {
  const [address, setAddress] = createSignal("");

  chrome.storage.local.get("address", (result) => {
    setAddress(result.address ?? "");
  });

  const saveAddress = () => {
    chrome.storage.local.set({ address: address() }).then(() => {
      alert("Saved successfully!");
    });
  };

  return (
    <HopeProvider
      config={{
        initialColorMode: "system",
      }}
    >
      <VStack justifyContent={"center"} alignItems={"center"}>
        <FormControl marginTop={10}>
          <FormLabel for="address">Work Location</FormLabel>
          <Input id="address" placeholder="Enter your work address" value={address()} onInput={(event) => setAddress(event.target.value)} />
          <FormHelperText fontSize={10}>You can enter anything you can search in Google Maps.</FormHelperText>
        </FormControl>
        <Button marginBottom={10} onClick={saveAddress}>
          Save
        </Button>
      </VStack>
    </HopeProvider>
  );
};

export default Popup;
