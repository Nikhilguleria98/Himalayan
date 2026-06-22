import { DashboardShell } from "../../../components/Dashboard/dashboardShell"
import { DashboardHeader } from "../../../components/Dashboard/dashboardHeader"
import { ListingForm } from "../../../components/Dashboard/listingForm"

export default function NewListingPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Create New Listing" text="Add a new travel package or destination to your website." />
      <div className="grid gap-4">
        <ListingForm />
      </div>
    </DashboardShell>
  )
}


