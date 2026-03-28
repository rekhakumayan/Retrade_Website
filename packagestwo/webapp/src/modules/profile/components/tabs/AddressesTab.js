import Spinner from "@/sharedComponents/Loader/Spinner";
import AddressCard from "../addresses/AddressCard";

export default function AddressesTab({
  addresses,
  loading,
  userName,
  onEdit,
  onDelete,
  onSetDefault,
  onAddNew,
}) {
  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center py-5">
        <Spinner></Spinner>
      </div>
    );
  }
  const isLimitReached = addresses.length >= 4;
  
  const handleAddNew = () => {
    if (isLimitReached) {
      alert("You can only add up to 4 addresses");
      return;
    }
    onAddNew();
  };

  return (
    <div className="row g-3">
      {addresses.map((addr) => (
        <div key={addr._id} className="col-12 col-md-6">
          <AddressCard
            addr={addr}
            userName={userName}
            onEdit={onEdit}
            onDelete={onDelete}
            onSetDefault={onSetDefault}
          />
        </div>
      ))}
      <div className="col-12 col-md-6">
        <AddressCard isAddNew onAddNew={handleAddNew} />
      </div>
    </div>
  );
}
