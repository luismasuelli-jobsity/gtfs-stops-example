Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "main#show"
  post :import, controller: :main
  post :search, controller: :main
  post :clear, controller: :main
end
