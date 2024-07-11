class ChangeBolusTimeFromHeparins < ActiveRecord::Migration[7.1]
  def change
    change_column :heparins, :bolus_time, :datetime
  end
end
