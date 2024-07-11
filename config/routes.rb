Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  get "up" => "rails/health#show", as: :rails_health_check

  resources :patients, only: [:new, :create, :edit, :update, :destroy, :show] do
    resources :acts
    resources :heparins
    resources :recommandations, except: [:edit, :update]
  end

  post 'calculate', to: 'pages#calculate'

  # Defines the root path route ("/")
  root to: "pages#home"
end
