interface AdminPanelProps {
  onAdminClick: () => void;
}

export const AdminPanel = ({ onAdminClick }: AdminPanelProps) => {
  return (
    <div className="space-y-4">
      <span className="cursor-pointer underline" onClick={onAdminClick}>
        Ir para Tela de ADM
      </span>
    </div>
  );
};
