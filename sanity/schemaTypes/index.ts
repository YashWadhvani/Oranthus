import homepage from "./homepage";
import aboutPage from "./aboutPage";
import service from "./service";
import category from "./category";
import product from "./product";
import certification from "./certification";
import contactInfo from "./contactInfo";
import siteSettings from "./siteSettings";
import { heroSection } from "./objects/heroSection";
import { statItem } from "./objects/statItem";
import { featureItem } from "./objects/featureItem";

export const schemaTypes = [
  homepage,
  aboutPage,
  service,
  category,
  product,
  certification,
  contactInfo,
  siteSettings,
  heroSection,
  statItem,
  featureItem,
];

export const schema = {
  types: schemaTypes,
};