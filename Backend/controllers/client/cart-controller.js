import Cart from "../../models/cart.js";
import tourPackages from "../../models/tourPackages.js";

export const addToCart = async (req, res) => {
  try {
    const { userId, tourPackageId } = req.body;

    if (!userId || !tourPackageId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const tourPackage = await tourPackages.findById(tourPackageId);
    if (!tourPackage) {
      return res.status(404).json({
        success: false,
        message: "Tour package not found",
      });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) cart = new Cart({ userId, items: [] });

    const existingIndex = cart.items.findIndex(
      (item) => item.tourPackageId.toString() === tourPackageId
    );

    if (existingIndex !== -1) {
      cart.items[existingIndex].quantity += 1;
    } else {
      cart.items.push({ tourPackageId, quantity: 1 });
    }

    await cart.save();

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error adding to cart",
    });
  }
};

export const fetchCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId }).populate("items.tourPackageId");

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching cart items",
    });
  }
};

export const updateCartItems = async (req, res) => {
  try {
    const { userId, tourPackageId, quantity } = req.body;

    if (!userId || !tourPackageId || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Invalid data",
      });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const item = cart.items.find(
      (item) => item.tourPackageId.toString() === tourPackageId
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    item.quantity = quantity;
    await cart.save();

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error updating cart item",
    });
  }
};

export const deleteCartItems = async (req, res) => {
  try {
    const { userId, tourPackageId } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.tourPackageId.toString() !== tourPackageId
    );

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
      data: cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error deleting cart item",
    });
  }
};
