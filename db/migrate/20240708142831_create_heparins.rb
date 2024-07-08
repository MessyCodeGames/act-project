class CreateHeparins < ActiveRecord::Migration[7.1]
  def change
    create_table :heparins do |t|
      t.integer :bolus_given
      t.string :bolus_time
      t.string :datetime
      t.references :patient, null: false, foreign_key: true

      t.timestamps
    end
  end
end
