import homepage from "./homepage";
import category from "./category";
import product from "./product";
import certification from "./certification";
import contactInfo from "./contactInfo";

export const schemaTypes = [
  homepage,
  category,
  product,
  certification,
  contactInfo,
];

export const schema = {
  types: schemaTypes,
};