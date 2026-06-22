import React, { useEffect } from "react";
import { DashboardShell } from "../../components/Dashboard/dashboardShell";
import { DashboardHeader } from "../../components/Dashboard/dashboardHeader";
import { ListingsTable } from "../../components/Dashboard/listingsTable";
import { Button } from "../../components/ui/button";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom"; // React Router Link instead of Next.js Link
import { fetchAllPackages, deletePackage } from "../../store/admin/tourPackage-slice";
import { useDispatch, useSelector } from "react-redux";

export default function DashboardPage() {
  const { packageList } = useSelector((state) => state.adminTourPackages);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPackages());
  }, [dispatch]);

  const deleteListing = (id) => {
    dispatch(deletePackage(id)).then(data => {
      if(data?.payload?.success){
        dispatch(fetchAllPackages());
      }
    });
  };

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Listings"
        text="Manage your travel listings and packages."
      >
        <Button asChild>
          <Link to="/Dashboard/new" className="flex items-center">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Listing
          </Link>
        </Button>
      </DashboardHeader>
      <div className="grid gap-4">
        {packageList.length > 0 && (
          <ListingsTable initialListings={packageList} deleteListing={deleteListing} />
        )}
      </div>
    </DashboardShell>
  );
}
