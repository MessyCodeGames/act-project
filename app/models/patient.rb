class Patient < ApplicationRecord
  has_many :acts, dependant: :destroy
  has_many :heparins, dependant: :destroy
  has_many :recommandations, dependant: :destroy

  accepts_nested_attributes_for :acts, :heparins
end
