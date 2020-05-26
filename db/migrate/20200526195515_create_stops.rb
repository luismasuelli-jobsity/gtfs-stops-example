class CreateStops < ActiveRecord::Migration[5.2]
  def change
    create_table :stops do |t|
      # Defined as: https://github.com/google/transit/tree/master/gtfs/spec/en/examples
      t.string  :stop_id,       null: false, limit: 20
      t.string  :stop_name,     null: false, limit: 100
      t.text    :stop_desc,     null: false, limit: 4095
      t.decimal :stop_lat,      null: false, precision: 9, scale: 6
      t.decimal :stop_lng,      null: false, precision: 9, scale: 6
      t.string  :stop_url,      null: false, limit: 4095
      t.integer :location_type, null: false
      # Will only use as data/reference, not as an actual foreign key.
      t.string  :parent_station
      t.timestamps
    end

    add_index :stops, [:stop_id], name: 'index_stops_on_stop_id', unique: true

    reversible do |direction|
      direction.up do
        execute 'CREATE EXTENSION IF NOT EXISTS cube;'
        execute 'CREATE EXTENSION IF NOT EXISTS earthdistance;'
        execute 'CREATE INDEX geoposition on stops USING gist(ll_to_earth(stop_lat, stop_lng));'
      end
      direction.down do
        execute 'DROP EXTENSION IF EXISTS cube;'
        execute 'DROP EXTENSION IF EXISTS earthdistance;'
        remove_index :stops, name: :geoposition
      end
    end
  end
end
