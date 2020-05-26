class MainController < ApplicationController
  require 'csv'

  def show
    # No-op here: just displays.
  end

  def import
    if params[:replace].present?
      Stop.delete_all
    end
    if params[:append].present? or params[:replace].present?
      file = params[:stops_file]
      if file.present?
        result = do_import file
        if result == nil
          render json: { message: "ok" }, status: 200
        elsif result == "duplicate"
          render json: { message: "data is duplicated - either you're adding an existing lot or you should replace the content instead" }, status: 400
        elsif result == "invalid"
          render json: { message: "input data is not CSV or has invalid/missing field values" }, status: 400
        else
          render json: { message: "an unknown error has occurred" }, status: 500
        end
      else
        render json: { message: "no file was uploaded" }, status: 400
      end
    else
      render json: { message: "no operation specified: either aappend or replace  is needed" }, status: 400
    end
  end

  def clear
    Stop.delete_all
    render json: { message: "ok" }
  end

  def search
    render json: []
  end

private

  def do_import(uploaded_file)
    CSV.foreach(uploaded_file.path, headers: true) do |row|
      hash = row.to_hash
      hash['stop_lng'] = hash['stop_lon']
      hash.delete('stop_lon')
      sliced = hash.slice('stop_id', 'stop_name', 'stop_desc', 'stop_lat',
                          'stop_lng', 'stop_url', 'location_type', 'parent_station')
      Stop.create! sliced
    end
    nil
  rescue CSV::MalformedCSVError
    "invalid"
  rescue ActiveRecord::RecordInvalid
    "invalid"
  rescue ActiveRecord::RecordNotUnique
    "duplicate"
  rescue
    "unknown"
  end
end