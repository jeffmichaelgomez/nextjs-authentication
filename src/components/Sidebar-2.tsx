import { SidebarButton, StyledSidebar } from "./SidebarStyles";

import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const router = useRouter();

  const handleSearch = () => {
    router.push("/search");
  };

  const handleAddProducts = () => {
    router.push("/addproduct");
  };

  return (
    <StyledSidebar>
      <h1>ADMIN PANEL</h1>
      <SidebarButton onClick={handleSearch}>Search</SidebarButton>
      <SidebarButton onClick={handleAddProducts}>Add Products</SidebarButton>
    </StyledSidebar>
  );
}

  