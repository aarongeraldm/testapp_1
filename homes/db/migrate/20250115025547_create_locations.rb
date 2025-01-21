class CreateLocations < ActiveRecord::Migration[7.2]
  def change
    create_table :locations do |t|
      t.string :name
      t.string :city
      t.string :state
      t.string :photo
      t.integer :available_units
      t.boolean :wifi
      t.boolean :laundry

      t.timestamps
    end
  end
end
