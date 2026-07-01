import { workAddress } from '@/utils/storage';
import "./style.css";

const Popup = () => {
  const [address, { mutate }] = createResource(workAddress.getValue)

  const saveAddress = () => {
    const addressInstant = address.latest
    if (!addressInstant) return;
    workAddress.setValue(addressInstant).then(() => {
      alert("Saved successfully!");
    });
  };

  return (
    <div class='flex flex-col items-center justify-center h-full w-max-content pb-4'>
      <fieldset class="fieldset w-max-content m-4 border-base-300">
        <legend class="fieldset-legend">Work Location</legend>
        <input type="text" class="input" placeholder="Enter your work address" value={address()} onInput={(e) => mutate(e.target.value)} />
        <p class="label">You can enter anything you can search in Google Maps.</p>
      </fieldset>
      <button class="btn btn-primary" onClick={saveAddress}>Save</button>
    </div>
  );
};

export default Popup;
