class RemoveDatetimeFromHeparins < ActiveRecord::Migration[7.1]
  def change
    remove_column :heparins, :datetime, :string
  end
end
