import { SidebarButton, StyledSidebar } from "./SidebarStyles";
import axios from "axios";
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";

export default function Sidebar() {
  const router = useRouter();

  const handleSearch = () => {
    router.push("/search");
  };

  const handleAddProducts = () => {
    router.push("/addproduct");
  };

  const handleLogout = async () => {
    try {
      await axios.get('/api/users/logout');
      toast.success("Logout Success");
      router.push("/login");
    } catch (error: any) {
        console.log(error.message);
        toast.error(error.message);
    }
  };

  const handleProfile = () => {
    router.push("/profile");
  };

  return (
    <StyledSidebar>
      <h1>ADMIN PANEL</h1>
      <SidebarButton onClick={handleAddProducts}>Add Products</SidebarButton>
      <SidebarButton onClick={handleProfile}>Profile</SidebarButton>
      <SidebarButton onClick={handleLogout}>Logout</SidebarButton>
    </StyledSidebar>
  );
}

  