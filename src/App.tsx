import { useCallback, useEffect } from "react";

function App() {
  const test = useCallback(async () => {
    await fetch("http://localhost/devsnotes/api/ping.php")
    .then(response => response.json())
    .then(response => console.log(response));
  }, [])

  useEffect(() => {
    test();
  }, [test]);

  return (
    <div></div>
  );
}

export default App;
