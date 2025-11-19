const mongooose = require("mongoose");
const cartSchema = new mongooose.Schema(
  {
    user: { type: mongooose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: { type: mongooose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongooose.model("Cart", cartSchema);
