import VisitorsDashboard from "~/dashboard/visitors/VisitorsDashboard";
import ContentContextParcelProvider from "@/context/ParcelContext";

const Visitors = () => {
  return (
    <ContentContextParcelProvider>
      <VisitorsDashboard />
    </ContentContextParcelProvider>
  );
};

export default Visitors;
