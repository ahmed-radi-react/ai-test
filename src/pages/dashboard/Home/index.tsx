import { useEffect } from "react";
import Home from "~/dashboard/Home/Home";
import ContentContextServiceListProvider from "@/context/ServiceListContext";

const index = () => {
  useEffect(() => {
    document.title = "EButler TenX";
  }, []);
  return (
    <ContentContextServiceListProvider>
      <Home />
    </ContentContextServiceListProvider>
  );
};

export default index;
