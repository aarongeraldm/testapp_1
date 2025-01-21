class LocationSerializer < ActiveModel::Serializer
  attributes :id, :name, :city, :state, :photo, :available_units, :wifi, :laundry
end
