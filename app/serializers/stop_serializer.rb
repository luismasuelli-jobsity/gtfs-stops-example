class StopSerializer < ActiveModel::Serializer

  attributes :stop_id, :stop_name, :stop_desc, :stop_lat, :stop_lng, :stop_url, :location_type, :parent_station

end