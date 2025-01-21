Rails.application.routes.draw do
  resources :locations, only: [:index, :show, :create, :destroy, :update]  
end
