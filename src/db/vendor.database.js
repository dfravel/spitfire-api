import Vendor from '../models/vendor.model';

const fetch = async () => {
  const vendors = await Vendor.find({});
  return vendors;
};

const findById = async (req) => {
  const vendor = await Vendor.findById(req);
  return vendor;
};

const post = async (req) => {
  const vendor = new Vendor({
    vendor_type: req.body.vendor_type,
    name: req.body.name,
    contact: req.body.contact,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    postal_code: req.body.postal_code,
    country_code: req.body.country_code,
    phone: req.body.phone,
    email: req.body.email,
    website: req.body.website,
  });

  const newVendor = await Vendor.create(vendor);
  return newVendor;
};


const update = async (vendorId, req) => {
  const updateVendor = await Vendor.findByIdAndUpdate(vendorId, { $set: req.body }, { new: true });
  return updateVendor;
};


const destroy = async (req) => {
//   const vendor = await Vendor.findByIdAndRemove(req);
  const vendor = await Vendor.deleteById(req);
  return vendor;
};


module.exports = {
  fetch,
  findById,
  post,
  update,
  destroy,
};
