import "@src/styles/index.css";
import { Show, createSignal } from "solid-js";

function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver(() => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

const App = () => {
  const [work, setWork] = createSignal<string | undefined>(undefined);
  const [building, setBuilding] = createSignal<string>(
    "One World Trade Center"
  );
  waitForElm(".building-title").then((elm) => {
    setBuilding(elm["innerText"]);
  });

  chrome.storage.local.get("address", (result) => {
    setWork(result.address);
  });
  chrome.storage.local.onChanged.addListener((changes) => {
    if (changes.address) {
      setWork(changes.address.newValue);
    }
  });

  const source = () => {
    if (work()) {
      const parsed = work()?.replaceAll(" ", "+");
      // Gets the address by getting the string starting with the first numeric character
      const parsedBuilding = building().trim().replaceAll(" ", "+");
      return `https://www.google.com/maps/embed/v1/directions?key=AIzaSyDWXj-Q9-WqQaKqyA48Daz-rYHa8rkDjsk&mode=transit&destination=${parsed}&origin=${parsedBuilding}`;
    }
    return `https://www.google.com/maps/embed/v1/directions?key=AIzaSyDWXj-Q9-WqQaKqyA48Daz-rYHa8rkDjsk&origin=One+World+Tradedestination=Empire+State+Building`;
  };

  return (
    <Show when={work()} fallback={<div />}>
      <iframe
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
