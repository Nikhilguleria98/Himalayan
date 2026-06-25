import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllPackages,
  editPackage,
} from "../../../../store/admin/tourPackage-slice";

export default function EditListingPage() {
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { packageList } = useSelector((state) => state.adminTourPackages);
  const { id } = useParams();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    dispatch(fetchAllPackages());
  }, [dispatch]);

  useEffect(() => {
    if (packageList.length > 0) {
      const foundListing = packageList.find((item) => item._id === id);
      setListing(foundListing);
    }
  }, [id, packageList]);

  const handleChange = (field, value) => {
    setListing((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditId(id);
    console.log("Updated listing:", listing, id);
    dispatch(editPackage({ id, ...listing }));
    navigate("/Dashboard");
  };

  if (!listing) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Listing not found</h1>
        <Button onClick={() => navigate("/Dashboard")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Listings
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/Dashboard")}
          className="mr-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <h1 className="text-2xl font-bold">Edit Listing</h1>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Listing Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <Input
                id="name"
                value={listing.title}
                onChange={(e) => handleChange("title", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Textarea
                id="description"
                value={listing.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="price" className="text-sm font-medium">
                  Price ($)
                </label>
                <Input
                  id="price"
                  type="number"
                  value={listing.price}
                  onChange={(e) => handleChange("price", Number(e.target.value))}
                  min="0"
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" /> Save Changes
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
