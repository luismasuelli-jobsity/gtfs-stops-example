class Stop < ApplicationRecord
  validates_presence_of :stop_id, :stop_name, :stop_lat, :stop_lng, :location_type

  scope :nearby, lambda { |latitude, longitude|
    find_by_sql ['select *, earth_distance(ll_to_earth(?, ?), ll_to_earth(stop_lat, stop_lng)) as distance from stops order by distance limit 5', latitude, longitude]
  }
end
