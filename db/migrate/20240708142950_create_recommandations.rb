class CreateRecommandations < ActiveRecord::Migration[7.1]
  def change
    create_table :recommandations do |t|
      t.integer :new_loading_dose
      t.integer :new_maintenance_bolus
      t.datetime :new_maintenance_bolus_time
      t.references :patient, null: false, foreign_key: true

      t.timestamps
    end
  end
end
