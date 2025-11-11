import { useState } from "react";
import TenantModal from "./dashboard/TenantModal";
import RemoveTenantModal from "./dashboard/RemoveTenantModal";

export default function AdminQuickActions({ onRefresh }) {
  const [isTenantModalOpen, setIsTenantModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  const handleAddTenant = () => {
    setIsTenantModalOpen(true);
  };

  const handleRemoveTenant = () => {
    setIsRemoveModalOpen(true);
  };

  const handleRefreshData = () => {
    if (onRefresh) onRefresh(); // <-- call the prop to increment refreshCounter
  };

  return (
    <div className="admin-quick-actions">
      <button onClick={handleAddTenant}>Add Tenant</button>
      <button onClick={handleRemoveTenant}>Remove Tenant</button>
      <button onClick={handleRefreshData}>Refresh Data</button>

      {/* Add Tenant Modal */}
      <TenantModal
        isOpen={isTenantModalOpen}
        onClose={() => setIsTenantModalOpen(false)}
      />

      {/* Remove Tenant Modal */}
      <RemoveTenantModal
        isOpen={isRemoveModalOpen}
        onClose={() => setIsRemoveModalOpen(false)}
      />
    </div>
  );
}
