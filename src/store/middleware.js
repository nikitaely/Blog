const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("auth", serializedState);
  } catch (e) {
    console.warn("Could not save state to localStorage", e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("auth");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn("Could not load state from localStorage", e);
    return undefined;
  }
};

export { saveToLocalStorage, loadFromLocalStorage };
