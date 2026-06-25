import tourPackages from "../../models/tourPackages.js";

export const getFilteredTourPackages = async (req, res) => {
    try {
      const { category = [], brand = []} = req.query;
  
      let filters = {};
  
      if (category.length) {
        filters.category = { $in: category.split(",") };
      }
  
      if (brand.length) {
        filters.brand = { $in: brand.split(",") };
      }

      let sort = {};
  
      const products = await tourPackages.find(filters).sort(sort);
  
      res.status(200).json({
        success: true,
        data: products,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "some error occured",
      });
    }
  };
  
  
export const getTourPackageDetails = async (req,res)=>{
    try{
      const {id} = req.params
      const tourPackage = await tourPackages.findById(id)
  
      if(!tourPackage) return res.status(404).json({
        success : false,
        message : "Package not found!"
      })
  
      res.status(200).json({
        success : true,
        data : tourPackage
      })
  
    }catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "some error occured",
      });
    }
  }