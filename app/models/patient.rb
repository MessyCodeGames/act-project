class Patient < ApplicationRecord
  has_many :acts, dependent: :destroy
  has_many :heparins, dependent: :destroy
  has_many :recommandations, dependent: :destroy

  accepts_nested_attributes_for :acts, :heparins
end
