import Navigation from "./Navigation";
import Welcome from "./Welcome";

function DefaultPage() {
  return (
    <div className="min-h-screen w-full fixed">
      <Navigation />
      <Welcome />
    </div>
  );
}

export default DefaultPage;
