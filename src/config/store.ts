export const STORE_CONFIG = {
  // --- STORE IDENTIFICATION ---
  name: "DYNATEK Tech shop",
  shortName: "DYNATEK",
  
  // --- CONTACT INFO ---
  phone: "+91 8638133730",
  // The WhatsApp number should be without '+' or spaces, just the country code and number
  whatsappNumber: "918638133730", 
  email: "dynatekassam@gmail.com",
  
  // --- LOCATION ---
  address: "2ND FLOOR, Dewan Mansion, near HOTEL AMBARISH, Ganeshguri, Guwahati, Assam 781005",
  shortAddress: "2ND FLOOR, Dewan Mansion, near HOTEL AMBARISH, Ganeshguri, Guwahati, Assam 781005",
  // Go to Google Maps -> share -> Embed a map -> copy the URL inside the src="..." attribute
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.42224486021!2d91.7843559!3d26.1503746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a59d46cc2adb5%3A0x7aeffa254fa6b151!2sDYNATEK!5e0!3m2!1sen!2sin!4v1777042819940!5m2!1sen!2sin",

  // --- GOOGLE SHEETS ADMIN PANEL ---
  // To use Google Sheets to manage your products:
  // 1. Create a Google Sheet with headers: id, category, name, price, description, image
  // 2. Go to File -> Share -> Publish to web -> Select "Comma-separated values (.csv)" -> Publish
  // 3. Paste the generated link below. 
  // Leave string empty ("") to use the default hardcoded products.
  googleSheetCsvUrl: "https://docs.google.com/spreadsheets/d/14PfRfm_M3rCCA_gcKljTv5Wu23uf0CFbbZDt84V94TY/export?format=csv", 
};
