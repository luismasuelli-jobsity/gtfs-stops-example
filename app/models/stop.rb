class Stop < ApplicationRecord
  validates_presence_of :stop_id, :stop_name, :stop_lat, :stop_lng, :location_type
end
