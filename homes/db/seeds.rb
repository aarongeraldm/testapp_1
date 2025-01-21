# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

Location.create([
  { name: "Acme Fresh Start Housing", city: "Chicago", state: "IL", photo: "/assets/test.jpg", available_units: 4, wifi: true, laundry: true },
  { name: "A113 Transitional Housing", city: "Santa Monica", state: "CA", photo: "/assets/brandon-griggs-wR11KBaB86U-unsplash.jpg", available_units: 0, wifi: false, laundry: true },
  { name: "Warm Beds Housing Support", city: "Juneau", state: "AK", photo: "/assets/i-do-nothing-but-love-lAyXdl1-Wmc-unsplash.jpg", available_units: 1, wifi: false, laundry: false },
  { name: "Homesteady Housing", city: "Chicago", state: "IL", photo: "/assets/ian-macdonald-W8z6aiwfi1E-unsplash.jpg", available_units: 1, wifi: true, laundry: false },
  { name: "Happy Homes Group", city: "Gary", state: "IN", photo: "/assets/krzysztof-hepner-978RAXoXnH4-unsplash.jpg", available_units: 1, wifi: true, laundry: false },
  { name: "Hopeful Apartment Group", city: "Oakland", state: "CA", photo: "/assets/r-architecture-JvQ0Q5IkeMM-unsplash.jpg", available_units: 2, wifi: true, laundry: true },
  { name: "Seriously Safe Towns", city: "Oakland", state: "CA", photo: "/assets/phil-hearing-IYfp2Ixe9nM-unsplash.jpg", available_units: 5, wifi: true, laundry: true },
  { name: "Hopeful Housing Solutions", city: "Oakland", state: "CA", photo: "/assets/r-architecture-GGupkreKwxA-unsplash.jpg", available_units: 2, wifi: true, laundry: true },
  { name: "Seriously Safe Towns", city: "Oakland", state: "CA", photo: "/assets/saru-robert-9rP3mxf8qWI-unsplash.jpg", available_units: 10, wifi: false, laundry: false },
  { name: "Capital Safe Towns", city: "Portland", state: "OR", photo: "/assets/webaliser-_TPTXZd9mOo-unsplash.jpg", available_units: 6, wifi: true, laundry: true }
])

