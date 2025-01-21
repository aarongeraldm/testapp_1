class LocationsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create, :destroy, :update]

  def index
    locations = Location.all
    render json: locations
  end

  def show
    location = Location.find(params[:id])
    render json: location
  end

  def create
    location_params_mapped = location_params
    location_params_mapped[:available_units] = location_params_mapped.delete(:availableUnits) 

    location = Location.create(location_params_mapped)
    render json: location, status: :created
  end

  def update
    location = Location.find(params[:id])
    location_params_mapped = location_params
    location_params_mapped[:available_units] = location_params_mapped.delete(:availableUnits) if location_params_mapped[:availableUnits]
  
    if location.update(location_params_mapped)
      render json: location
    else
      render json: { error: 'Failed to update location' }, status: :unprocessable_entity
    end
  end
  

  def destroy
    location = Location.find(params[:id])
    if location.destroy
      head :no_content
    else
      render json: { error: 'Failed to delete location' }, status: :unprocessable_entity
    end
  end

  private

  def location_params
    params.require(:location).permit(:name, :city, :state, :photo, :availableUnits, :wifi, :laundry)
  end
end
