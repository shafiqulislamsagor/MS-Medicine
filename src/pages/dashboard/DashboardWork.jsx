import { Chip, Divider } from "@mui/material";
const DashboardWork = () => {
    return (
        <div className="px-6">
      <h1 className="text-3xl font-bold text-center py-4">Admin Dashboard</h1>
      <Divider>
        <Chip label="user role" size="small" />
      </Divider>
    </div>
    );
};

export default DashboardWork;