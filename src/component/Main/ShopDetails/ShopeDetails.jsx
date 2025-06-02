import { useParams } from "react-router-dom";

const ShopDetail = () => {
  const { shopName } = useParams();

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-4">Shop Detail</h1>
      <p className="text-xl">
        Showing details for shop:{" "}
        <strong>{decodeURIComponent(shopName)}</strong>
      </p>
      {/* Add more shop info or API fetch here if needed */}
    </div>
  );
};

export default ShopDetail;
